// -*- coding: utf-8 -*-
//  Copyright (C) 2015 Yusuke Suzuki <utatane.tea@gmail.com>
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

describe("catch", () => {
    it("creates scope", () => {
        const ast = espree(`
            (function () {
                try {
                } catch (e) {
                }
            }());
        `);

        const scopeManager = analyze(ast);

        expect(scopeManager.scopes).to.have.length(3);
        const globalScope = scopeManager.scopes[0];

        expect(globalScope.type).to.be.equal("global");
        expect(globalScope.variables).to.have.length(0);
        expect(globalScope.references).to.have.length(0);

        let scope = scopeManager.scopes[1];

        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.isArgumentsMaterialized()).to.be.false;
        expect(scope.references).to.have.length(0);

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("catch");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("e");
        expect(scope.variables[0].defs).to.have.length(1);
        expect(scope.variables[0].defs[0].type).to.be.equal("CatchClause");
        expect(scope.variables[0].defs[0].name.type).to.be.equal("Identifier");
        expect(scope.variables[0].defs[0].name.name).to.be.equal("e");
        expect(scope.variables[0].defs[0].node.type).to.be.equal("CatchClause");
        expect(scope.variables[0].defs[0].parent).to.be.equal(null);
        expect(scope.isArgumentsMaterialized()).to.be.true;
        expect(scope.references).to.have.length(0);
    });

    it("param can be a pattern", () => {
        const ast = espree(`
            (function () {
                const default_id = 0;
                try {
                } catch ({ message, id = default_id, args: [arg1, arg2] }) {
                }
            }());
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(5);

        const globalScope = scopeManager.scopes[0];

        expect(globalScope.type).to.be.equal("global");
        expect(globalScope.variables).to.have.length(0);
        expect(globalScope.references).to.have.length(0);

        const functionScope = scopeManager.scopes[1];

        expect(functionScope.type).to.be.equal("function");
        expect(functionScope.variables).to.have.length(2);
        expect(functionScope.variables[0].name).to.be.equal("arguments");
        expect(functionScope.variables[1].name).to.be.equal("default_id");
        expect(functionScope.references).to.have.length(1);
        expect(functionScope.references[0].from).to.be.equal(functionScope);
        expect(functionScope.references[0].resolved).to.be.equal(functionScope.variables[1]);

        const tryBlockScope = scopeManager.scopes[2];

        expect(tryBlockScope.type).to.be.equal("block");
        expect(tryBlockScope.variables).to.have.length(0);
        expect(tryBlockScope.references).to.have.length(0);

        const catchScope = scopeManager.scopes[3];

        expect(catchScope.type).to.be.equal("catch");
        expect(catchScope.variables).to.have.length(4);
        expect(catchScope.variables[0].name).to.be.equal("message");
        expect(catchScope.variables[0].defs).to.have.length(1);
        expect(catchScope.variables[0].defs[0].type).to.be.equal("CatchClause");
        expect(catchScope.variables[0].defs[0].name.type).to.be.equal("Identifier");
        expect(catchScope.variables[0].defs[0].name.name).to.be.equal("message");
        expect(catchScope.variables[0].defs[0].node.type).to.be.equal("CatchClause");
        expect(catchScope.variables[0].defs[0].parent).to.be.equal(null);
        expect(catchScope.variables[1].name).to.be.equal("id");
        expect(catchScope.variables[1].defs).to.have.length(1);
        expect(catchScope.variables[1].defs[0].type).to.be.equal("CatchClause");
        expect(catchScope.variables[1].defs[0].name.type).to.be.equal("Identifier");
        expect(catchScope.variables[1].defs[0].name.name).to.be.equal("id");
        expect(catchScope.variables[1].defs[0].node.type).to.be.equal("CatchClause");
        expect(catchScope.variables[1].defs[0].parent).to.be.equal(null);
        expect(catchScope.variables[2].name).to.be.equal("arg1");
        expect(catchScope.variables[2].defs).to.have.length(1);
        expect(catchScope.variables[2].defs[0].type).to.be.equal("CatchClause");
        expect(catchScope.variables[2].defs[0].name.type).to.be.equal("Identifier");
        expect(catchScope.variables[2].defs[0].name.name).to.be.equal("arg1");
        expect(catchScope.variables[2].defs[0].node.type).to.be.equal("CatchClause");
        expect(catchScope.variables[2].defs[0].parent).to.be.equal(null);
        expect(catchScope.variables[3].name).to.be.equal("arg2");
        expect(catchScope.variables[3].defs).to.have.length(1);
        expect(catchScope.variables[3].defs[0].type).to.be.equal("CatchClause");
        expect(catchScope.variables[3].defs[0].name.type).to.be.equal("Identifier");
        expect(catchScope.variables[3].defs[0].name.name).to.be.equal("arg2");
        expect(catchScope.variables[3].defs[0].node.type).to.be.equal("CatchClause");
        expect(catchScope.variables[3].defs[0].parent).to.be.equal(null);
        expect(catchScope.references).to.have.length(2);
        expect(catchScope.references[0].from).to.be.equal(catchScope);
        expect(catchScope.references[0].resolved).to.be.equal(catchScope.variables[1]);
        expect(catchScope.references[1].from).to.be.equal(catchScope);
        expect(catchScope.references[1].resolved).to.be.equal(functionScope.variables[1]);

        const catchBlockScope = scopeManager.scopes[4];

        expect(catchBlockScope.type).to.be.equal("block");
        expect(catchBlockScope.variables).to.have.length(0);
        expect(catchBlockScope.references).to.have.length(0);
    });
});

// vim: set sw=4 ts=4 et tw=80 :
