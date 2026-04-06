/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import assert from "node:assert";
import * as evk from "../../lib/index.js";
import keys from "../../lib/visitor-keys.js";

describe("eslint-visitor-keys", () => {
    describe("KEYS", () => {
        it("should be same as lib/visitor-keys.js", () => {
            assert.deepStrictEqual(evk.KEYS, keys);
        });
    });

    describe("getKeys()", () => {
        it("should return keys", () => {
            assert.deepStrictEqual(evk.getKeys({ a: 1, b: 2 }), ["a", "b"]);
        });

        it("should not include 'parent' in the result", () => {
            assert.deepStrictEqual(evk.getKeys({ a: 1, b: 2, parent: 3 }), ["a", "b"]);
        });

        it("should not include 'leadingComments' in the result", () => {
            assert.deepStrictEqual(evk.getKeys({ a: 1, b: 2, leadingComments: 3 }), ["a", "b"]);
        });

        it("should not include 'trailingComments' in the result", () => {
            assert.deepStrictEqual(evk.getKeys({ a: 1, b: 2, trailingComments: 3 }), ["a", "b"]);
        });

        it("should not include '_foo' in the result", () => {
            assert.deepStrictEqual(evk.getKeys({ a: 1, b: 2, _foo: 3 }), ["a", "b"]);
        });
    });

    describe("unionWith()", () => {
        const additionalKeys = { Program: ["body", "a"], AssignmentExpression: ["b"], additional: ["c"], MethodDefinition: ["a", "key", "b"] };
        const unionKeys = evk.unionWith(additionalKeys);

        it("should include all keys of lib/visitor-keys.js", () => {
            for (const type of Object.keys(keys)) {
                for (const key of keys[type]) {
                    assert(unionKeys[type].includes(key), `'${key}' should be included in '${type}'.`);
                }
            }
        });

        it("should include all additional keys", () => {
            for (const type of Object.keys(additionalKeys)) {
                for (const key of additionalKeys[type]) {
                    assert(unionKeys[type].includes(key), `'${key}' should be included in '${type}'.`);
                }
            }
        });

        it("should not have duplicate", () => {
            assert(unionKeys.Program.filter(key => key === "body").length === 1);
        });

        it("should add additional keys, then concatenate original keys", () => {
            assert.deepStrictEqual(unionKeys.MethodDefinition, ["a", "key", "b", "value"]);
        });
    });
});
