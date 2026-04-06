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

describe("ES6 switch", () => {
    it("materialize scope", () => {
        getSupportedEcmaVersions({ min: 6 }).forEach(ecmaVersion => {
            const ast = espree(`
                switch (ok) {
                    case hello:
                        let i = 20;
                        i;
                        break;

                    default:
                        let test = 30;
                        test;
                }
            `);

            const scopeManager = analyze(ast, { ecmaVersion });

            expect(scopeManager.scopes).to.have.length(2);

            let scope = scopeManager.scopes[0];

            expect(scope.type).to.be.equal("global");
            expect(scope.block.type).to.be.equal("Program");
            expect(scope.isStrict).to.be.false;
            expect(scope.variables).to.have.length(0);
            expect(scope.references).to.have.length(1);
            expect(scope.references[0].identifier.name).to.be.equal("ok");

            scope = scopeManager.scopes[1];
            expect(scope.type).to.be.equal("switch");
            expect(scope.block.type).to.be.equal("SwitchStatement");
            expect(scope.isStrict).to.be.false;
            expect(scope.variables).to.have.length(2);
            expect(scope.variables[0].name).to.be.equal("i");
            expect(scope.variables[1].name).to.be.equal("test");
            expect(scope.references).to.have.length(5);
            expect(scope.references[0].identifier.name).to.be.equal("hello");
            expect(scope.references[1].identifier.name).to.be.equal("i");
            expect(scope.references[2].identifier.name).to.be.equal("i");
            expect(scope.references[3].identifier.name).to.be.equal("test");
            expect(scope.references[4].identifier.name).to.be.equal("test");
        });
    });
});

// vim: set sw=4 ts=4 et tw=80 :
