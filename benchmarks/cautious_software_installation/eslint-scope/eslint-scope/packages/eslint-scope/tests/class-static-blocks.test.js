/**
 * @fileoverview Tests for class static blocks.
 * @author Milos Djermanovic
 */

import assert from "node:assert";
import * as espree from "espree";
import { KEYS } from "eslint-visitor-keys";
import { analyze } from "../lib/index.js";

describe("Class static blocks", () => {

    describe("class C { static { var a; let b; const c = 1; function d(){} class e {} } }", () => {
        let ast;
        let scopeManager;
        let globalScope;

        beforeEach(() => {
            ast = espree.parse("class C { static { var a; let b; const c = 1; function d(){} class e {} } }", { ecmaVersion: 13 });
            scopeManager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });
            ({ globalScope } = scopeManager);
        });

        it("the global scope should have one variable, named `C`", () => {
            assert.strictEqual(globalScope.variables.length, 1);
            assert.strictEqual(globalScope.variables[0].name, "C");
        });

        it("the global scope should have one child scope, a class scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "class");
        });

        it("the class scope should have one variable, named `C`", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.variables.length, 1);
            assert.strictEqual(classScope.variables[0].name, "C");
        });

        it("the class scope should have one child scope, a class static block scope", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-static-block");
        });

        it("the class static block scope should have two child scopes, a function and a class scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.childScopes.length, 2);
            assert.strictEqual(classStaticBlockScope.childScopes[0].type, "function");
            assert.strictEqual(classStaticBlockScope.childScopes[0].upper, classStaticBlockScope);
            assert.strictEqual(classStaticBlockScope.childScopes[1].type, "class");
            assert.strictEqual(classStaticBlockScope.childScopes[1].upper, classStaticBlockScope);
        });

        it("the class static block scope's `upper` scope should be the class scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.upper, classScope);
        });

        it("the class static block scope's `variableScope` is itself", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.variableScope, classStaticBlockScope);
        });

        it("the class static block scope should be strict", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.isStrict, true);
        });

        it("the class static block scope's `functionExpressionScope` property should have value `false`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.functionExpressionScope, false);
        });

        it("the class static block scope's `block` node is the `StaticBlock` node from the AST", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const staticBlockNode = ast.body[0].body.body[0];

            assert.strictEqual(staticBlockNode.type, "StaticBlock");
            assert.strictEqual(classStaticBlockScope.block, staticBlockNode);
        });

        it("the class static block scope should be returned by ScopeManager#acquire for the `StaticBlock` node from the AST", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const staticBlockNode = ast.body[0].body.body[0];

            assert.strictEqual(staticBlockNode.type, "StaticBlock");
            assert.strictEqual(scopeManager.acquire(staticBlockNode, /* inner = */ false), classStaticBlockScope);
            assert.strictEqual(scopeManager.acquire(staticBlockNode, /* inner = */ true), classStaticBlockScope);
        });

        it("the `StaticBlock` node itself doesn't declare any variables", () => {
            const staticBlockNode = ast.body[0].body.body[0];

            assert.strictEqual(staticBlockNode.type, "StaticBlock");
            assert.strictEqual(scopeManager.getDeclaredVariables(staticBlockNode).length, 0);
        });

        it("the class static block scope should have 5 variables: `a`, `b`, `c`, `d`, `e`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const expectedVariableNames = ["a", "b", "c", "d", "e"];

            assert.deepStrictEqual(classStaticBlockScope.variables.map(v => v.name), expectedVariableNames);
            assert.deepStrictEqual([...classStaticBlockScope.set.keys()], expectedVariableNames);
            assert.deepStrictEqual([...classStaticBlockScope.set.values()], classStaticBlockScope.variables);
            classStaticBlockScope.variables.forEach(variable => {
                assert.strictEqual(variable.scope, classStaticBlockScope);
            });
        });
    });

    describe("class C { static { function f(){} f(); } }", () => {
        let globalScope;

        beforeEach(() => {
            const ast = espree.parse("class C { static { function f(){} f(); } }", { ecmaVersion: 13 });
            const scopeManager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            ({ globalScope } = scopeManager);
        });

        it("the global scope should have no references", () => {
            assert.strictEqual(globalScope.references.length, 0);
        });

        it("the global scope should have no `through` references", () => {
            assert.strictEqual(globalScope.through.length, 0);
        });

        it("the global scope should have one child scope, a class scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "class");
        });

        it("the class scope should have no references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("the class scope should have no `through` references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.through.length, 0);
        });

        it("the class scope should have one child scope, a class static block scope", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-static-block");
        });

        it("the class static block scope should have no `through` references`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.through.length, 0);
        });

        it("the class static block scope should have one variable, named `f`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.variables.length, 1);
            assert.strictEqual(classStaticBlockScope.variables[0].name, "f");
        });

        it("the class static block scope should have one reference, to the variable `f`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.references.length, 1);
            assert.strictEqual(classStaticBlockScope.references[0].resolved, classStaticBlockScope.variables[0]);
        });

        it("the variable `f` should have one reference, from the class static block scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const f = classStaticBlockScope.variables[0];

            assert.strictEqual(f.references.length, 1);
            assert.strictEqual(f.references[0].from, classStaticBlockScope);
            assert.strictEqual(f.references[0], classStaticBlockScope.references[0]);
        });
    });

    describe("class C { static { a = 1; if (this.x) { var a; } } }", () => {
        let globalScope;

        beforeEach(() => {
            const ast = espree.parse("class C { static { a = 1; if (this.x) { var a; } } }", { ecmaVersion: 13 });
            const scopeManager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            ({ globalScope } = scopeManager);
        });

        it("the global scope should have no references", () => {
            assert.strictEqual(globalScope.references.length, 0);
        });

        it("the global scope should have no `through` references", () => {
            assert.strictEqual(globalScope.through.length, 0);
        });

        it("the global scope should have one child scope, a class scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "class");
        });

        it("the class scope should have no references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("the class scope should have no `through` references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.through.length, 0);
        });

        it("the class scope should have one child scope, a class static block scope", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-static-block");
        });

        it("the class static block scope should have no `through` references`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.through.length, 0);
        });

        it("the class static block scope should have one variable, named `a`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.variables.length, 1);
            assert.strictEqual(classStaticBlockScope.variables[0].name, "a");
        });

        it("the class static block scope should have one reference, to the variable `a`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.references.length, 1);
            assert.strictEqual(classStaticBlockScope.references[0].resolved, classStaticBlockScope.variables[0]);
        });

        it("the variable `a` should have one reference, from the class static block scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const a = classStaticBlockScope.variables[0];

            assert.strictEqual(a.references.length, 1);
            assert.strictEqual(a.references[0].from, classStaticBlockScope);
        });

        it("the class static block scope should have one child scope, a block scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.childScopes.length, 1);
            assert.strictEqual(classStaticBlockScope.childScopes[0].type, "block");
        });

        it("the block scope should have no variables", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];

            assert.strictEqual(blockScope.variables.length, 0);
        });

        it("the block scope should have no references", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];

            assert.strictEqual(blockScope.references.length, 0);
        });
    });

    describe("class C { static { if (this.x) { var a; a = 1; } } }", () => {
        let globalScope;

        beforeEach(() => {
            const ast = espree.parse("class C { static { if (this.x) { var a; a = 1; } } }", { ecmaVersion: 13 });
            const scopeManager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            ({ globalScope } = scopeManager);
        });

        it("the global scope should have no references", () => {
            assert.strictEqual(globalScope.references.length, 0);
        });

        it("the global scope should have no `through` references", () => {
            assert.strictEqual(globalScope.through.length, 0);
        });

        it("the global scope should have one child scope, a class scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "class");
        });

        it("the class scope should have no references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("the class scope should have no `through` references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.through.length, 0);
        });

        it("the class scope should have one child scope, a class static block scope", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-static-block");
        });

        it("the class static block scope should have no `through` references`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.through.length, 0);
        });

        it("the class static block scope should have one variable, named `a`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.variables.length, 1);
            assert.strictEqual(classStaticBlockScope.variables[0].name, "a");
        });

        it("the class static block scope should have no references", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.references.length, 0);
        });

        it("the class static block scope should have one child scope, a block scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.childScopes.length, 1);
            assert.strictEqual(classStaticBlockScope.childScopes[0].type, "block");
        });

        it("the variable `a` should have one reference, from the block scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];
            const a = classStaticBlockScope.variables[0];

            assert.strictEqual(a.references.length, 1);
            assert.strictEqual(a.references[0].from, blockScope);
        });

        it("the block scope should have no variables", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];

            assert.strictEqual(blockScope.variables.length, 0);
        });

        it("the block scope should have one reference, to the variable `a`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];
            const a = classStaticBlockScope.variables[0];

            assert.strictEqual(blockScope.references.length, 1);
            assert.strictEqual(blockScope.references[0].resolved, a);
        });
    });

    describe("class C { static { const { a } = this.foo; if (this.bar) { const b = a + 1; this.baz(b); } } }", () => {
        let globalScope;

        beforeEach(() => {
            const ast = espree.parse("class C { static { const { a } = this.foo; if (this.bar) { const b = a + 1; this.baz(b); } } }", { ecmaVersion: 13 });
            const scopeManager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            ({ globalScope } = scopeManager);
        });

        it("the global scope should have no references", () => {
            assert.strictEqual(globalScope.references.length, 0);
        });

        it("the global scope should have no `through` references", () => {
            assert.strictEqual(globalScope.through.length, 0);
        });

        it("the global scope should have one child scope, a class scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "class");
        });

        it("the class scope should have no references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("the class scope should have no `through` references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.through.length, 0);
        });

        it("the class scope should have one child scope, a class static block scope", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-static-block");
        });

        it("the class static block scope should have one child scope, a block scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.childScopes.length, 1);
            assert.strictEqual(classStaticBlockScope.childScopes[0].type, "block");
        });

        it("the class static block scope should have one variable, named `a`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.variables.length, 1);
            assert.strictEqual(classStaticBlockScope.variables[0].name, "a");
        });

        it("the variable `a` should have a write reference from the class static block scope, and a read reference from the block scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];

            const a = classStaticBlockScope.variables[0];

            assert.strictEqual(a.references.length, 2);
            assert.strictEqual(a.references[0].isWriteOnly(), true);
            assert.strictEqual(a.references[0].from, classStaticBlockScope);
            assert.strictEqual(a.references[1].isReadOnly(), true);
            assert.strictEqual(a.references[1].from, blockScope);
        });

        it("the class static block scope should have no `through` references`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.through.length, 0);
        });

        it("the block scope should have one variable, named `b`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];

            assert.strictEqual(blockScope.variables.length, 1);
            assert.strictEqual(blockScope.variables[0].name, "b");
        });

        it("the variable `b` should have a write reference and a read reference from the block scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];

            const b = blockScope.variables[0];

            assert.strictEqual(b.references.length, 2);
            assert.strictEqual(b.references[0].isWriteOnly(), true);
            assert.strictEqual(b.references[0].from, blockScope);
            assert.strictEqual(b.references[1].isReadOnly(), true);
            assert.strictEqual(b.references[1].from, blockScope);
        });

        it("the block scope should have one `through` reference, to the variable `a`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];

            const a = classStaticBlockScope.variables[0];

            assert.strictEqual(blockScope.through.length, 1);
            assert.strictEqual(blockScope.through[0].resolved, a);
        });
    });

    describe("class C { static { C.x; } }", () => {
        let globalScope;

        beforeEach(() => {
            const ast = espree.parse("class C { static { C.x; } }", { ecmaVersion: 13 });
            const scopeManager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            ({ globalScope } = scopeManager);
        });

        it("the global scope should have no references", () => {
            assert.strictEqual(globalScope.references.length, 0);
        });

        it("the global scope should have no `through` references", () => {
            assert.strictEqual(globalScope.through.length, 0);
        });

        it("the global scope should have variable `C`", () => {
            assert.strictEqual(globalScope.set.has("C"), true);
        });

        it("the global variable `C` should have no references", () => {
            assert.strictEqual(globalScope.set.get("C").references.length, 0);
        });

        it("the global scope should have one child scope, a class scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "class");
        });

        it("the class scope should have no references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("the class scope should have no `through` references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.through.length, 0);
        });

        it("the class scope should have one child scope, a class static block scope", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-static-block");
        });

        it("the class scope should have variable `C`", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.set.has("C"), true);
        });

        it("the class scope's variable `C` should have one reference, from the class static block scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            const C = classScope.set.get("C");

            assert.strictEqual(C.references.length, 1);
            assert.strictEqual(C.references[0].from, classStaticBlockScope);
        });

        it("the class static block scope should have one reference, to the class scope's variable `C`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            const C = classScope.set.get("C");

            assert.strictEqual(classStaticBlockScope.references.length, 1);
            assert.strictEqual(classStaticBlockScope.references[0].resolved, C);
        });

        it("the class static block scope should have one `through` reference, to the class scope's variable `C`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            const C = classScope.set.get("C");

            assert.strictEqual(classStaticBlockScope.through.length, 1);
            assert.strictEqual(classStaticBlockScope.through[0].resolved, C);
        });

        it("the class static block scope should have no variables", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.variables.length, 0);
        });
    });

    describe("let a; class C { static { lbl: { this.b = a } } }", () => {
        let globalScope;

        beforeEach(() => {
            const ast = espree.parse("let a; class C { static { lbl: { this.b = a } } }", { ecmaVersion: 13 });
            const scopeManager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            ({ globalScope } = scopeManager);
        });

        it("the global scope should have no references", () => {
            assert.strictEqual(globalScope.references.length, 0);
        });

        it("the global scope should have no `through` references", () => {
            assert.strictEqual(globalScope.through.length, 0);
        });

        it("the global scope should have variable `a`", () => {
            assert.strictEqual(globalScope.set.has("a"), true);
        });

        it("the global scope should have one child scope, a class scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "class");
        });

        it("the class scope should have no references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("the class scope should have one `through` reference, a reference to `a`", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.through.length, 1);
            assert.strictEqual(classScope.through[0].resolved, globalScope.set.get("a"));
        });

        it("the class scope should have one child scope, a class static block scope", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-static-block");
        });

        it("the class static block scope should have no references", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.references.length, 0);
        });

        it("the class static block scope should have one `through` reference, a reference to `a`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.through.length, 1);
            assert.strictEqual(classStaticBlockScope.through[0].resolved, globalScope.set.get("a"));
        });

        it("the class static block scope should have one child scope, a block scope", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.childScopes.length, 1);
            assert.strictEqual(classStaticBlockScope.childScopes[0].type, "block");
        });

        it("the block scope should have one reference, a reference to `a", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];

            assert.strictEqual(blockScope.references.length, 1);
            assert.strictEqual(blockScope.references[0].resolved, globalScope.set.get("a"));
        });

        it("the block scope should have one `through` reference, a reference to `a", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];
            const blockScope = classStaticBlockScope.childScopes[0];

            assert.strictEqual(blockScope.through.length, 1);
            assert.strictEqual(blockScope.through[0].resolved, globalScope.set.get("a"));
        });
    });

    describe("class C { static { a; } }", () => {
        let globalScope;

        beforeEach(() => {
            const ast = espree.parse("class C { static { a; } }", { ecmaVersion: 13 });
            const scopeManager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            ({ globalScope } = scopeManager);
        });

        it("the global scope should have one child scope, a class scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "class");
        });

        it("the class scope should have one child scope, a class static block scope", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.childScopes.length, 1);
            assert.strictEqual(classScope.childScopes[0].type, "class-static-block");
        });

        it("the class static block scope should have one unresolved reference, with identifier `a`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            assert.strictEqual(classStaticBlockScope.references.length, 1);
            assert.strictEqual(classStaticBlockScope.references[0].resolved, null);
        });

        it("the class static block scope and all upper scopes should have the unresolved reference in `through`", () => {
            const classScope = globalScope.childScopes[0];
            const classStaticBlockScope = classScope.childScopes[0];

            const reference = classStaticBlockScope.references[0];

            let scope = classStaticBlockScope;

            do {
                assert.strictEqual(scope.through[0], reference);
                scope = scope.upper;
            } while (scope);
        });
    });

    describe("let a; class C { static { let a; a; } static { a; let a; } }", () => {
        let globalScope;

        beforeEach(() => {
            const ast = espree.parse("let a; class C { static { let a; a; } static { a; let a; } }", { ecmaVersion: 13, range: true });
            const scopeManager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            ({ globalScope } = scopeManager);
        });

        it("the global scope should have variable `a`", () => {
            assert.strictEqual(globalScope.set.has("a"), true);
        });

        it("the global scope variable `a` should not have any references", () => {
            assert.strictEqual(globalScope.set.get("a").references.length, 0);
        });

        it("the global scope should have one child scope, a class scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "class");
        });

        it("the class scope should have no references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.references.length, 0);
        });

        it("the class scope should have no `through` references", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.through.length, 0);
        });

        it("the class scope should have two child scopes, and those are two different class static block scopes", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.childScopes.length, 2);
            assert.strictEqual(classScope.childScopes[0].type, "class-static-block");
            assert.strictEqual(classScope.childScopes[0].block.type, "StaticBlock");
            assert.strictEqual(classScope.childScopes[1].type, "class-static-block");
            assert.strictEqual(classScope.childScopes[1].block.type, "StaticBlock");
            assert.ok(classScope.childScopes[0] !== classScope.childScopes[1], "Class static block scopes are same");
            assert.ok(classScope.childScopes[0].block !== classScope.childScopes[1].block, "Class static block scopes are on the same node");
            assert.ok(classScope.childScopes[0].upper === classScope.childScopes[1].upper, "Class static block scopes don't have the same upper scope");
        });

        it("each of the two class static block scopes should have one variable `a` and one reference to that variable", () => {
            const classScope = globalScope.childScopes[0];

            classScope.childScopes.forEach(classStaticBlockScope => {
                assert.strictEqual(classStaticBlockScope.variables.length, 1);

                const variable = classStaticBlockScope.variables[0];

                assert.ok(variable.scope === classStaticBlockScope, "Variable is from another scope");
                assert.strictEqual(variable.name, "a");
                assert.strictEqual(variable.references.length, 1);

                const reference = variable.references[0];
                const referenceIdentifier = reference.identifier;
                const staticBlockNode = classStaticBlockScope.block;

                assert.ok(
                    reference.from === classStaticBlockScope,
                    "Reference is from another scope"
                );

                assert.ok(
                    staticBlockNode.range[0] <= referenceIdentifier.range[0] &&
                    referenceIdentifier.range[1] <= staticBlockNode.range[1],
                    "Reference is from another node"
                );
            });
        });
    });

    describe("let a; class C { [a]; static { let a; } [a]; static { function a(){} } [a]; static { var a; } [a]; }", () => {
        let globalScope;

        beforeEach(() => {
            const ast = espree.parse("let a; class C { [a]; static { let a; } [a]; static { function a(){} } [a]; static { var a; } [a]; }", { ecmaVersion: 13 });
            const scopeManager = analyze(ast, { ecmaVersion: 13, childVisitorKeys: KEYS });

            ({ globalScope } = scopeManager);
        });

        it("the global scope should have variable `a`", () => {
            assert.strictEqual(globalScope.set.has("a"), true);
        });

        it("the global scope should have one child scope, a class scope", () => {
            assert.strictEqual(globalScope.childScopes.length, 1);
            assert.strictEqual(globalScope.childScopes[0].type, "class");
        });

        it("the global variable `a` should have 4 references from the class scope", () => {
            const a = globalScope.set.get("a");
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(a.references.length, 4);

            a.references.forEach(reference => {
                assert.strictEqual(reference.from, classScope);
            });
        });

        it("the class scope should have 3 child scopes, and those are class static block scopes", () => {
            const classScope = globalScope.childScopes[0];

            assert.strictEqual(classScope.childScopes.length, 3);
            assert.strictEqual(classScope.childScopes[0].type, "class-static-block");
            assert.strictEqual(classScope.childScopes[1].type, "class-static-block");
            assert.strictEqual(classScope.childScopes[2].type, "class-static-block");
        });

        it("each of the class static block scopes should have one variable named `a` with no references", () => {
            const classScope = globalScope.childScopes[0];

            classScope.childScopes.forEach(classStaticBlockScope => {
                assert.strictEqual(classStaticBlockScope.variables.length, 1);

                const variable = classStaticBlockScope.variables[0];

                assert.strictEqual(variable.name, "a");
                assert.strictEqual(variable.references.length, 0);
            });
        });
    });
});
