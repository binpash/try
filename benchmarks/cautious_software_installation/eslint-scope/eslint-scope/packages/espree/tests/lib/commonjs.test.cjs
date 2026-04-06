/**
 * @fileoverview Tests for checking that the commonjs entry points are still accessible
 * @author Mike Reinstein
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("node:assert");
const espree = require("../../dist/espree.cjs");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("commonjs", () => {
    it("has parse", () => {

        assert.strictEqual(typeof espree.parse, "function");

        const ast = espree.parse("let foo = bar;", {
            ecmaVersion: 6,
            comment: true,
            tokens: true,
            range: true,
            loc: true
        });

        assert.strictEqual(typeof ast, "object");
    });

    it("parses jsx", () => {

        const config = {
            loc: true,
            range: true,
            tokens: true,
            ecmaVersion: 6,
            ecmaFeatures: { jsx: true }
        };

        const code = "<foo bar={`${baz}`} />";

        const result = espree.parse(code, config);

        assert.strictEqual(typeof result, "object");
        assert.strictEqual(result.tokens.length, 11);
    });


    it("has tokenize", () => {
        assert.strictEqual(typeof espree.tokenize, "function");
    });

    it("has version", () => {
        assert.strictEqual(typeof espree.version, "string");
    });

    it("has Syntax", () => {
        assert.strictEqual(typeof espree.Syntax, "object");
    });

    it("has VisitorKeys", () => {
        assert.strictEqual(typeof espree.VisitorKeys, "object");
    });

    it("has latestEcmaVersion", () => {
        assert.strictEqual(typeof espree.latestEcmaVersion, "number");
    });

    it("has supportedEcmaVersions", () => {
        assert.strictEqual(typeof espree.supportedEcmaVersions, "object");
    });
});
