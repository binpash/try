/**
 * @fileoverview Tests for checking that the commonjs entry points are still accessible
 * @author Mike Reinstein
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("node:assert");
const eslintVisitorKeys = require("../../dist/eslint-visitor-keys.cjs");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("commonjs", () => {
    it("is an object", () => {
        assert.strictEqual(typeof eslintVisitorKeys, "object");
    });

    it("has exported keys object", () => {
        assert.strictEqual(typeof eslintVisitorKeys.KEYS, "object");
    });

    it("has key array with AST type", () => {
        assert.ok(Array.isArray(eslintVisitorKeys.KEYS.ArrayExpression));
    });

    it("has getKeys function", () => {
        assert.strictEqual(typeof eslintVisitorKeys.getKeys, "function");
    });

    it("should have getKeys which returns keys", () => {
        assert.deepStrictEqual(eslintVisitorKeys.getKeys({ a: 1, b: 2 }), ["a", "b"]);
    });

    it("has unionWith function", () => {
        assert.strictEqual(typeof eslintVisitorKeys.unionWith, "function");
    });

    it("should have unionWith which includes all additional keys", () => {
        const additionalKeys = { Program: ["body", "a"], AssignmentExpression: ["b"], additional: ["c"], MethodDefinition: ["a", "key", "b"] };
        const unionKeys = eslintVisitorKeys.unionWith(additionalKeys);

        for (const type of Object.keys(additionalKeys)) {
            for (const key of additionalKeys[type]) {
                assert(unionKeys[type].includes(key), `'${key}' should be included in '${type}'.`);
            }
        }
    });
});
