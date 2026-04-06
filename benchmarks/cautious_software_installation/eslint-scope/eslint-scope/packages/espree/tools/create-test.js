/**
 * @fileoverview A simple script to help generate test cases
 * @author Nicholas C. Zakas
 */

/*
 * Usage:
 *      node tools/create-test.js ecma-features/binaryLiterals/ file_with_code.js
 *
 * The file with code should use "/*!espree-section: name/" as a separator between examples
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import shelljs from "shelljs";
import { parse } from "../espree.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

//------------------------------------------------------------------------------
// Initialization
//------------------------------------------------------------------------------

// eslint-disable-next-line no-underscore-dangle -- Conventional
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PATTERN = /\/\*!espree-section:\s*[a-z\d-]+\*\//giu;

const filename = process.argv[2],
    codeFilename = process.argv[3];

/**
 * @typedef {{start: number, end: number}} StartEnd
 */

/**
 * acorn adds these "start" and "end" properties
 * which we don't officially support, we remove
 * them before creating our test fixtures
 * @param {StartEnd[]} o The array or object to modify
 * @returns {void}
 */
function recursivelyRemoveStartAndEnd(o) {
    if (Array.isArray(o)) {
        o.forEach(recursivelyRemoveStartAndEnd);
        return;
    }
    if (o && typeof o === "object") {
        delete o.start;
        delete o.end;
        Object.keys(o).filter(key => key !== "loc").forEach(key => {
            recursivelyRemoveStartAndEnd(o[key]);
        });
    }
}

if (!codeFilename) {
    console.error("Missing code to generate tests for");
    console.error("Usage: node create-test.js ecma-features/binaryLiterals/ file_with_code.js");
    process.exit(1);
}

if (!filename) {
    console.error("Missing filename to generate tests for");
    console.error("Usage: node create-test.js ecma-features/binaryLiterals/ file_with_code.js");
    process.exit(1);
}

const rawCode = shelljs.cat(codeFilename),
    code = rawCode.split(PATTERN),
    sections = rawCode.match(PATTERN);

// pop off first code, it will be an empty string
code.shift();

if (!sections || sections.length !== code.length) {
    console.error("Missing a /*!espree-section: name*/ in the code file.");
    process.exit(1);
}

code.forEach((source, index) => {

    const fullFilename = `${filename}/${sections[index].slice(18, sections[index].length - 2).trim()}`,
        testSourceFilename = path.resolve(__dirname, `../tests/fixtures/${fullFilename}.src.js`),
        testResultFilename = path.resolve(__dirname, `../tests/fixtures/${fullFilename}.result.js`);

    let result,
        sourceCode = source.trim();

    // add an extra semicolon if there's not already one at the end - helps normalize empty lines at end of input
    if (sourceCode.at(-1) !== ";") {
        sourceCode += ";";
    }

    //------------------------------------------------------------------------------
    // Run the code against Esprima to generate the AST to match against
    //------------------------------------------------------------------------------

    try {
        result = parse(sourceCode, {
            ecmaVersion: 8, // change as needed
            ecmaFeatures: {
                experimentalObjectRestSpread: true
            },
            sourceType: "script", // change as needed
            loc: true,
            range: true,
            tokens: true
        });
    } catch (ex) {
        result = {
            message: ex.message,
            column: ex.column,
            index: ex.index,
            lineNumber: ex.lineNumber
        };
    }

    recursivelyRemoveStartAndEnd(result);

    fs.writeFileSync(testSourceFilename, sourceCode);

    let resultCode = `export default ${JSON.stringify(result, (key, value) =>
        ((typeof value === "bigint") ? `bigint<${value}n>` : value), 4)};`;

    resultCode = resultCode.replace(/"bigint<(\d+n)>"/gu, "$1");
    fs.writeFileSync(testResultFilename, resultCode);
});
