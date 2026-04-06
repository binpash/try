/**
 * @fileoverview Tests for checking acorn works after espree was loaded.
 * @author Toru Nagashima
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as acorn from "acorn";
import assert from "node:assert";


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("acorn", () => {
    it("acorn.parse() should work after espree was loaded.", async () => {
        const before = acorn.parse("var foo = bar /*world*/;", { ecmaVersion: 5 });

        await import("../../espree.js");

        const after = acorn.parse("var foo = bar /*world*/;", { ecmaVersion: 5 });

        assert.deepStrictEqual(after, before);
    });
});
