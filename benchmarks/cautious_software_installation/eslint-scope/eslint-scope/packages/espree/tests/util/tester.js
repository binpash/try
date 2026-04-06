/**
 * @fileoverview Tests for parsing and attaching comments.
 * @author Nicholas C. Zakas
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import assert from "node:assert";
import * as espree from "../../espree.js";


//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

// Prefix to replace values.
// For example, a bigint value `1n` will be replaced by a string `"5f9c9d32_1n"`.
// Those prefixes merely are improbable values in test fixtures.
const Prefix = {
    bigint: "5f9c9d32_",
    number: "53b0a1b2_",
    RegExp: "ca5db4fe_"
};
const ReplacedStringLiteralPattern = new RegExp(
    `"(${Object.values(Prefix).join("|")})([^\\n]*)"`,
    "gu"
);

/**
 * Replace the values JSON cannot handle by strings.
 * The `replaceToRestoreNonJSONValues` function restores the replaced values.
 * @param {string} key The key to replace.
 * @param {any} value The value to replace.
 * @returns {any} If `value` parameter is a value JSON cannot handle, this
 * function returns a string value. If `key` parameter is `"start"` or `"end"`,
 * returns `undefined`. Otherwise, returns `value` parameter as is.
 * @throws {Error} If `value` is undefined
 * @private
 */
function replaceToSaveNonJSONValues(key, value) {

    // Remove `start` and `end` properties because of non-standard.
    if ((key === "start" || key === "end") && typeof value === "number") {
        return void 0;
    }

    // Save the values JSON cannot handle.
    // The `value` property of `Literal` node can have those values.
    switch (typeof value) {
        case "bigint":
            return `${Prefix.bigint}${value}n`;
        case "number":
            return Number.isFinite(value) ? value : `${Prefix.number}${value}`;
        case "object":
            return !(value instanceof RegExp) ? value : `${Prefix.RegExp}${value}`;
        case "undefined":
            throw new Error(`AST cannot have undefined as a property value.\nProperty name is '${key}'`);
        default:
            return value;
    }
}

/**
 * Replace the values that the `replaceToSaveNonJSONValues` function replaced by the original values.
 * @param {string} _key The key to replace.
 * @param {any} value The value to replace.
 * @returns {any} If `value` parameter is a replaced value, returns the restored
 * value. Otherwise, returns `value` parameter as is.
 * @private
 */
function replaceToRestoreNonJSONValues(_key, value) {

    // Restore the values JSON cannot handle.
    if (typeof value === "string") {
        if (value.startsWith(Prefix.number)) {
            return Number(value.slice(Prefix.number.length));
        }
        if (value.startsWith(Prefix.bigint)) {
            return BigInt(value.slice(Prefix.bigint.length, -1));
        }
        if (value.startsWith(Prefix.RegExp)) {
            const regexpString = value.slice(Prefix.RegExp.length);
            const i = regexpString.lastIndexOf("/");
            const pattern = regexpString.slice(1, i);
            const flags = regexpString.slice(i + 1);

            return new RegExp(pattern, flags);
        }
    }

    return value;
}

/**
 * Convert the string literals that the `replaceToSaveNonJSONValues` function
 * replaced to the JavaScript code of the original value.
 * @param {string} jsCodeText The JavaScript code text to convert.
 * @returns {string} The converted JavaScript code text.
 * @private
 */
function restoreNonJSONValueLiterals(jsCodeText) {
    return jsCodeText
        .replace(/\u2028/gu, "\\u2028") // Maybe editors cannot handle U+2028 and U+2029 correctly.
        .replace(/\u2029/gu, "\\u2029")
        .replace(ReplacedStringLiteralPattern, (_, prefix, value) => {
            if (prefix === Prefix.number) {
                return value; // NaN, Infinity, or -Infinity
            }
            if (prefix === Prefix.bigint) {
                return value; // bigint literals
            }
            if (prefix === Prefix.RegExp) {

                // TODO: Generate fallback code for the case that runtime didn't support syntax natively.
                //       Currently, Node.js of the minimum supported version supports all RegExp features.
                //       But new `d` flag is at Stage 3 and maybe it will need fallback code.

                // Parse it as a string literal for restoring escape sequences that `JSON.stringify` created.
                return JSON.parse(`"${value}"`);
            }

            throw new Error(`unreachable; unknown prefix ${prefix}`);
        });
}

/**
 * Gets a raw version of the AST that is suitable for comparison. This is necessary
 * due to the different order of properties across parsers.
 * @param {ASTNode} ast The AST to convert.
 * @returns {ASTNode} The converted AST.
 * @private
 */
function getRaw(ast) {
    return JSON.parse(
        JSON.stringify(ast, replaceToSaveNonJSONValues),
        replaceToRestoreNonJSONValues
    );
}

/**
 * Gets a JavaScript code that generates a given AST node object.
 * @param {ASTNode} ast The AST to convert.
 * @returns {string} The JavaScript code that generates `ast` object.
 */
function getAstCode(ast) {
    return restoreNonJSONValueLiterals(
        JSON.stringify(ast, replaceToSaveNonJSONValues, 4)
    );
}

/**
 * Parse and normalzie a JavaScript code.
 * @param {string} jsCodeText The JavaScript code to parse.
 * @param {Object} parserOptions The parser options to parse.
 * @param {Object} [options] The options.
 * @param {boolean} [options.rethrowSyntaxError = false] The flag to rethrow syntax errors.
 * @throws {Error} If options.rethrowSyntaxError = true, rethrows syntax errors
 * @returns {Object} The normalized AST.
 */
function getExpectedResult(jsCodeText, parserOptions, { rethrowSyntaxError = false } = {}) {
    try {
        return getRaw(espree.parse(jsCodeText, parserOptions));
    } catch (ex) {
        if (rethrowSyntaxError) {
            throw ex;
        }
        return { ...getRaw(ex), message: ex.message };
    }
}

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

export default {
    getRaw,
    getAstCode,
    getExpectedResult,

    assertMatches(code, config, expected) {
        assert.deepStrictEqual(
            getExpectedResult(code, config, { rethrowSyntaxError: !expected.message }),
            getRaw(expected)
        );
    }
};
