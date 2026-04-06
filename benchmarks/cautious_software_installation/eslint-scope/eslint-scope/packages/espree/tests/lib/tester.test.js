import assert from "node:assert";
import tester from "../util/tester.js";

const { getRaw, getAstCode } = tester;

describe("Tester", () => {
    describe("getRaw", () => {
        it("should remove `start` and `end` properties", () => {
            assert.deepStrictEqual(
                getRaw({ start: 0, end: 1, node: { start: 2, end: 3, value: 4 } }),
                { node: { value: 4 } }
            );
        });

        it("should keep NaN", () => {
            assert.deepStrictEqual(
                getRaw({ value: NaN }),
                { value: NaN }
            );
        });

        it("should keep Infinity", () => {
            assert.deepStrictEqual(
                getRaw({ value: Infinity }),
                { value: Infinity }
            );
        });

        it("should keep -Infinity", () => {
            assert.deepStrictEqual(
                getRaw({ value: -Infinity }),
                { value: -Infinity }
            );
        });

        it("should keep bigint values", () => {
            assert.deepStrictEqual(
                getRaw({ value: BigInt("123") }),
                { value: BigInt("123") }
            );
        });

        it("should keep RegExp objects", () => {
            assert.deepStrictEqual(
                // eslint-disable-next-line require-unicode-regexp -- non-unicode regexp is needed for the test
                getRaw({ value: /foo/ }),
                // eslint-disable-next-line require-unicode-regexp -- non-unicode regexp is needed for the test
                { value: /foo/ }
            );
            assert.deepStrictEqual(
                getRaw({ value: /foo/u }),
                { value: /foo/u }
            );

            // check about escape sequences of `JSON.stringify`.
            assert.deepStrictEqual(
                getRaw({ value: /"foo"/u }),
                { value: /"foo"/u }
            );
            assert.deepStrictEqual(
                getRaw({ value: /\d\/\d/u }),
                { value: /\d\/\d/u }
            );
        });
    });

    describe("getAstCode", () => {

        /**
         * Evaluate the generated code of `getAstCode` function with given code.
         * @param {ASTNode} ast The AST node to test.
         * @returns {ASTNode} The result of the evaluation of the generated code.
         */
        function test(ast) {
            const code = getAstCode(ast);

            // eslint-disable-next-line no-new-func -- it's okay to eval code in tests
            return Function(`return ${code};`)();
        }

        it("should remove `start` and `end` properties", () => {
            assert.deepStrictEqual(
                test({ start: 0, end: 1, node: { start: 2, end: 3, value: 4 } }),
                { node: { value: 4 } }
            );
        });

        it("should keep NaN", () => {
            assert.deepStrictEqual(
                test({ value: NaN }),
                { value: NaN }
            );
        });

        it("should keep Infinity", () => {
            assert.deepStrictEqual(
                test({ value: Infinity }),
                { value: Infinity }
            );
        });

        it("should keep -Infinity", () => {
            assert.deepStrictEqual(
                test({ value: -Infinity }),
                { value: -Infinity }
            );
        });

        it("should keep bigint values", () => {
            assert.deepStrictEqual(
                test({ value: BigInt("123") }),
                { value: BigInt("123") }
            );
        });

        it("should keep RegExp objects", () => {
            assert.deepStrictEqual(
                // eslint-disable-next-line require-unicode-regexp -- non-unicode regexp is needed for the test
                test({ value: /foo/ }),
                // eslint-disable-next-line require-unicode-regexp -- non-unicode regexp is needed for the test
                { value: /foo/ }
            );
            assert.deepStrictEqual(
                test({ value: /foo/u }),
                { value: /foo/u }
            );

            // check about escape sequences of `JSON.stringify`.
            assert.deepStrictEqual(
                test({ value: /"foo"/u }),
                { value: /"foo"/u }
            );
            assert.deepStrictEqual(
                test({ value: /\d\/\d/u }),
                { value: /\d\/\d/u }
            );
        });
    });
});
