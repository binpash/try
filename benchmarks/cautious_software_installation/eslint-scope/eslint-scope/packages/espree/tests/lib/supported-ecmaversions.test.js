/**
 * @fileoverview Tests for latestEcmaVersion & supportedEcmaVersions.
 * @author Kai Cataldo
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import assert from "node:assert";
import * as espree from "../../espree.js";


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("latestEcmaVersion", () => {
    it("should return the latest supported ecmaVersion", () => {
        assert.strictEqual(espree.latestEcmaVersion, 17);
    });
});

describe("supportedEcmaVersions", () => {
    it("should return an array of all supported versions", () => {
        assert.deepStrictEqual(
            espree.supportedEcmaVersions,
            [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
        );
    });
});
