/**
 * @fileoverview Tests for ES2026 `using` and `await using`.
 * @author Yosuke Ota
 */

import { expect } from "chai";
import * as espree from "espree";
import { analyze } from "../lib/index.js";

describe("`using` and `await using` block scope", () => {
    it("`using` in block scope", () => {
        const ast = espree.parse(`
            {
                using i = 42;
                i;
            }
        `, { ecmaVersion: 2026 });

        const scopeManager = analyze(ast, { ecmaVersion: 2026 });

        expect(scopeManager.scopes).to.have.length(2); // Program and BlockStatement scope.

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("block");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("i");
        expect(scope.references).to.have.length(2);
        expect(scope.references[0].identifier.name).to.be.equal("i");
        expect(scope.references[1].identifier.name).to.be.equal("i");
    });
    it("`await using` in block scope", () => {
        const ast = espree.parse(`
            async function fn() {
                {
                    await using i = 42;
                    i;
                }
            }
        `, { ecmaVersion: 2026 });

        const scopeManager = analyze(ast, { ecmaVersion: 2026 });

        expect(scopeManager.scopes).to.have.length(3); // Program, Function, and BlockStatement scope.

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("fn");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("arguments");

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("block");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("i");
        expect(scope.references).to.have.length(2);
        expect(scope.references[0].identifier.name).to.be.equal("i");
        expect(scope.references[1].identifier.name).to.be.equal("i");
    });
});
