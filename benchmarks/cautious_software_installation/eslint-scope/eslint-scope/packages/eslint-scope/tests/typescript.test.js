/**
 * @fileoverview Typescript scope tests
 * @author Reyad Attiyat
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { expect } from "chai";
import typescriptEslintParser from "@typescript-eslint/parser";
import { analyze } from "../lib/index.js";

const { parse } = typescriptEslintParser;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("typescript", () => {
    describe("multiple call signatures", () => {
        it("should create a function scope", () => {
            const ast = parse(`
                function foo(bar: number): number;
                function foo(bar: string): string;
                function foo(bar: string | number): string | number {
                    return bar;
                }
            `, {
                range: true
            });

            const scopeManager = analyze(ast);

            expect(scopeManager.scopes).to.have.length(2);

            const globalScope = scopeManager.scopes[0];

            expect(globalScope.type).to.be.equal("global");
            expect(globalScope.variables).to.have.length(1);
            expect(globalScope.references).to.have.length(4);
            expect(globalScope.isArgumentsMaterialized()).to.be.true;

            const scope = scopeManager.scopes[1];

            expect(scope.type).to.be.equal("function");
            expect(scope.variables).to.have.length(2);
            expect(scope.variables[0].name).to.be.equal("arguments");
            expect(scope.isArgumentsMaterialized()).to.be.false;
            expect(scope.references).to.have.length(1);
        });
    });
});
