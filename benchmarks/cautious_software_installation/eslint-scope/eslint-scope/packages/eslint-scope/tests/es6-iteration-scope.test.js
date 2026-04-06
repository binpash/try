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
import { getSupportedEcmaVersions } from "./util/ecma-version.js";
import { analyze } from "../lib/index.js";

describe("ES6 iteration scope", () => {
    it("let materialize iteration scope for ForInStatement#1", () => {
        getSupportedEcmaVersions({ min: 6 }).forEach(ecmaVersion => {
            const ast = espree(`
                (function () {
                    let i = 20;
                    for (let i in i) {
                        console.log(i);
                    }
                }());
            `);

            const scopeManager = analyze(ast, { ecmaVersion });

            expect(scopeManager.scopes).to.have.length(4);

            let scope = scopeManager.scopes[0];

            expect(scope.type).to.be.equal("global");
            expect(scope.variables).to.have.length(0);

            scope = scopeManager.scopes[1];
            expect(scope.type).to.be.equal("function");
            expect(scope.variables).to.have.length(2);
            expect(scope.variables[0].name).to.be.equal("arguments");
            expect(scope.variables[1].name).to.be.equal("i");
            expect(scope.references).to.have.length(1);
            expect(scope.references[0].identifier.name).to.be.equal("i");
            expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);

            const iterScope = scope = scopeManager.scopes[2];

            expect(scope.type).to.be.equal("for");
            expect(scope.variables).to.have.length(1);
            expect(scope.variables[0].name).to.be.equal("i");
            expect(scope.references).to.have.length(2);
            expect(scope.references[0].identifier.name).to.be.equal("i");
            expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
            expect(scope.references[1].identifier.name).to.be.equal("i");
            expect(scope.references[1].resolved).to.be.equal(scope.variables[0]);

            scope = scopeManager.scopes[3];
            expect(scope.type).to.be.equal("block");
            expect(scope.variables).to.have.length(0);
            expect(scope.references).to.have.length(2);
            expect(scope.references[0].identifier.name).to.be.equal("console");
            expect(scope.references[0].resolved).to.be.equal(null);
            expect(scope.references[1].identifier.name).to.be.equal("i");
            expect(scope.references[1].resolved).to.be.equal(iterScope.variables[0]);
        });
    });

    it("let materialize iteration scope for ForInStatement#2", () => {
        getSupportedEcmaVersions({ min: 6 }).forEach(ecmaVersion => {
            const ast = espree(`
                (function () {
                    let i = 20;
                    for (let { i, j, k } in i) {
                        console.log(i);
                    }
                }());
            `);

            const scopeManager = analyze(ast, { ecmaVersion });

            expect(scopeManager.scopes).to.have.length(4);

            let scope = scopeManager.scopes[0];

            expect(scope.type).to.be.equal("global");
            expect(scope.variables).to.have.length(0);

            scope = scopeManager.scopes[1];
            expect(scope.type).to.be.equal("function");
            expect(scope.variables).to.have.length(2);
            expect(scope.variables[0].name).to.be.equal("arguments");
            expect(scope.variables[1].name).to.be.equal("i");
            expect(scope.references).to.have.length(1);
            expect(scope.references[0].identifier.name).to.be.equal("i");
            expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);

            const iterScope = scope = scopeManager.scopes[2];

            expect(scope.type).to.be.equal("for");
            expect(scope.variables).to.have.length(3);
            expect(scope.variables[0].name).to.be.equal("i");
            expect(scope.variables[1].name).to.be.equal("j");
            expect(scope.variables[2].name).to.be.equal("k");
            expect(scope.references).to.have.length(4);
            expect(scope.references[0].identifier.name).to.be.equal("i");
            expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
            expect(scope.references[1].identifier.name).to.be.equal("j");
            expect(scope.references[1].resolved).to.be.equal(scope.variables[1]);
            expect(scope.references[2].identifier.name).to.be.equal("k");
            expect(scope.references[2].resolved).to.be.equal(scope.variables[2]);
            expect(scope.references[3].identifier.name).to.be.equal("i");
            expect(scope.references[3].resolved).to.be.equal(scope.variables[0]);

            scope = scopeManager.scopes[3];
            expect(scope.type).to.be.equal("block");
            expect(scope.variables).to.have.length(0);
            expect(scope.references).to.have.length(2);
            expect(scope.references[0].identifier.name).to.be.equal("console");
            expect(scope.references[0].resolved).to.be.equal(null);
            expect(scope.references[1].identifier.name).to.be.equal("i");
            expect(scope.references[1].resolved).to.be.equal(iterScope.variables[0]);
        });
    });

    it("let materialize iteration scope for ForStatement#2", () => {
        getSupportedEcmaVersions({ min: 6 }).forEach(ecmaVersion => {
            const ast = espree(`
                (function () {
                    let i = 20;
                    let obj = {};
                    for (let { i, j, k } = obj; i < okok; ++i) {
                        console.log(i, j, k);
                    }
                }());
            `);

            const scopeManager = analyze(ast, { ecmaVersion });

            expect(scopeManager.scopes).to.have.length(4);

            let scope = scopeManager.scopes[0];

            expect(scope.type).to.be.equal("global");
            expect(scope.variables).to.have.length(0);

            const functionScope = scope = scopeManager.scopes[1];

            expect(scope.type).to.be.equal("function");
            expect(scope.variables).to.have.length(3);
            expect(scope.variables[0].name).to.be.equal("arguments");
            expect(scope.variables[1].name).to.be.equal("i");
            expect(scope.variables[2].name).to.be.equal("obj");
            expect(scope.references).to.have.length(2);
            expect(scope.references[0].identifier.name).to.be.equal("i");
            expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
            expect(scope.references[1].identifier.name).to.be.equal("obj");
            expect(scope.references[1].resolved).to.be.equal(scope.variables[2]);

            const iterScope = scope = scopeManager.scopes[2];

            expect(scope.type).to.be.equal("for");
            expect(scope.variables).to.have.length(3);
            expect(scope.variables[0].name).to.be.equal("i");
            expect(scope.variables[0].defs[0].type).to.be.equal("Variable");
            expect(scope.variables[1].name).to.be.equal("j");
            expect(scope.variables[1].defs[0].type).to.be.equal("Variable");
            expect(scope.variables[2].name).to.be.equal("k");
            expect(scope.variables[2].defs[0].type).to.be.equal("Variable");
            expect(scope.references).to.have.length(7);
            expect(scope.references[0].identifier.name).to.be.equal("i");
            expect(scope.references[0].resolved).to.be.equal(scope.variables[0]);
            expect(scope.references[1].identifier.name).to.be.equal("j");
            expect(scope.references[1].resolved).to.be.equal(scope.variables[1]);
            expect(scope.references[2].identifier.name).to.be.equal("k");
            expect(scope.references[2].resolved).to.be.equal(scope.variables[2]);
            expect(scope.references[3].identifier.name).to.be.equal("obj");
            expect(scope.references[3].resolved).to.be.equal(functionScope.variables[2]);
            expect(scope.references[4].identifier.name).to.be.equal("i");
            expect(scope.references[4].resolved).to.be.equal(scope.variables[0]);
            expect(scope.references[5].identifier.name).to.be.equal("okok");
            expect(scope.references[5].resolved).to.be.null;
            expect(scope.references[6].identifier.name).to.be.equal("i");
            expect(scope.references[6].resolved).to.be.equal(scope.variables[0]);

            scope = scopeManager.scopes[3];
            expect(scope.type).to.be.equal("block");
            expect(scope.variables).to.have.length(0);
            expect(scope.references).to.have.length(4);
            expect(scope.references[0].identifier.name).to.be.equal("console");
            expect(scope.references[0].resolved).to.be.null;
            expect(scope.references[1].identifier.name).to.be.equal("i");
            expect(scope.references[1].resolved).to.be.equal(iterScope.variables[0]);
            expect(scope.references[2].identifier.name).to.be.equal("j");
            expect(scope.references[2].resolved).to.be.equal(iterScope.variables[1]);
            expect(scope.references[3].identifier.name).to.be.equal("k");
            expect(scope.references[3].resolved).to.be.equal(iterScope.variables[2]);
        });
    });
});

// vim: set sw=4 ts=4 et tw=80 :
