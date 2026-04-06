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

describe("ES6 catch", () => {
    it("takes binding pattern", () => {
        const ast = espree(`
            try {
            } catch ({ a, b, c, d }) {
                let e = 20;
                a;
                b;
                c;
                d;
            }
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6 });

        expect(scopeManager.scopes).to.have.length(4);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("block");
        expect(scope.block.type).to.be.equal("BlockStatement");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(0);
        expect(scope.references).to.have.length(0);

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("catch");
        expect(scope.block.type).to.be.equal("CatchClause");
        expect(scope.isStrict).to.be.false;

        expect(scope.variables).to.have.length(4);
        expect(scope.variables[0].name).to.be.equal("a");
        expect(scope.variables[1].name).to.be.equal("b");
        expect(scope.variables[2].name).to.be.equal("c");
        expect(scope.variables[3].name).to.be.equal("d");
        expect(scope.references).to.have.length(0);

        scope = scopeManager.scopes[3];
        expect(scope.type).to.be.equal("block");
        expect(scope.block.type).to.be.equal("BlockStatement");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables.map(variable => variable.name)).to.be.eql([
            "e"
        ]);
        expect(scope.references.map(ref => ref.identifier.name)).to.be.eql([
            "e",
            "a",
            "b",
            "c",
            "d"
        ]);
    });
});

// vim: set sw=4 ts=4 et tw=80 :
