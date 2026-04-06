/**
 * @fileoverview Tests for class fields syntax.
 * @author Toru Nagashima
 */

import assert from "node:assert";
import * as espree from "espree";
import { KEYS } from "eslint-visitor-keys";
import { analyze } from "../lib/index.js";

describe("Class fields", () => {
    describe("class C { f = g }", () => {
        let scopes;

        beforeEach(() => {
            const ast = espree.parse("class C { f = g }", { ecmaVersion: 13 });
            const manager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            scopes = manager.globalScope.childScopes;
        });

        it("should create a class scope.", () => {
            assert.strictEqual(scopes.length, 1);
            assert.strictEqual(scopes[0].type, "class");
        });

        it("The class scope has no references.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("The class scope has only the variable 'C'; it doesn't have the field name 'f'.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.variables.length, 1);
            assert.strictEqual(classScope.variables[0].name, "C");
        });

        it("The class scope has a class-field-initializer scope.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-field-initializer");
        });

        it("The class-field-initializer scope's block is the node of the field initializer.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[0];

            assert.strictEqual(fieldInitializerScope.block.type, "Identifier");
            assert.strictEqual(fieldInitializerScope.block.name, "g");
        });

        it("The class-field-initializer scope's variableScope is itself.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[0];

            assert.strictEqual(fieldInitializerScope.variableScope, fieldInitializerScope);
        });

        it("The class-field-initializer scope has only the reference 'g'.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[0];

            assert.strictEqual(fieldInitializerScope.references.length, 1);
            assert.strictEqual(fieldInitializerScope.references[0].identifier.name, "g");
        });

        it("The class-field-initializer scope has no variables.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[0];

            assert.strictEqual(fieldInitializerScope.variables.length, 0);
        });
    });

    describe("class C { f }", () => {
        let scopes;

        beforeEach(() => {
            const ast = espree.parse("class C { f }", { ecmaVersion: 13 });
            const manager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            scopes = manager.globalScope.childScopes;
        });

        it("should create a class scope.", () => {
            assert.strictEqual(scopes.length, 1);
            assert.strictEqual(scopes[0].type, "class");
        });

        it("The class scope has no references.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("The class scope has no child scopes; fields that don't have initializers don't create any class-field-initializer scopes.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.childScopes.length, 0);
        });

        it("The class scope has only the variable 'C'; it doesn't have the field name 'f'.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.variables.length, 1);
            assert.strictEqual(classScope.variables[0].name, "C");
        });
    });

    describe("class C { #f = g }", () => {
        let scopes;

        beforeEach(() => {
            const ast = espree.parse("class C { #f = g }", { ecmaVersion: 13 });
            const manager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            scopes = manager.globalScope.childScopes;
        });

        it("should create a class scope.", () => {
            assert.strictEqual(scopes.length, 1);
            assert.strictEqual(scopes[0].type, "class");
        });

        it("The class scope has no references.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("The class scope has only the variable 'C'; it doesn't have the field name '#f'.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.variables.length, 1);
            assert.strictEqual(classScope.variables[0].name, "C");
        });

        it("The class scope has a class-field-initializer scope.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-field-initializer");
        });

        it("The class-field-initializer scope has only the reference 'g'.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[0];

            assert.strictEqual(fieldInitializerScope.references.length, 1);
            assert.strictEqual(fieldInitializerScope.references[0].identifier.name, "g");
        });

        it("The class-field-initializer scope has no variables.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[0];

            assert.strictEqual(fieldInitializerScope.variables.length, 0);
        });
    });

    describe("class C { [fname] }", () => {
        let scopes;

        beforeEach(() => {
            const ast = espree.parse("class C { [fname] }", { ecmaVersion: 13 });
            const manager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            scopes = manager.globalScope.childScopes;
        });

        it("should create a class scope.", () => {
            assert.strictEqual(scopes.length, 1);
            assert.strictEqual(scopes[0].type, "class");
        });

        it("The class scope has only the reference 'fname'.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.references.length, 1);
            assert.strictEqual(classScope.references[0].identifier.name, "fname");
        });

        it("The class scope has no child scopes; fields that don't have initializers don't create any class-field-initializer scopes.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.childScopes.length, 0);
        });
    });

    describe("class C { [fname] = value }", () => {
        let scopes;

        beforeEach(() => {
            const ast = espree.parse("class C { [fname] = value }", { ecmaVersion: 13 });
            const manager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            scopes = manager.globalScope.childScopes;
        });

        it("should create a class scope.", () => {
            assert.strictEqual(scopes.length, 1);
            assert.strictEqual(scopes[0].type, "class");
        });

        it("The class scope has only the reference 'fname'; it doesn't have the reference 'value'.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.references.length, 1);
            assert.strictEqual(classScope.references[0].identifier.name, "fname");
        });

        it("The class scope has a class-field-initializer scope.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-field-initializer");
        });

        it("The class-field-initializer scope has the reference 'value'.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[0];

            assert.strictEqual(fieldInitializerScope.references.length, 1);
            assert.strictEqual(fieldInitializerScope.references[0].identifier.name, "value");
        });

        it("The class-field-initializer scope has no variables.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[0];

            assert.strictEqual(fieldInitializerScope.variables.length, 0);
        });
    });

    describe("class C { #f = g; e = this.#f }", () => {
        let scopes;

        beforeEach(() => {
            const ast = espree.parse("class C { #f = g; e = this.#f }", { ecmaVersion: 13 });
            const manager = analyze(ast, { ecmaVersion: 13, childVistorKeys: KEYS });

            scopes = manager.globalScope.childScopes;
        });

        it("should create a class scope.", () => {
            assert.strictEqual(scopes.length, 1);
            assert.strictEqual(scopes[0].type, "class");
        });

        it("The class scope has no references.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("The class scope has only the variable 'C'; it doesn't have the field names '#f' or 'e'.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.variables.length, 1);
            assert.strictEqual(classScope.variables[0].name, "C");
        });

        it("The class scope has two class-field-initializer scopes.", () => {
            const classScope = scopes[0];

            assert.strictEqual(classScope.childScopes.length, 2);
            assert.strictEqual(classScope.childScopes[0].type, "class-field-initializer");
            assert.strictEqual(classScope.childScopes[1].type, "class-field-initializer");
        });

        it("The first class-field-initializer scope has only the reference 'g'.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[0];

            assert.strictEqual(fieldInitializerScope.references.length, 1);
            assert.strictEqual(fieldInitializerScope.references[0].identifier.name, "g");
        });

        it("The first class-field-initializer scope has no variables.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[0];

            assert.strictEqual(fieldInitializerScope.variables.length, 0);
        });

        it("The second class-field-initializer scope has no references.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[1];

            assert.strictEqual(fieldInitializerScope.references.length, 0);
        });

        it("The second class-field-initializer scope has no variables.", () => {
            const classScope = scopes[0];
            const fieldInitializerScope = classScope.childScopes[1];

            assert.strictEqual(fieldInitializerScope.variables.length, 0);
        });
    });
});
