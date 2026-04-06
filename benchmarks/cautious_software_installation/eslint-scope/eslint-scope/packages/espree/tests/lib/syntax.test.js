/**
 * @fileoverview Test for Syntax.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import assert from "node:assert";
import * as espree from "../../espree.js";


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("Syntax", () => {
    it("keys of Syntax should match the keys of VisitorKeys", () => {
        assert.deepStrictEqual(
            Object.keys(espree.Syntax),
            Object.keys(espree.VisitorKeys)
        );
    });
});
