/**
 * @fileoverview Tests for parse().
 * @author Nicholas C. Zakas
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import fs from "node:fs";
import tester from "../util/tester.js";
import * as espree from "../../espree.js";
import assert from "node:assert";


const allPiecesJson = JSON.parse(fs.readFileSync("./tests/fixtures/parse/all-pieces.json", "utf8"));

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("parse()", () => {

    describe("ecmaVersion", () => {

        it("should be 5 if not specified", () => {

            // needs `ecmaVersion: 5` or higher (`ecmaVersion: 3` would throw on getters/setters)
            espree.parse("var foo = { get bar() {} }");

            assert.throws(() => {
                espree.parse(

                    // needs `ecmaVersion: 6` or higher
                    "let foo = bar;"
                );

            }, /Unexpected token foo/u);

        });

    });

    describe("sourceType", () => {

        describe("module", () => {

            it("should have correct column number when strict mode error occurs", () => {

                try {
                    espree.parse("function fn(a, a) {\n}", { ecmaVersion: 6, sourceType: "module" });
                } catch (err) {
                    assert.strictEqual(err.column, 16);
                }
            });

        });

        describe("commonjs", () => {

            it("should parse top-level return", () => {
                espree.parse("return;", { sourceType: "commonjs" });
            });

            it("should have sourceType:commonjs on Program node", () => {
                const result = espree.parse("return;", { sourceType: "commonjs" });

                assert.strictEqual(result.sourceType, "commonjs");
            });
        });

    });

    describe("ES5", () => {

        it("should throw an error when using the y regex flag", () => {

            assert.throws(() => {
                espree.parse("/./y", { ecmaVersion: 5 });
            });
        });

        it("should throw an error when using the u regex flag", () => {

            assert.throws(() => {
                espree.parse("/./u", { ecmaVersion: 5 });
            });
        });

    });

    describe("general", () => {
        it("should output tokens, comments, locs, and ranges when called with those options", () => {
            const ast = espree.parse("let foo = bar;", {
                ecmaVersion: 6,
                comment: true,
                tokens: true,
                range: true,
                loc: true
            });

            assert.deepStrictEqual(tester.getRaw(ast), allPiecesJson);
        });

        it("should output the same value for program.start, end and range when there is a leading/trailing comments", () => {
            const ast = espree.parse("/* foo */ bar /* baz */", {
                range: true
            });

            assert.strictEqual(ast.start, ast.range[0]);
            assert.strictEqual(ast.end, ast.range[1]);
        });

        it("should output the same value for program.start, end as when ranges are returned and there is a leading/trailing comments using default options", () => {
            const ast = espree.parse("/* foo */ bar /* baz */");

            assert.strictEqual(ast.start, 10);
            assert.strictEqual(ast.end, 13);
        });

        it("should output the same value for program.start, end and range and loc when there is a leading comments with range and loc true", () => {
            const ast = espree.parse("/* foo */ bar", {
                range: true,
                loc: true
            });

            assert.strictEqual(ast.start, ast.range[0]);
            assert.strictEqual(ast.end, ast.range[1]);
            assert.strictEqual(ast.start, ast.loc.start.column);
            assert.strictEqual(ast.end, ast.loc.end.column);
        });

        it("should output the same value for program.start, end and loc when there is a leading comments with loc", () => {
            const ast = espree.parse("/* foo */ bar", {
                loc: true
            });

            assert.strictEqual(ast.start, ast.loc.start.column);
            assert.strictEqual(ast.end, ast.loc.end.column);
        });

        it("should output the same value for program.start, end and range when there is a trailing comments", () => {
            const ast = espree.parse(" bar /* foo */", {
                range: true
            });

            assert.strictEqual(ast.start, ast.range[0]);
            assert.strictEqual(ast.end, ast.range[1]);
        });

        it("should output the same value for range and start and end in templateElement with range", () => {
            const ast = espree.parse("`foo ${bar}`;", {
                ecmaVersion: 6,
                range: true
            });

            assert.strictEqual(ast.body[0].expression.quasis[0].start, ast.body[0].expression.quasis[0].range[0]);
            assert.strictEqual(ast.body[0].expression.quasis[0].end, ast.body[0].expression.quasis[0].range[1]);
            assert.strictEqual(ast.body[0].expression.quasis[1].start, ast.body[0].expression.quasis[1].range[0]);
            assert.strictEqual(ast.body[0].expression.quasis[1].end, ast.body[0].expression.quasis[1].range[1]);
        });

        it("should output the same value for loc and start and end in templateElement with loc", () => {
            const ast = espree.parse("`foo ${bar}`;", {
                ecmaVersion: 6,
                loc: true
            });

            assert.strictEqual(ast.body[0].expression.quasis[0].start, ast.body[0].expression.quasis[0].loc.start.column);
            assert.strictEqual(ast.body[0].expression.quasis[0].end, ast.body[0].expression.quasis[0].loc.end.column);
            assert.strictEqual(ast.body[0].expression.quasis[1].start, ast.body[0].expression.quasis[1].loc.start.column);
            assert.strictEqual(ast.body[0].expression.quasis[1].end, ast.body[0].expression.quasis[1].loc.end.column);
        });

        it("should output the same value for loc, range and start and end in templateElement with loc and range", () => {
            const ast = espree.parse("`foo ${bar}`;", {
                ecmaVersion: 6,
                loc: true,
                range: true
            });

            assert.strictEqual(ast.body[0].expression.quasis[0].start, ast.body[0].expression.quasis[0].loc.start.column);
            assert.strictEqual(ast.body[0].expression.quasis[0].end, ast.body[0].expression.quasis[0].loc.end.column);
            assert.strictEqual(ast.body[0].expression.quasis[0].start, ast.body[0].expression.quasis[0].range[0]);
            assert.strictEqual(ast.body[0].expression.quasis[0].end, ast.body[0].expression.quasis[0].range[1]);
            assert.strictEqual(ast.body[0].expression.quasis[1].start, ast.body[0].expression.quasis[1].loc.start.column);
            assert.strictEqual(ast.body[0].expression.quasis[1].end, ast.body[0].expression.quasis[1].loc.end.column);
            assert.strictEqual(ast.body[0].expression.quasis[1].start, ast.body[0].expression.quasis[1].range[0]);
            assert.strictEqual(ast.body[0].expression.quasis[1].end, ast.body[0].expression.quasis[1].range[1]);
        });

        it("should output the same value for start and end in templateElement as when ranges are present", () => {
            const ast = espree.parse("`foo ${bar}`;", {
                ecmaVersion: 6
            });

            assert.strictEqual(ast.body[0].expression.quasis[0].start, 0);
            assert.strictEqual(ast.body[0].expression.quasis[0].end, 7);
            assert.strictEqual(ast.body[0].expression.quasis[1].start, 10);
            assert.strictEqual(ast.body[0].expression.quasis[1].end, 12);
        });

        it("should reset lastToken on each parse", () => {
            espree.parse("var foo = bar;");
            const ast = espree.parse("//foo", {
                comment: true,
                tokens: true,
                range: true,
                loc: true
            });

            assert.deepStrictEqual(ast.range, [0, 5]);
            assert.deepStrictEqual([ast.loc.start.line, ast.loc.start.column], [1, 0]);
            assert.deepStrictEqual([ast.loc.end.line, ast.loc.end.column], [1, 5]);
        });

        it("should not mutate config", () => {
            espree.parse("foo", Object.freeze({ ecmaFeatures: Object.freeze({}) }));
        });

        it("Cast valid non-string input", () => {
            const str = "var foo = bar;";

            assert.deepStrictEqual(
                espree.parse(Buffer.from(str)),
                espree.parse(str)
            );
        });

        // https://github.com/eslint/espree/issues/470
        it("Should throw on invalid `(a = 1) = t`", () => {
            assert.throws(() => {
                espree.parse("(a = 1) = t", { ecmaVersion: 6 });
            });
        });

        // https://github.com/eslint/espree/issues/472
        it("Should throw on invalid `async () => await 5 ** 6;`", () => {
            assert.throws(() => {
                espree.parse("async () => await 5 ** 6;", { ecmaVersion: 10 });
            });
        });
    });

    describe("nodes", () => {
        it("should not re-use the same identifier node in shorthand properties", () => {
            const code = "({x, y = 1} = {z})";

            const ast = espree.parse(code, { ecmaVersion: 2015 });

            const assignment = ast.body[0].expression;
            const objectPattern = assignment.left;
            const objectExpression = assignment.right;

            const propertyX = objectPattern.properties[0];
            const propertyY = objectPattern.properties[1];
            const propertyZ = objectExpression.properties[0];

            assert.notStrictEqual(propertyX.key, propertyX.value);
            assert.notStrictEqual(propertyY.key, propertyY.value.left);
            assert.notStrictEqual(propertyZ.key, propertyZ.value);
        });
    });
});
