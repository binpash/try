/**
 * @fileoverview Tests for ES2025 Import Attributes.
 * @author Yosuke Ota
 */

import assert from "node:assert";
import * as espree from "espree";
import { KEYS } from "eslint-visitor-keys";
import { analyze } from "../lib/index.js";

describe("Import Attributes", () => {

    describe("const type = \"json\"; import pkg from \"./package.json\" with { type: \"json\" };", () => {
        let ast;
        let scopeManager;
        let globalScope;

        beforeEach(() => {
            ast = espree.parse("const type = \"json\"; import pkg from \"./package.json\" with { type: \"json\" };", { ecmaVersion: 16, sourceType: "module" });
            scopeManager = analyze(ast, { ecmaVersion: 16, sourceType: "module", childVisitorKeys: KEYS });
            ({ globalScope } = scopeManager);
        });

        it("the global scope should not have any variables", () => {
            assert.strictEqual(globalScope.variables.length, 0);
        });

        it("the global scope should have one child scope, a module scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "module");
        });

        it("the module scope should not have any child scopes", () => {
            const moduleScope = globalScope.childScopes[0];

            assert.strictEqual(moduleScope.childScopes.length, 0);
        });

        it("the module scope should have two variables", () => {
            const moduleScope = globalScope.childScopes[0];

            assert.strictEqual(moduleScope.variables.length, 2);
            assert.strictEqual(moduleScope.variables[0].name, "type");
            assert.strictEqual(moduleScope.variables[1].name, "pkg");
        });

        it("the type variable should have one reference, a variable declaration", () => {
            const moduleScope = globalScope.childScopes[0];
            const typeVariable = moduleScope.variables[0];

            assert.strictEqual(typeVariable.references.length, 1);
            assert.strictEqual(typeVariable.references[0].identifier, ast.body[0].declarations[0].id);
        });
    });

    describe("const type = \"json\"; export * from \"./package.json\" with { type: \"json\" };", () => {
        let ast;
        let scopeManager;
        let globalScope;

        beforeEach(() => {
            ast = espree.parse("const type = \"json\"; export * from \"./package.json\" with { type: \"json\" };", { ecmaVersion: 16, sourceType: "module" });
            scopeManager = analyze(ast, { ecmaVersion: 16, sourceType: "module", childVisitorKeys: KEYS });
            ({ globalScope } = scopeManager);
        });

        it("the global scope should not have any variables", () => {
            assert.strictEqual(globalScope.variables.length, 0);
        });

        it("the global scope should have one child scope, a module scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "module");
        });

        it("the module scope should not have any child scopes", () => {
            const moduleScope = globalScope.childScopes[0];

            assert.strictEqual(moduleScope.childScopes.length, 0);
        });

        it("the module scope should have one variable, a type variable", () => {
            const moduleScope = globalScope.childScopes[0];

            assert.strictEqual(moduleScope.variables.length, 1);
            assert.strictEqual(moduleScope.variables[0].name, "type");
        });

        it("the type variable should have one reference, a variable declaration", () => {
            const moduleScope = globalScope.childScopes[0];
            const typeVariable = moduleScope.variables[0];

            assert.strictEqual(typeVariable.references.length, 1);
            assert.strictEqual(typeVariable.references[0].identifier, ast.body[0].declarations[0].id);
        });
    });


    describe("const type = \"json\"; export { default } from \"./package.json\" with { type: \"json\" };", () => {
        let ast;
        let scopeManager;
        let globalScope;

        beforeEach(() => {
            ast = espree.parse("const type = \"json\"; export { default } from \"./package.json\" with { type: \"json\" };", { ecmaVersion: 16, sourceType: "module" });
            scopeManager = analyze(ast, { ecmaVersion: 16, sourceType: "module", childVisitorKeys: KEYS });
            ({ globalScope } = scopeManager);
        });

        it("the global scope should not have any variables", () => {
            assert.strictEqual(globalScope.variables.length, 0);
        });

        it("the global scope should have one child scope, a module scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "module");
        });

        it("the module scope should not have any child scopes", () => {
            const moduleScope = globalScope.childScopes[0];

            assert.strictEqual(moduleScope.childScopes.length, 0);
        });

        it("the module scope should have one variable, a type variable", () => {
            const moduleScope = globalScope.childScopes[0];

            assert.strictEqual(moduleScope.variables.length, 1);
            assert.strictEqual(moduleScope.variables[0].name, "type");
        });

        it("the type variable should have one reference, a variable declaration", () => {
            const moduleScope = globalScope.childScopes[0];
            const typeVariable = moduleScope.variables[0];

            assert.strictEqual(typeVariable.references.length, 1);
            assert.strictEqual(typeVariable.references[0].identifier, ast.body[0].declarations[0].id);
        });
    });


    describe("const type = \"json\"; import(\"./package.json\", { with: { type } });", () => {
        let ast;
        let scopeManager;
        let globalScope;

        beforeEach(() => {
            ast = espree.parse("const type = \"json\"; import(\"./package.json\", { with: { type } });", { ecmaVersion: 16, sourceType: "module" });
            scopeManager = analyze(ast, { ecmaVersion: 16, sourceType: "module", childVisitorKeys: KEYS });
            ({ globalScope } = scopeManager);
        });

        it("the global scope should not have any variables", () => {
            assert.strictEqual(globalScope.variables.length, 0);
        });

        it("the global scope should have one child scope, a module scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "module");
        });

        it("the module scope should not have any child scopes", () => {
            const moduleScope = globalScope.childScopes[0];

            assert.strictEqual(moduleScope.childScopes.length, 0);
        });

        it("the module scope should have one variable, a type variable", () => {
            const moduleScope = globalScope.childScopes[0];

            assert.strictEqual(moduleScope.variables.length, 1);
            assert.strictEqual(moduleScope.variables[0].name, "type");
        });


        it("the type variable should have two references, a variable declaration and import options", () => {
            const moduleScope = globalScope.childScopes[0];
            const typeVariable = moduleScope.variables[0];

            assert.strictEqual(typeVariable.references.length, 2);
            assert.strictEqual(typeVariable.references[0].identifier, ast.body[0].declarations[0].id);
            assert.strictEqual(typeVariable.references[1].identifier, ast.body[1].expression.options.properties[0].value.properties[0].value);
        });
    });
});
