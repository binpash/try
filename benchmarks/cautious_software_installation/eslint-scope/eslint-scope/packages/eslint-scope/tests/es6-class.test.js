// -*- coding: utf-8 -*-
//  Copyright (C) 2014 Yusuke Suzuki <utatane.tea@gmail.com>
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//    * Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
//  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
//  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
//  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
//  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
//  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import { expect } from "chai";
import espree from "./util/espree.js";
import { analyze } from "../lib/index.js";

describe("ES6 class", () => {
    it("declaration name creates class scope", () => {
        const ast = espree(`
            class Derived extends Base {
                constructor() {
                }
            }
            new Derived();
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("Derived");
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].identifier.name).to.be.equal("Derived");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassDeclaration");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("Derived");
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].identifier.name).to.be.equal("Base");

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("FunctionExpression");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.references).to.have.length(0);
    });

    it("expression name creates class scope#1", () => {
        const ast = espree(`
            (class Derived extends Base {
                constructor() {
                }
            });
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassExpression");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("Derived");
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].identifier.name).to.be.equal("Base");

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("FunctionExpression");
    });

    it("expression name creates class scope#2", () => {
        const ast = espree(`
            (class extends Base {
                constructor() {
                }
            });
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassExpression");
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].identifier.name).to.be.equal("Base");

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("FunctionExpression");
    });

    it("computed property key may refer variables", () => {
        const ast = espree(`
            (function () {
                var yuyushiki = 42;
                (class {
                    [yuyushiki]() {
                    }

                    [yuyushiki + 40]() {
                    }
                });
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(5);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("FunctionExpression");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(2);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("yuyushiki");
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].identifier.name).to.be.equal("yuyushiki");

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassExpression");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(2);
        expect(scope.references[0].identifier.name).to.be.equal("yuyushiki");
        expect(scope.references[1].identifier.name).to.be.equal("yuyushiki");
    });

    // https://github.com/eslint/eslint-scope/issues/59
    it("class heritage may refer class name in class expressions #1", () => {
        const ast = espree(`
            const A = class A extends A {}
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("A"); // variable `A` defined by `const A`
        expect(scope.variables[0].references).to.have.length(1); // init reference `A` in `const A`
        expect(scope.variables[0].references[0].init).to.be.true;
        expect(scope.references).to.have.length(1);
        expect(scope.references[0]).to.be.equal(scope.variables[0].references[0]);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassExpression");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("A"); // variable `A` defined by `class A`
        expect(scope.variables[0].references).to.have.length(1); // reference `A` in `extends A`
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
        expect(scope.references[0]).to.be.equal(scope.variables[0].references[0]);
    });

    it("class heritage may refer class name in class expressions #2", () => {
        const ast = espree(`
            let foo;
            (class C extends (foo = C, class {}) {});
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("foo");
        expect(scope.references).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassExpression");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("C");
        expect(scope.variables[0].references).to.have.length(1);
        expect(scope.references).to.have.length(2);
        expect(scope.references[0].identifier.name).to.be.equal("foo");
        expect(scope.references[1].identifier.name).to.be.equal("C");

        // `C` in `foo = C` is a reference to variable `C` defined by `class C`
        expect(scope.references[1].resolved).to.be.equal(scope.variables[0]);
        expect(scope.references[1]).to.be.equal(scope.variables[0].references[0]);

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassExpression");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
    });

    it("class heritage may refer class name in class declarations", () => {
        const ast = espree(`
            let foo;
            class C extends (foo = C, class {}) {}
            new C();
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(2);
        expect(scope.variables[0].name).to.be.equal("foo");
        expect(scope.variables[0].references).to.have.length(1);
        expect(scope.variables[1].name).to.be.equal("C");
        expect(scope.variables[1].references).to.have.length(1);
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].identifier.name).to.be.equal("C"); // `C` in `new C()`
        expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
        expect(scope.references[0]).to.be.equal(scope.variables[1].references[0]);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassDeclaration");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("C");
        expect(scope.variables[0].references).to.have.length(1);
        expect(scope.references).to.have.length(2);
        expect(scope.references[0].identifier.name).to.be.equal("foo");
        expect(scope.references[1].identifier.name).to.be.equal("C"); // `C` in `foo = C`

        /*
         * `class C` creates two variables `C`: one in the scope where the class
         * is declared, another in the class scope. References inside the class
         * should be to the variable in the class scope.
         */
        expect(scope.references[1].resolved).to.be.equal(scope.variables[0]);
        expect(scope.references[1]).to.be.equal(scope.variables[0].references[0]);

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassExpression");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
    });

    it("inner scopes in the class heritage of a class expression are nested in the class scope", () => {
        const ast = espree(`
            (class extends function () {} {})
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassExpression");
        expect(scope.isStrict).to.be.true;

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("FunctionExpression");
        expect(scope.isStrict).to.be.true;
        expect(scope.upper).to.be.equal(scopeManager.scopes[1]);
        expect(scopeManager.scopes[1].childScopes).to.have.length(1);
        expect(scopeManager.scopes[1].childScopes[0]).to.be.equal(scope);
    });

    it("inner scopes in the class heritage of a class declaration are nested in the class scope", () => {
        const ast = espree(`
            class C extends function () {} {}
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("class");
        expect(scope.block.type).to.be.equal("ClassDeclaration");
        expect(scope.isStrict).to.be.true;

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("FunctionExpression");
        expect(scope.isStrict).to.be.true;
        expect(scope.upper).to.be.equal(scopeManager.scopes[1]);
        expect(scopeManager.scopes[1].childScopes).to.have.length(1);
        expect(scopeManager.scopes[1].childScopes[0]).to.be.equal(scope);
    });

    it("regression #49", () => {
        const ast = espree(`
            class Shoe {
                constructor() {
                    //Shoe.x = true;
                }
            }
            let shoe = new Shoe();
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3);

        const scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(2);
        expect(scope.variables[0].name).to.be.equal("Shoe");
        expect(scope.variables[1].name).to.be.equal("shoe");
        expect(scope.references).to.have.length(2);
        expect(scope.references[0].identifier.name).to.be.equal("shoe");
        expect(scope.references[1].identifier.name).to.be.equal("Shoe");
    });
});

// vim: set sw=4 ts=4 et tw=80 :
