/**
 * @fileoverview A simple script to update existing tests to reflect new
 *      parser changes.
 *
 * Usage:
 *      node tools/update-tests.js
 *
 * @author Nicholas C. Zakas
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------

import shelljs from "shelljs";
import tester from "../tests/util/tester.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

// eslint-disable-next-line no-underscore-dangle -- Conventional
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Gets test file names
 * @param {string} directory The directory
 * @returns {string[]} The file names
 */
function getTestFilenames(directory) {
    return shelljs.find(directory).filter(filename =>
        filename.includes(".src.js")).map(filename =>
        filename.slice(directory.length - 1, filename.length - 7)); // strip off ".src.js"
}

/**
 * Gets library file names
 * @param {string} directory The directory
 * @returns {string[]} The file names
 */
function getLibraryFilenames(directory) {
    return shelljs.find(directory).filter(filename =>
        filename.includes(".js") &&
            !filename.includes(".result.js")).map(filename =>
        filename.slice(directory.length - 1)); // strip off directory
}

/**
 * Outputs the result.
 * @param {any} result The result
 * @param {string} testResultFilename Test result file name
 * @returns {void}
 */
function outputResult(result, testResultFilename) {
    fs.writeFileSync(testResultFilename, `export default ${tester.getAstCode(result)};`);
}

//------------------------------------------------------------------------------
// Setup
//------------------------------------------------------------------------------

const FIXTURES_DIR = "./tests/fixtures/ecma-features",
    LIBRARIES_DIR = "./tests/fixtures/libraries";

const testFiles = getTestFilenames(FIXTURES_DIR),
    libraryFiles = getLibraryFilenames(LIBRARIES_DIR);

libraryFiles.forEach(filename => {
    const testResultFilename = `${path.resolve(__dirname, "..", LIBRARIES_DIR, filename)}.result.json`,
        code = shelljs.cat(path.resolve(LIBRARIES_DIR, filename));
    const result = tester.getExpectedResult(code, {
        loc: true,
        range: true,
        tokens: true
    });

    fs.writeFileSync(testResultFilename, JSON.stringify(result));
});

// update all tests in ecma-features
testFiles.forEach(filename => {

    const feature = path.dirname(filename),
        code = shelljs.cat(`${path.resolve(FIXTURES_DIR, filename)}.src.js`),
        config = {
            loc: true,
            range: true,
            tokens: true,
            ecmaVersion: 6,
            ecmaFeatures: {}
        };

    config.ecmaFeatures[feature] = true;
    const testResultFilename = `${path.resolve(__dirname, "..", FIXTURES_DIR, filename)}.result.js`;
    const result = tester.getExpectedResult(code, config);

    outputResult(result, testResultFilename);
});
