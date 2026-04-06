/**
 * @fileoverview Tests for ECMA feature flags
 * @author Nicholas C. Zakas
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import assert from "node:assert";
import path from "node:path";
import * as espree from "../../espree.js";
import shelljs from "shelljs";
import { fileURLToPath, pathToFileURL } from "node:url";
import tester from "../util/tester.js";


// eslint-disable-next-line no-underscore-dangle -- Conventional
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//------------------------------------------------------------------------------
// Setup
//------------------------------------------------------------------------------

const FIXTURES_DIR = "./tests/fixtures/ecma-features";

const testFiles = shelljs.find(FIXTURES_DIR)
    .filter(filename => filename.includes(".src.js"))
    .map(filename => filename.slice(FIXTURES_DIR.length - 1, filename.length - 7));

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

/**
 * Returns whether a feature should throw in its tests when it is enabled.
 * @param {string} feature The name of the feature.
 * @returns {boolean} Whether it should throw in its tests when it is enabled.
 */
function shouldThrowInTestsWhenEnabled(feature) {
    return (feature === "impliedStrict");
}

describe("ecmaFeatures", () => {

    let config;

    beforeEach(() => {
        config = {
            loc: true,
            range: true,
            tokens: true,
            ecmaVersion: 6,
            ecmaFeatures: {}
        };
    });
    testFiles.forEach(filename => {
        describe(filename, () => {

            // Uncomment and fill in filename to focus on a single file
            // var filename = "jsx/invalid-matching-placeholder-in-closing-tag";
            const feature = path.dirname(filename),
                isPermissive = !shouldThrowInTestsWhenEnabled(feature),
                code = shelljs.cat(`${path.resolve(FIXTURES_DIR, filename)}.src.js`);

            it(`should parse correctly when ${feature} is ${isPermissive}`, async () => {
                config.ecmaFeatures[feature] = isPermissive;

                const expected = await import(`${pathToFileURL(path.resolve(__dirname, "../../", FIXTURES_DIR, filename)).href}.result.js`);

                tester.assertMatches(code, config, expected.default);
            });

            it(`should throw an error when ${feature} is ${!isPermissive}`, () => {
                config.ecmaFeatures[feature] = !isPermissive;

                assert.throws(() => {
                    espree.parse(code, config);
                });

            });
        });
    });
});
