/**
 * @fileoverview Generate `<test-name>.result.js` from `<test-name>.src.js` in
 *               `tests/fixtures/ecma-version/<number>/**` directory.
 *
 * Usage:
 *      node tools/update-ecma-version-tests.js <number>
 *
 * @author Nicholas C. Zakas
 * @author Toru Nagashima
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------

import path from "node:path";
import { fileURLToPath } from "node:url";
import util from "node:util";
import fs from "node:fs";
import shelljs from "shelljs";
import tester from "../tests/util/tester.js";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Find the test cases from a given directory.
 * Tests are the name of files that end with `.src.js`.
 * @param {string} directory The root directory to find.
 * @returns {string[]} The found test names.
 */
function findTests(directory) {
    return shelljs.find(directory)
        .filter(filename => filename.endsWith(".src.js"))
        .map(filename => filename.slice(0, -".src.js".length)); // strip off ".src.js"
}

/**
 * Write the parse result to the result file (`<test-name>.result.js`).
 * @param {Object} result The parse result to write.
 * @param {string} testResultFilename The path to the result file.
 * @returns {void}
 */
function outputResult(result, testResultFilename) {
    fs.writeFileSync(testResultFilename, `export default ${tester.getAstCode(result)};`);
}

/**
 * Entry point.
 * @returns {void}
 */
function main() {
    const thisFilePath = fileURLToPath(import.meta.url);
    const ecmaVersion = process.argv[2] ?? "";
    const rootDir = path.resolve(thisFilePath, "../../tests/fixtures/ecma-version", ecmaVersion);

    if (!ecmaVersion) {
        console.error();
        console.error("Usage: node tools/update-ecma-version-tests.js <number>");
        console.error();
        console.error("  <number> ... The ECMA version to update tests.");
        console.error();
        return;
    }
    if (!/^\d+$/u.test(ecmaVersion)) {
        console.error("Error: The version number must be an positive integer.");
        return;
    }
    if (!shelljs.test("-d", rootDir)) {
        console.error("Error: %o is must be a directory.", rootDir);
        return;
    }

    for (const name of findTests(rootDir)) {
        const scriptOnly = name.includes("not-strict") || name.includes("edge-cases");
        const moduleOnly = !scriptOnly && name.includes("modules");
        const expectedToBeError = name.includes("/invalid-");
        const expectedToBeOK = name.includes("/valid-");
        const comment = name.includes("comment");
        const sourceFilePath = `${path.resolve(rootDir, name)}.src.js`;
        const resultFilePath = `${path.resolve(rootDir, name)}.result.js`;
        const moduleResultFilePath = `${path.resolve(rootDir, name)}.module-result.js`;
        const relSourceFilePath = path.relative(process.cwd(), sourceFilePath);
        const code = shelljs.cat(sourceFilePath);
        const parserOptions = {
            comment,
            loc: true,
            range: true,
            tokens: true,
            ecmaVersion: Number(ecmaVersion)
        };
        const scriptResult = moduleOnly
            ? null
            : tester.getExpectedResult(code, { ...parserOptions, sourceType: "script" });
        const moduleResult = scriptOnly
            ? null
            : tester.getExpectedResult(code, { ...parserOptions, sourceType: "module" });
        const resultsAreSame = util.isDeepStrictEqual(
            { ...scriptResult, sourceType: null },
            { ...moduleResult, sourceType: null }
        );

        if (scriptOnly || moduleOnly || resultsAreSame) {
            const result = scriptResult ?? moduleResult;

            if (expectedToBeError && typeof result.type === "string") {
                console.warn("Warn: expected to be syntax error, but succeeded to parse: %o", relSourceFilePath);
            } else if (expectedToBeOK && typeof result.type !== "string") {
                console.warn("Warn: expected to succeed to parse, but thrown syntax error: %o", relSourceFilePath);
            }

            outputResult(result, resultFilePath);
        } else {
            console.warn("Warn: got different results between script and module: %o", relSourceFilePath);
            if (expectedToBeError && typeof scriptResult.type === "string") {
                console.warn("Warn: expected to be syntax error, but succeeded to parse in script: %o", relSourceFilePath);
            } else if (expectedToBeOK && typeof scriptResult.type !== "string") {
                console.warn("Warn: expected to succeed to parse, but thrown syntax error in script: %o", relSourceFilePath);
            }
            if (expectedToBeError && typeof moduleResult.type === "string") {
                console.warn("Warn: expected to be syntax error, but succeeded to parse in module: %o", relSourceFilePath);
            } else if (expectedToBeOK && typeof moduleResult.type !== "string") {
                console.warn("Warn: expected to succeed to parse, but thrown syntax error in module: %o", relSourceFilePath);
            }

            outputResult(scriptResult, resultFilePath);
            outputResult(moduleResult, moduleResultFilePath);
        }
    }
}

//------------------------------------------------------------------------------
// Setup
//------------------------------------------------------------------------------

main();
