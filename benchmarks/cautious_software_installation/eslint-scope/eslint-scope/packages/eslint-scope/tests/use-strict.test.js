/**
 * @fileoverview Tests for "use strict" directives.
 * @author Milos Djermanovic
 */

import assert from "node:assert";
import * as espree from "espree";
import { KEYS } from "eslint-visitor-keys";
import { analyze } from "../lib/index.js";
import { getSupportedEcmaVersions } from "./util/ecma-version.js";

/**
 * Asserts `isStrict` property value for the given scope and all its descendants.
 * @param {Scope} scope The scope to check.
 * @param {boolean} expected The expected value for `isStrict` property.
 * @throws {AssertionError} If `isStrict` property value of `scope` or of
 *      any of its descendant scopes doesn't match `expected`.
 * @returns {void}
 */
function assertIsStrictRecursively(scope, expected) {
    assert.strictEqual(scope.isStrict, expected);

    scope.childScopes.forEach(childScope => {
        assertIsStrictRecursively(childScope, expected);
    });
}

describe("'use strict' directives", () => {

    it("should be ignored when ecmaVersion = 3", () => {
        const ecmaVersion = 3;

        const ast = espree.parse(`
            "use strict";
            function a() {
                "use strict";
                function b() {
                    foo();
                }
            }
        `, { ecmaVersion, range: true });

        const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

        assertIsStrictRecursively(globalScope, false);
    });

    it("at the top level should make all scopes strict when ecmaVersion >= 5", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                "use strict";
                if (a) {
                    foo();
                }
                function b() {
                    if (c) {
                        foo();
                    }
                    function d() {
                        if (e) {
                            foo();
                        }
                    }
                }
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assertIsStrictRecursively(globalScope, true);
        });
    });

    it("at the function level should make the function's scope and all its descendants strict when ecmaVersion >= 5", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                function a() {
                    "use strict";
                    if (b) {
                        foo();
                    }
                    function c() {
                        if (d) {
                            foo();
                        }
                    }
                }
                function e() {
                    if (f) {
                        foo();
                    }
                }
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, false);
            assertIsStrictRecursively(globalScope.childScopes[0], true); // function a() { ... }
            assertIsStrictRecursively(globalScope.childScopes[1], false); // function e() { ... }
        });
    });

    it("can be with single quotes at the top level", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                'use strict';
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, true);
        });
    });

    it("can be without the semicolon at the top level", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                "use strict"
                foo()
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, true);
        });
    });

    it("can be anywhere in the directive prologue at the top level", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                "foo";
                "use strict";
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, true);
        });
    });

    it("cannot be after the directive prologue at the top level", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                foo();
                "use strict";
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, false);
        });
    });

    it("cannot contain escapes at the top level", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                "use \\strict";
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, false);
        });
    });

    it("cannot be parenthesized at the top level", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                ("use strict");
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, false);
        });
    });

    it("can be with single quotes in a function", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                function foo() {
                    'use strict';
                }
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, false);
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "function");
            assert.strictEqual(globalScope.childScopes[0].isStrict, true);
        });
    });

    it("can be without the semicolon in a function", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                function foo() {
                    "use strict"
                    bar()
                }
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, false);
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "function");
            assert.strictEqual(globalScope.childScopes[0].isStrict, true);
        });
    });

    it("can be anywhere in the directive prologue in a function", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                function foo() {
                    "foo";
                    "use strict";
                }
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, false);
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "function");
            assert.strictEqual(globalScope.childScopes[0].isStrict, true);
        });
    });

    it("cannot be after the directive prologue in a function", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                function foo() {
                    bar();
                    "use strict";
                }
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, false);
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "function");
            assert.strictEqual(globalScope.childScopes[0].isStrict, false);
        });
    });

    it("cannot contain escapes in a function", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                function foo() {
                    "use \\strict";
                }
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, false);
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "function");
            assert.strictEqual(globalScope.childScopes[0].isStrict, false);
        });
    });

    it("cannot be parenthesized in a function", () => {
        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const ast = espree.parse(`
                function foo() {
                    ("use strict");
                }
            `, { ecmaVersion, range: true });

            const { globalScope } = analyze(ast, { ecmaVersion, childVisitorKeys: KEYS });

            assert.strictEqual(globalScope.isStrict, false);
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "function");
            assert.strictEqual(globalScope.childScopes[0].isStrict, false);
        });
    });
});
