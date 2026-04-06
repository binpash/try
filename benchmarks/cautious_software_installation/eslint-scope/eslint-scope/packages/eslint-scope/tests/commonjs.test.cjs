/**
 * @fileoverview Tests for checking that the commonjs entry points are still accessible
 * @author Mike Reinstein
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("node:assert");
const eslintScope = require("../dist/eslint-scope.cjs");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("commonjs", () => {
    it("is an object", () => {
        assert.strictEqual(typeof eslintScope, "object");
    });

    it("has exports", () => {
        assert.strictEqual(typeof eslintScope.version, "string");

        [
            "analyze",
            "Definition",
            "PatternVisitor",
            "Reference",
            "Referencer",
            "Scope",
            "ScopeManager",
            "Variable"
        ].forEach(prop => {
            assert.strictEqual(typeof eslintScope[prop], "function");
        });
    });
});
