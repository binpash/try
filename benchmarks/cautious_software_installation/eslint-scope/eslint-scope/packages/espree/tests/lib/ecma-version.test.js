/**
 * @fileoverview Tests for ECMAScript version features.
 * @author Nicholas C. Zakas
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import fs from "node:fs";
import path from "node:path";
import shelljs from "shelljs";
import tester from "../util/tester.js";
import * as espree from "../../espree.js";
import assert from "node:assert";
import { fileURLToPath, pathToFileURL } from "node:url";


// eslint-disable-next-line no-underscore-dangle -- Conventional
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const allPiecesJson = JSON.parse(fs.readFileSync(`${__dirname}/../fixtures/parse/all-pieces.json`, "utf8"));

//------------------------------------------------------------------------------
// Setup
//------------------------------------------------------------------------------

const FIXTURES_DIR = path.resolve(__dirname, "..", "fixtures/ecma-version");


const allTestFiles = shelljs.find(FIXTURES_DIR)
    .filter(filename => filename.includes(".src.js"))
    .map(filename => filename.slice(FIXTURES_DIR.length, filename.length - 7)); // strip off ".src.js"


const scriptOnlyTestFiles = allTestFiles.filter(filename => !filename.includes("modules"));


const moduleTestFiles = allTestFiles.filter(filename => !filename.includes("not-strict") && !filename.includes("edge-cases"));

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("ecmaVersion", () => {

    let config;

    beforeEach(() => {
        config = {
            loc: true,
            range: true,
            tokens: true,
            ecmaVersion: 5
        };
    });

    describe("Scripts", () => {
        scriptOnlyTestFiles.forEach(filename => {
            describe(filename, () => {
                const version = filename.slice(1, filename.indexOf("/", 1));

                // Uncomment and fill in filename to focus on a single file
                // var filename = "newTarget/simple-new-target";
                const code = shelljs.cat(`${FIXTURES_DIR}/${filename}.src.js`);

                it("should parse correctly when sourceType is script", async () => {
                    config.ecmaVersion = Number(version);
                    if (filename.includes("comment")) {
                        config.comment = true;
                    }

                    const absolutePath = path.resolve(__dirname, FIXTURES_DIR, filename.slice(1));
                    const expected = await import(`${pathToFileURL(absolutePath).href}.result.js`);

                    tester.assertMatches(code, config, expected.default);
                });
            });

        });

    });


    describe("Modules", () => {
        moduleTestFiles.forEach(filename => {
            describe(filename, () => {
                const version = filename.slice(1, filename.indexOf("/", 1));
                const code = shelljs.cat(`${FIXTURES_DIR}/${filename}.src.js`);

                it("should parse correctly when sourceType is module", async () => {
                    const absolutePath = path.resolve(__dirname, FIXTURES_DIR, filename.slice(1));

                    let expected;

                    try {
                        expected = await import(`${pathToFileURL(absolutePath).href}.module-result.js`);
                    } catch {
                        expected = await import(`${pathToFileURL(absolutePath).href}.result.js`);
                    }

                    if (expected) {
                        expected = expected.default;
                    }

                    config.ecmaVersion = Number(version);
                    config.sourceType = "module";
                    if (filename.includes("comment")) {
                        config.comment = true;
                    }

                    // set sourceType of program node to module
                    if (expected.type === "Program") {
                        expected.sourceType = "module";
                    }

                    tester.assertMatches(code, config, expected);
                });
            });

        });
    });


    describe("general", () => {
        it("Should parse using 2015 instead of 6", () => {
            const ast = espree.parse("let foo = bar;", {
                ecmaVersion: 2015,
                comment: true,
                tokens: true,
                range: true,
                loc: true
            });

            assert.deepStrictEqual(tester.getRaw(ast), allPiecesJson);
        });

        it("Should throw error using invalid number", () => {
            assert.throws(() => {
                espree.parse(
                    "let foo = bar;", {
                        ecmaVersion: 32,
                        comment: true,
                        tokens: true,
                        range: true,
                        loc: true
                    }
                );
            }, /Invalid ecmaVersion/u);
        });

        it("Should throw error using invalid year", () => {
            assert.throws(() => {
                espree.parse(
                    "let foo = bar;", {
                        ecmaVersion: 2050,
                        comment: true,
                        tokens: true,
                        range: true,
                        loc: true
                    }
                );
            }, /Invalid ecmaVersion/u);
        });

        it("Should throw error when non-numeric year is provided", () => {
            assert.throws(() => {
                espree.parse(
                    "let foo = bar;", {
                        ecmaVersion: "2015",
                        comment: true,
                        tokens: true,
                        range: true,
                        loc: true
                    }
                );
            }, /ecmaVersion must be a number or "latest". Received value of type string instead/u);
        });

        it("Should throw error when using ES3 and reserved words", () => {
            assert.throws(() => {
                espree.parse(
                    "var char = 'c'", {
                        ecmaVersion: 3
                    }
                );
            }, /'char' is reserved/u);
        });

        it("Should throw error when using ES3 and reserved words in object literals", () => {
            assert.throws(() => {
                espree.parse(
                    "var x = { char: 'c' }", {
                        ecmaVersion: 3
                    }
                );
            }, /'char' is reserved/u);
        });

        it("Should throw error when using ES3, allowReserved: false, and reserved words", () => {
            assert.throws(() => {
                espree.parse(
                    "var char = 'c'", {
                        ecmaVersion: 3,
                        allowReserved: false
                    }
                );
            }, /'char' is reserved/u);
        });

        it("Should not throw error when using ES3, allowReserved: true, and reserved words", () => {
            assert.doesNotThrow(() => {
                espree.parse(
                    "var char = 'c'", {
                        ecmaVersion: 3,
                        allowReserved: true
                    }
                );
            });
        });

        it("Should not throw error when using ES3, allowReserved: true, and reserved words in object literals", () => {
            assert.doesNotThrow(() => {
                espree.parse(
                    "var x = { char: 'c' }", {
                        ecmaVersion: 3,
                        allowReserved: true
                    }
                );
            });
        });

        it("Should throw error when using ES5, allowReserved: true", () => {
            assert.throws(() => {
                espree.parse(
                    "var x = { char: 'c' }", {
                        ecmaVersion: 5,
                        allowReserved: true
                    }
                );
            }, /`allowReserved` is only supported when ecmaVersion is 3/u);
        });

        it("Should throw error when using ES3, allowReserved: non-boolean", () => {
            assert.throws(() => {
                espree.parse(
                    "var x = { char: 'c' }", {
                        ecmaVersion: 3,
                        allowReserved: "true"
                    }
                );
            }, /`allowReserved`, when present, must be `true` or `false`/u);
        });

        it("Should not throw error when using ES5, allowReserved: false, and ES3 reserved words in object literals", () => {
            assert.doesNotThrow(() => {
                espree.parse(
                    "var x = { char: 'c' }", {
                        ecmaVersion: 5,
                        allowReserved: false
                    }
                );
            });
        });

        it("Should throw error when using module in pre-ES6", () => {
            assert.throws(() => {
                espree.parse(
                    "let foo = bar;", {
                        ecmaVersion: 5,
                        sourceType: "module"
                    }
                );
            }, /sourceType 'module' is not supported when ecmaVersion < 2015/u);
        });

        it("Should allow 'latest' as value", () => {
            const expected = espree.parse(
                "let foo = bar;", {
                    ecmaVersion: espree.latestEcmaVersion,
                    sourceType: "module"
                }
            );

            const actual = espree.parse(
                "let foo = bar;", {
                    ecmaVersion: "latest",
                    sourceType: "module"
                }
            );

            assert.deepStrictEqual(actual, expected);
        });

        it("Should use the 5 as the default for ecmaVersion", () => {

            assert.throws(() => {
                espree.parse(
                    "let foo = bar;"
                );

            }, /Unexpected token foo/u);

        });
    });

});
