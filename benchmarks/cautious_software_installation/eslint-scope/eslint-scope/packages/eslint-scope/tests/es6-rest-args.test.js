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

describe("ES6 rest arguments", () => {
    it("materialize rest argument in scope", () => {
        const ast = espree(`
            function foo(...bar) {
                return bar;
            }
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(1);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.variables).to.have.length(2);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("bar");
        expect(scope.variables[1].defs[0].name.name).to.be.equal("bar");
        expect(scope.variables[1].defs[0].rest).to.be.true;
    });
});

// vim: set sw=4 ts=4 et tw=80 :
