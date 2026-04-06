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

describe("ES6 destructuring assignments", () => {
    it("Pattern in var in ForInStatement", () => {
        const ast = espree(`
            (function () {
                for (var [a, b, c] in array);
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.be.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(4);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("a");
        expect(scope.variables[2].name).to.be.equal("b");
        expect(scope.variables[3].name).to.be.equal("c");
        expect(scope.references).to.have.length(4);
        expect(scope.references[0].identifier.name).to.be.equal("a");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
        expect(scope.references[1].identifier.name).to.be.equal("b");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.be.equal(scope.variables[2]);
        expect(scope.references[2].identifier.name).to.be.equal("c");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].partial).to.be.true;
        expect(scope.references[2].resolved).to.be.equal(scope.variables[3]);
        expect(scope.references[3].identifier.name).to.be.equal("array");
        expect(scope.references[3].isWrite()).to.be.false;
    });

    it("Pattern in let in ForInStatement", () => {
        const ast = espree(`
            (function () {
                for (let [a, b, c] in array);
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3); // [global, function, for]

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.equal("array");

        scope = scopeManager.scopes[2];
        expect(scope.type).to.equal("for");
        expect(scope.variables).to.have.length(3);
        expect(scope.variables[0].name).to.equal("a");
        expect(scope.variables[1].name).to.equal("b");
        expect(scope.variables[2].name).to.equal("c");
        expect(scope.references).to.have.length(4);
        expect(scope.references[0].identifier.name).to.equal("a");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.equal(scope.variables[0]);
        expect(scope.references[1].identifier.name).to.equal("b");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.equal(scope.variables[1]);
        expect(scope.references[2].identifier.name).to.equal("c");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].partial).to.be.true;
        expect(scope.references[2].resolved).to.equal(scope.variables[2]);
        expect(scope.references[3].identifier.name).to.equal("array");
        expect(scope.references[3].isWrite()).to.be.false;
        expect(scope.references[3].resolved).to.be.null;
    });

    it("Pattern with default values in var in ForInStatement", () => {
        const ast = espree(`
            (function () {
                for (var [a, b, c = d] in array);
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(2);
        expect(scope.implicit.left[0].identifier.name).to.equal("d");
        expect(scope.implicit.left[1].identifier.name).to.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.equal("function");
        expect(scope.variables).to.have.length(4);
        expect(scope.variables[0].name).to.equal("arguments");
        expect(scope.variables[1].name).to.equal("a");
        expect(scope.variables[2].name).to.equal("b");
        expect(scope.variables[3].name).to.equal("c");
        expect(scope.references).to.have.length(6);
        expect(scope.references[0].identifier.name).to.equal("c");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].writeExpr.name).to.equal("d");
        expect(scope.references[0].partial).to.be.false;
        expect(scope.references[0].resolved).to.equal(scope.variables[3]);
        expect(scope.references[1].identifier.name).to.equal("d");
        expect(scope.references[1].isWrite()).to.be.false;
        expect(scope.references[2].identifier.name).to.equal("a");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].partial).to.be.true;
        expect(scope.references[2].resolved).to.equal(scope.variables[1]);
        expect(scope.references[3].identifier.name).to.equal("b");
        expect(scope.references[3].isWrite()).to.be.true;
        expect(scope.references[3].partial).to.be.true;
        expect(scope.references[3].resolved).to.equal(scope.variables[2]);
        expect(scope.references[4].identifier.name).to.equal("c");
        expect(scope.references[4].isWrite()).to.be.true;
        expect(scope.references[4].writeExpr.name).to.equal("array");
        expect(scope.references[4].partial).to.be.true;
        expect(scope.references[4].resolved).to.equal(scope.variables[3]);
        expect(scope.references[5].identifier.name).to.equal("array");
        expect(scope.references[5].isWrite()).to.be.false;
    });

    it("Pattern with default values in let in ForInStatement", () => {
        const ast = espree(`
            (function () {
                for (let [a, b, c = d] in array);
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3); // [global, function, for]

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(2);
        expect(scope.implicit.left[0].identifier.name).to.equal("d");
        expect(scope.implicit.left[0].from.type).to.equal("for");
        expect(scope.implicit.left[1].identifier.name).to.equal("array");
        expect(scope.implicit.left[1].from.type).to.equal("for");

        scope = scopeManager.scopes[2];
        expect(scope.type).to.equal("for");
        expect(scope.variables).to.have.length(3);
        expect(scope.variables[0].name).to.equal("a");
        expect(scope.variables[1].name).to.equal("b");
        expect(scope.variables[2].name).to.equal("c");
        expect(scope.references).to.have.length(6);
        expect(scope.references[0].identifier.name).to.equal("c");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].writeExpr.name).to.equal("d");
        expect(scope.references[0].partial).to.be.false;
        expect(scope.references[0].resolved).to.equal(scope.variables[2]);
        expect(scope.references[1].identifier.name).to.equal("d");
        expect(scope.references[1].isWrite()).to.be.false;
        expect(scope.references[2].identifier.name).to.equal("a");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].writeExpr.name).to.equal("array");
        expect(scope.references[2].partial).to.be.true;
        expect(scope.references[2].resolved).to.equal(scope.variables[0]);
        expect(scope.references[3].identifier.name).to.equal("b");
        expect(scope.references[3].isWrite()).to.be.true;
        expect(scope.references[3].writeExpr.name).to.equal("array");
        expect(scope.references[3].partial).to.be.true;
        expect(scope.references[3].resolved).to.equal(scope.variables[1]);
        expect(scope.references[4].identifier.name).to.equal("c");
        expect(scope.references[4].isWrite()).to.be.true;
        expect(scope.references[4].writeExpr.name).to.equal("array");
        expect(scope.references[4].partial).to.be.true;
        expect(scope.references[4].resolved).to.equal(scope.variables[2]);
        expect(scope.references[5].identifier.name).to.equal("array");
        expect(scope.references[5].isWrite()).to.be.false;
        expect(scope.references[5].resolved).to.be.null;
    });

    it("Pattern with nested default values in var in ForInStatement", () => {
        const ast = espree(`
            (function () {
                for (var [a, [b, c = d] = e] in array);
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(3);
        expect(scope.implicit.left[0].identifier.name).to.equal("d");
        expect(scope.implicit.left[1].identifier.name).to.equal("e");
        expect(scope.implicit.left[2].identifier.name).to.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.equal("function");
        expect(scope.variables).to.have.length(4);
        expect(scope.variables[0].name).to.equal("arguments");
        expect(scope.variables[1].name).to.equal("a");
        expect(scope.variables[2].name).to.equal("b");
        expect(scope.variables[3].name).to.equal("c");
        expect(scope.references).to.have.length(9);
        expect(scope.references[0].identifier.name).to.equal("b");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].writeExpr.name).to.equal("e");
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.equal(scope.variables[2]);
        expect(scope.references[1].identifier.name).to.equal("c");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].writeExpr.name).to.equal("e");
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.equal(scope.variables[3]);
        expect(scope.references[2].identifier.name).to.equal("c");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].writeExpr.name).to.equal("d");
        expect(scope.references[2].partial).to.be.false;
        expect(scope.references[2].resolved).to.equal(scope.variables[3]);
        expect(scope.references[3].identifier.name).to.equal("d");
        expect(scope.references[3].isWrite()).to.be.false;
        expect(scope.references[4].identifier.name).to.equal("e");
        expect(scope.references[4].isWrite()).to.be.false;
        expect(scope.references[5].identifier.name).to.equal("a");
        expect(scope.references[5].isWrite()).to.be.true;
        expect(scope.references[5].writeExpr.name).to.equal("array");
        expect(scope.references[5].partial).to.be.true;
        expect(scope.references[5].resolved).to.equal(scope.variables[1]);
        expect(scope.references[6].identifier.name).to.equal("b");
        expect(scope.references[6].isWrite()).to.be.true;
        expect(scope.references[6].writeExpr.name).to.equal("array");
        expect(scope.references[6].partial).to.be.true;
        expect(scope.references[6].resolved).to.equal(scope.variables[2]);
        expect(scope.references[7].identifier.name).to.equal("c");
        expect(scope.references[7].isWrite()).to.be.true;
        expect(scope.references[7].writeExpr.name).to.equal("array");
        expect(scope.references[7].partial).to.be.true;
        expect(scope.references[7].resolved).to.equal(scope.variables[3]);
        expect(scope.references[8].identifier.name).to.equal("array");
        expect(scope.references[8].isWrite()).to.be.false;
    });

    it("Pattern with nested default values in let in ForInStatement", () => {
        const ast = espree(`
            (function () {
                for (let [a, [b, c = d] = e] in array);
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(3); // [global, function, for]

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(3);
        expect(scope.implicit.left[0].identifier.name).to.equal("d");
        expect(scope.implicit.left[0].from.type).to.equal("for");
        expect(scope.implicit.left[1].identifier.name).to.equal("e");
        expect(scope.implicit.left[1].from.type).to.equal("for");
        expect(scope.implicit.left[2].identifier.name).to.equal("array");
        expect(scope.implicit.left[2].from.type).to.equal("for");

        scope = scopeManager.scopes[2];
        expect(scope.type).to.equal("for");
        expect(scope.variables).to.have.length(3);
        expect(scope.variables[0].name).to.equal("a");
        expect(scope.variables[1].name).to.equal("b");
        expect(scope.variables[2].name).to.equal("c");
        expect(scope.references).to.have.length(9);
        expect(scope.references[0].identifier.name).to.equal("b");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].writeExpr.name).to.equal("e");
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.equal(scope.variables[1]);
        expect(scope.references[1].identifier.name).to.equal("c");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].writeExpr.name).to.equal("e");
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.equal(scope.variables[2]);
        expect(scope.references[2].identifier.name).to.equal("c");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].writeExpr.name).to.equal("d");
        expect(scope.references[2].partial).to.be.false;
        expect(scope.references[2].resolved).to.equal(scope.variables[2]);
        expect(scope.references[3].identifier.name).to.equal("d");
        expect(scope.references[3].isWrite()).to.be.false;
        expect(scope.references[4].identifier.name).to.equal("e");
        expect(scope.references[4].isWrite()).to.be.false;
        expect(scope.references[5].identifier.name).to.equal("a");
        expect(scope.references[5].isWrite()).to.be.true;
        expect(scope.references[5].writeExpr.name).to.equal("array");
        expect(scope.references[5].partial).to.be.true;
        expect(scope.references[5].resolved).to.equal(scope.variables[0]);
        expect(scope.references[6].identifier.name).to.equal("b");
        expect(scope.references[6].isWrite()).to.be.true;
        expect(scope.references[6].writeExpr.name).to.equal("array");
        expect(scope.references[6].partial).to.be.true;
        expect(scope.references[6].resolved).to.equal(scope.variables[1]);
        expect(scope.references[7].identifier.name).to.equal("c");
        expect(scope.references[7].isWrite()).to.be.true;
        expect(scope.references[7].writeExpr.name).to.equal("array");
        expect(scope.references[7].partial).to.be.true;
        expect(scope.references[7].resolved).to.equal(scope.variables[2]);
        expect(scope.references[8].identifier.name).to.equal("array");
        expect(scope.references[8].isWrite()).to.be.false;
        expect(scope.references[8].resolved).to.be.null;
    });

    it("Pattern with default values in var in ForInStatement (separate declarations)", () => {
        const ast = espree(`
            (function () {
                var a, b, c;
                for ([a, b, c = d] in array);
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(2);
        expect(scope.implicit.left[0].identifier.name).to.equal("d");
        expect(scope.implicit.left[1].identifier.name).to.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.equal("function");
        expect(scope.variables).to.have.length(4);
        expect(scope.variables[0].name).to.equal("arguments");
        expect(scope.variables[1].name).to.equal("a");
        expect(scope.variables[2].name).to.equal("b");
        expect(scope.variables[3].name).to.equal("c");
        expect(scope.references).to.have.length(6);
        expect(scope.references[0].identifier.name).to.equal("a");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.equal(scope.variables[1]);
        expect(scope.references[1].identifier.name).to.equal("b");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.equal(scope.variables[2]);
        expect(scope.references[2].identifier.name).to.equal("c");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].writeExpr.name).to.equal("d");
        expect(scope.references[2].partial).to.be.false;
        expect(scope.references[2].resolved).to.equal(scope.variables[3]);
        expect(scope.references[3].identifier.name).to.equal("c");
        expect(scope.references[3].isWrite()).to.be.true;
        expect(scope.references[3].writeExpr.name).to.equal("array");
        expect(scope.references[3].partial).to.be.true;
        expect(scope.references[3].resolved).to.equal(scope.variables[3]);
        expect(scope.references[4].identifier.name).to.equal("d");
        expect(scope.references[4].isWrite()).to.be.false;
        expect(scope.references[5].identifier.name).to.equal("array");
        expect(scope.references[5].isWrite()).to.be.false;
    });

    it("Pattern with default values in var in ForInStatement (separate declarations and with MemberExpression)", () => {
        const ast = espree(`
            (function () {
                var obj;
                for ([obj.a, obj.b, obj.c = d] in array);
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(2);
        expect(scope.implicit.left[0].identifier.name).to.equal("d");
        expect(scope.implicit.left[1].identifier.name).to.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.equal("function");
        expect(scope.variables).to.have.length(2);
        expect(scope.variables[0].name).to.equal("arguments");
        expect(scope.variables[1].name).to.equal("obj");
        expect(scope.references).to.have.length(5);
        expect(scope.references[0].identifier.name).to.equal("obj"); // obj.a
        expect(scope.references[0].isWrite()).to.be.false;
        expect(scope.references[0].isRead()).to.be.true;
        expect(scope.references[0].resolved).to.equal(scope.variables[1]);
        expect(scope.references[1].identifier.name).to.equal("obj"); // obj.b
        expect(scope.references[1].isWrite()).to.be.false;
        expect(scope.references[1].isRead()).to.be.true;
        expect(scope.references[1].resolved).to.equal(scope.variables[1]);
        expect(scope.references[2].identifier.name).to.equal("obj"); // obj.c
        expect(scope.references[2].isWrite()).to.be.false;
        expect(scope.references[2].isRead()).to.be.true;
        expect(scope.references[2].resolved).to.equal(scope.variables[1]);
        expect(scope.references[3].identifier.name).to.equal("d");
        expect(scope.references[3].isWrite()).to.be.false;
        expect(scope.references[3].isRead()).to.be.true;
        expect(scope.references[4].identifier.name).to.equal("array");
        expect(scope.references[4].isWrite()).to.be.false;
        expect(scope.references[4].isRead()).to.be.true;
    });

    it("ArrayPattern in var", () => {
        const ast = espree(`
            (function () {
                var [a, b, c] = array;
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.be.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(4);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("a");
        expect(scope.variables[2].name).to.be.equal("b");
        expect(scope.variables[3].name).to.be.equal("c");
        expect(scope.references).to.have.length(4);
        expect(scope.references[0].identifier.name).to.be.equal("a");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
        expect(scope.references[1].identifier.name).to.be.equal("b");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.be.equal(scope.variables[2]);
        expect(scope.references[2].identifier.name).to.be.equal("c");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].partial).to.be.true;
        expect(scope.references[2].resolved).to.be.equal(scope.variables[3]);
        expect(scope.references[3].identifier.name).to.be.equal("array");
        expect(scope.references[3].isWrite()).to.be.false;
    });

    it("SpreadElement in var", () => {
        let ast = espree(`
            (function () {
                var [a, b, ...rest] = array;
            }());
        `);

        let scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.be.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(4);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("a");
        expect(scope.variables[2].name).to.be.equal("b");
        expect(scope.variables[3].name).to.be.equal("rest");
        expect(scope.references).to.have.length(4);
        expect(scope.references[0].identifier.name).to.be.equal("a");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
        expect(scope.references[1].identifier.name).to.be.equal("b");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.be.equal(scope.variables[2]);
        expect(scope.references[2].identifier.name).to.be.equal("rest");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].partial).to.be.true;
        expect(scope.references[2].resolved).to.be.equal(scope.variables[3]);
        expect(scope.references[3].identifier.name).to.be.equal("array");
        expect(scope.references[3].isWrite()).to.be.false;

        ast = espree(`
            (function () {
                var [a, b, ...[c, d, ...rest]] = array;
            }());
        `);

        scopeManager = analyze(ast, { ecmaVersion: 6 });
        expect(scopeManager.scopes).to.have.length(2);

        scope = scopeManager.scopes[0];
        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.be.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");

        expect(scope.variables).to.have.length(6);
        const expectedVariableNames = [
            "arguments",
            "a",
            "b",
            "c",
            "d",
            "rest"
        ];

        for (let index = 0; index < expectedVariableNames.length; index++) {
            expect(scope.variables[index].name).to.be.equal(expectedVariableNames[index]);
        }

        expect(scope.references).to.have.length(6);
        const expectedReferenceNames = [
            "a",
            "b",
            "c",
            "d",
            "rest"
        ];

        for (let index = 0; index < expectedReferenceNames.length; index++) {
            expect(scope.references[index].identifier.name).to.be.equal(expectedReferenceNames[index]);
            expect(scope.references[index].isWrite()).to.be.true;
            expect(scope.references[index].partial).to.be.true;
        }
        expect(scope.references[5].identifier.name).to.be.equal("array");
        expect(scope.references[5].isWrite()).to.be.false;
    });

    it("ObjectPattern in var", () => {
        const ast = espree(`
            (function () {
                var {
                    shorthand,
                    key: value,
                    hello: {
                        world
                    }
                } = object;
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.be.equal("object");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(4);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("shorthand");
        expect(scope.variables[2].name).to.be.equal("value");
        expect(scope.variables[3].name).to.be.equal("world");
        expect(scope.references).to.have.length(4);
        expect(scope.references[0].identifier.name).to.be.equal("shorthand");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.be.equal(scope.variables[1]);
        expect(scope.references[1].identifier.name).to.be.equal("value");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.be.equal(scope.variables[2]);
        expect(scope.references[2].identifier.name).to.be.equal("world");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].partial).to.be.true;
        expect(scope.references[2].resolved).to.be.equal(scope.variables[3]);
        expect(scope.references[3].identifier.name).to.be.equal("object");
        expect(scope.references[3].isWrite()).to.be.false;
    });

    it("complex pattern in var", () => {
        const ast = espree(`
            (function () {
                var {
                    shorthand,
                    key: [ a, b, c, d, e ],
                    hello: {
                        world
                    }
                } = object;
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.be.equal("object");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(8);
        const expectedVariableNames = [
            "arguments",
            "shorthand",
            "a",
            "b",
            "c",
            "d",
            "e",
            "world"
        ];

        for (let index = 0; index < expectedVariableNames.length; index++) {
            expect(scope.variables[index].name).to.be.equal(expectedVariableNames[index]);
        }
        expect(scope.references).to.have.length(8);
        const expectedReferenceNames = [
            "shorthand",
            "a",
            "b",
            "c",
            "d",
            "e",
            "world"
        ];

        for (let index = 0; index < expectedReferenceNames.length; index++) {
            expect(scope.references[index].identifier.name).to.be.equal(expectedReferenceNames[index]);
            expect(scope.references[index].isWrite()).to.be.true;
            expect(scope.references[index].partial).to.be.true;
        }
        expect(scope.references[7].identifier.name).to.be.equal("object");
        expect(scope.references[7].isWrite()).to.be.false;
    });

    it("ArrayPattern in AssignmentExpression", () => {
        const ast = espree(`
            (function () {
                [a, b, c] = array;
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(4);
        expect(scope.implicit.left.map(left => left.identifier.name)).to.deep.equal([
            "a",
            "b",
            "c",
            "array"
        ]);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.references).to.have.length(4);
        expect(scope.references[0].identifier.name).to.be.equal("a");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.be.null;
        expect(scope.references[1].identifier.name).to.be.equal("b");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.be.null;
        expect(scope.references[2].identifier.name).to.be.equal("c");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].partial).to.be.true;
        expect(scope.references[2].resolved).to.be.null;
        expect(scope.references[3].identifier.name).to.be.equal("array");
        expect(scope.references[3].isWrite()).to.be.false;
    });

    it("ArrayPattern with MemberExpression in AssignmentExpression", () => {
        const ast = espree(`
            (function () {
                var obj;
                [obj.a, obj.b, obj.c] = array;
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.equal("function");
        expect(scope.variables).to.have.length(2);
        expect(scope.variables[0].name).to.equal("arguments");
        expect(scope.variables[1].name).to.equal("obj");
        expect(scope.references).to.have.length(4);
        expect(scope.references[0].identifier.name).to.equal("obj");
        expect(scope.references[0].isWrite()).to.be.false;
        expect(scope.references[0].isRead()).to.be.true;
        expect(scope.references[0].resolved).to.equal(scope.variables[1]);
        expect(scope.references[1].identifier.name).to.equal("obj");
        expect(scope.references[1].isWrite()).to.be.false;
        expect(scope.references[1].isRead()).to.be.true;
        expect(scope.references[1].resolved).to.equal(scope.variables[1]);
        expect(scope.references[2].identifier.name).to.equal("obj");
        expect(scope.references[2].isWrite()).to.be.false;
        expect(scope.references[2].isRead()).to.be.true;
        expect(scope.references[2].resolved).to.equal(scope.variables[1]);
        expect(scope.references[3].identifier.name).to.equal("array");
        expect(scope.references[3].isWrite()).to.be.false;
        expect(scope.references[3].isRead()).to.be.true;
    });

    it("SpreadElement in AssignmentExpression", () => {
        let ast = espree(`
            (function () {
                [a, b, ...rest] = array;
            }());
        `);

        let scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(4);
        expect(scope.implicit.left.map(left => left.identifier.name)).to.deep.equal([
            "a",
            "b",
            "rest",
            "array"
        ]);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.references).to.have.length(4);
        expect(scope.references[0].identifier.name).to.be.equal("a");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.be.null;
        expect(scope.references[1].identifier.name).to.be.equal("b");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.be.null;
        expect(scope.references[2].identifier.name).to.be.equal("rest");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].partial).to.be.true;
        expect(scope.references[2].resolved).to.be.null;
        expect(scope.references[3].identifier.name).to.be.equal("array");
        expect(scope.references[3].isWrite()).to.be.false;

        ast = espree(`
            (function () {
                [a, b, ...[c, d, ...rest]] = array;
            }());
        `);

        scopeManager = analyze(ast, { ecmaVersion: 6 });
        expect(scopeManager.scopes).to.have.length(2);

        scope = scopeManager.scopes[0];
        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(6);
        expect(scope.implicit.left.map(left => left.identifier.name)).to.deep.equal([
            "a",
            "b",
            "c",
            "d",
            "rest",
            "array"
        ]);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");

        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("arguments");

        expect(scope.references).to.have.length(6);
        const expectedReferenceNames = [
            "a",
            "b",
            "c",
            "d",
            "rest"
        ];

        for (let index = 0; index < expectedReferenceNames.length; index++) {
            expect(scope.references[index].identifier.name).to.be.equal(expectedReferenceNames[index]);
            expect(scope.references[index].isWrite()).to.be.true;
            expect(scope.references[index].partial).to.be.true;
            expect(scope.references[index].resolved).to.be.null;
        }
        expect(scope.references[5].identifier.name).to.be.equal("array");
        expect(scope.references[5].isWrite()).to.be.false;
    });

    it("SpreadElement with MemberExpression in AssignmentExpression", () => {
        const ast = espree(`
            (function () {
                [a, b, ...obj.rest] = array;
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(4);
        expect(scope.implicit.left.map(left => left.identifier.name)).to.deep.equal([
            "a",
            "b",
            "obj",
            "array"
        ]);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.equal("function");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.equal("arguments");
        expect(scope.references).to.have.length(4);
        expect(scope.references[0].identifier.name).to.equal("a");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.be.null;
        expect(scope.references[1].identifier.name).to.equal("b");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.be.null;
        expect(scope.references[2].identifier.name).to.equal("obj");
        expect(scope.references[2].isWrite()).to.be.false;
        expect(scope.references[3].identifier.name).to.equal("array");
        expect(scope.references[3].isWrite()).to.be.false;
    });

    it("ObjectPattern in AssignmentExpression", () => {
        const ast = espree(`
            (function () {
                ({
                    shorthand,
                    key: value,
                    hello: {
                        world
                    }
                } = object);
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(4);
        expect(scope.implicit.left.map(left => left.identifier.name)).to.deep.equal([
            "shorthand",
            "value",
            "world",
            "object"
        ]);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.references).to.have.length(4);
        expect(scope.references[0].identifier.name).to.be.equal("shorthand");
        expect(scope.references[0].isWrite()).to.be.true;
        expect(scope.references[0].partial).to.be.true;
        expect(scope.references[0].resolved).to.null;
        expect(scope.references[1].identifier.name).to.be.equal("value");
        expect(scope.references[1].isWrite()).to.be.true;
        expect(scope.references[1].partial).to.be.true;
        expect(scope.references[1].resolved).to.null;
        expect(scope.references[2].identifier.name).to.be.equal("world");
        expect(scope.references[2].isWrite()).to.be.true;
        expect(scope.references[2].partial).to.be.true;
        expect(scope.references[2].resolved).to.null;
        expect(scope.references[3].identifier.name).to.be.equal("object");
        expect(scope.references[3].isWrite()).to.be.false;
    });

    it("complex pattern in AssignmentExpression", () => {
        const ast = espree(`
            (function () {
                ({
                    shorthand,
                    key: [ a, b, c, d, e ],
                    hello: {
                        world
                    }
                } = object);
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);
        expect(scope.implicit.left).to.have.length(8);
        expect(scope.implicit.left.map(left => left.identifier.name)).to.deep.equal([
            "shorthand",
            "a",
            "b",
            "c",
            "d",
            "e",
            "world",
            "object"
        ]);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.references).to.have.length(8);
        const expectedReferenceNames = [
            "shorthand",
            "a",
            "b",
            "c",
            "d",
            "e",
            "world"
        ];

        for (let index = 0; index < expectedReferenceNames.length; index++) {
            expect(scope.references[index].identifier.name).to.be.equal(expectedReferenceNames[index]);
            expect(scope.references[index].isWrite()).to.be.true;
            expect(scope.references[index].partial).to.be.true;
        }
        expect(scope.references[7].identifier.name).to.be.equal("object");
        expect(scope.references[7].isWrite()).to.be.false;
    });

    it("ArrayPattern in parameters", () => {
        const ast = espree(`
            (function ([a, b, c]) {
            }(array));
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].identifier.name).to.be.equal("array");
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.be.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(4);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("a");
        expect(scope.variables[2].name).to.be.equal("b");
        expect(scope.variables[3].name).to.be.equal("c");
        expect(scope.references).to.have.length(0);
    });

    it("SpreadElement in parameters", () => {
        const ast = espree(`
            (function ([a, b, ...rest], ...rest2) {
            }(array));
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].identifier.name).to.be.equal("array");
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.be.equal("array");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(5);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("a");
        expect(scope.variables[2].name).to.be.equal("b");
        expect(scope.variables[3].name).to.be.equal("rest");
        expect(scope.variables[3].defs[0].rest).to.be.true;
        expect(scope.variables[4].name).to.be.equal("rest2");
        expect(scope.variables[4].defs[0].rest).to.be.true;
        expect(scope.references).to.have.length(0);
    });

    it("ObjectPattern in parameters", () => {
        const ast = espree(`
            (function ({
                    shorthand,
                    key: value,
                    hello: {
                        world
                    }
                }) {
            }(object));
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].identifier.name).to.be.equal("object");
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.be.equal("object");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(4);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("shorthand");
        expect(scope.variables[2].name).to.be.equal("value");
        expect(scope.variables[3].name).to.be.equal("world");
        expect(scope.references).to.have.length(0);
    });

    it("complex pattern in parameters", () => {
        const ast = espree(`
            (function ({
                    shorthand,
                    key: [ a, b, c, d, e ],
                    hello: {
                        world
                    }
                }) {
            }(object));
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(1);
        expect(scope.references[0].identifier.name).to.be.equal("object");
        expect(scope.implicit.left).to.have.length(1);
        expect(scope.implicit.left[0].identifier.name).to.be.equal("object");

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(8);
        const expectedVariableNames = [
            "arguments",
            "shorthand",
            "a",
            "b",
            "c",
            "d",
            "e",
            "world"
        ];

        for (let index = 0; index < expectedVariableNames.length; index++) {
            expect(scope.variables[index].name).to.be.equal(expectedVariableNames[index]);
        }
        expect(scope.references).to.have.length(0);
    });

    it("default values and patterns in var", () => {
        const ast = espree(`
            (function () {
                var [a, b, c, d = 20 ] = array;
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(5);
        const expectedVariableNames = [
            "arguments",
            "a",
            "b",
            "c",
            "d"
        ];

        for (let index = 0; index < expectedVariableNames.length; index++) {
            expect(scope.variables[index].name).to.be.equal(expectedVariableNames[index]);
        }
        expect(scope.references).to.have.length(6);
        const expectedReferenceNames = [
            "a",
            "b",
            "c",
            "d", // assign 20
            "d", // assign array
            "array"
        ];

        for (let index = 0; index < expectedReferenceNames.length; index++) {
            expect(scope.references[index].identifier.name).to.be.equal(expectedReferenceNames[index]);
        }
    });

    it("default values containing references and patterns in var", () => {
        const ast = espree(`
            (function () {
                var [a, b, c, d = e ] = array;
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(5);
        const expectedVariableNames = [
            "arguments",
            "a",
            "b",
            "c",
            "d"
        ];

        for (let index = 0; index < expectedVariableNames.length; index++) {
            expect(scope.variables[index].name).to.be.equal(expectedVariableNames[index]);
        }
        expect(scope.references).to.have.length(7);
        const expectedReferenceNames = [
            "a", // assign array
            "b", // assign array
            "c", // assign array
            "d", // assign e
            "d", // assign array
            "e",
            "array"
        ];

        for (let index = 0; index < expectedReferenceNames.length; index++) {
            expect(scope.references[index].identifier.name).to.be.equal(expectedReferenceNames[index]);
        }
    });

    it("nested default values containing references and patterns in var", () => {
        const ast = espree(`
            (function () {
                var [a, b, [c, d = e] = f ] = array;
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.equal("global");
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.equal("function");
        expect(scope.variables).to.have.length(5);
        const expectedVariableNames = [
            "arguments",
            "a",
            "b",
            "c",
            "d"
        ];

        for (let index = 0; index < expectedVariableNames.length; index++) {
            expect(scope.variables[index].name).to.equal(expectedVariableNames[index]);
        }
        expect(scope.references).to.have.length(10);
        const expectedReferenceNames = [
            "a", // assign array
            "b", // assign array
            "c", // assign f
            "c", // assign array
            "d", // assign f
            "d", // assign e
            "d", // assign array
            "e",
            "f",
            "array"
        ];

        for (let index = 0; index < expectedReferenceNames.length; index++) {
            expect(scope.references[index].identifier.name).to.equal(expectedReferenceNames[index]);
        }
    });
});

// vim: set sw=4 ts=4 et tw=80 :
