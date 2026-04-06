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
import { getSupportedEcmaVersions } from "./util/ecma-version.js";
import { analyze } from "../lib/index.js";

describe("impliedStrict option", () => {
    it("ensures all user scopes are strict if ecmaVersion >= 5", () => {
        const ast = espree(`
            function foo() {
                function bar() {
                    "use strict";
                }
            }
        `);

        getSupportedEcmaVersions({ min: 5 }).forEach(ecmaVersion => {
            const scopeManager = analyze(ast, { ecmaVersion, impliedStrict: true });

            expect(scopeManager.scopes).to.have.length(3);

            let scope = scopeManager.scopes[0];

            expect(scope.type).to.be.equal("global");
            expect(scope.block.type).to.be.equal("Program");
            expect(scope.isStrict).to.be.true;

            scope = scopeManager.scopes[1];
            expect(scope.type).to.be.equal("function");
            expect(scope.block.type).to.be.equal("FunctionDeclaration");
            expect(scope.isStrict).to.be.true;

            scope = scopeManager.scopes[2];
            expect(scope.type).to.be.equal("function");
            expect(scope.block.type).to.be.equal("FunctionDeclaration");
            expect(scope.isStrict).to.be.true;
        });
    });

    it("ensures impliedStrict option is only effective when ecmaVersion option >= 5", () => {
        const ast = espree(`
            function foo() {}
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 3, impliedStrict: true });

        expect(scopeManager.scopes).to.have.length(2);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("FunctionDeclaration");
        expect(scope.isStrict).to.be.false;
    });

    it("omits a nodejs global scope when ensuring all user scopes are strict", () => {
        const ast = espree(`
            function foo() {}
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 5, nodejsScope: true, impliedStrict: true });

        expect(scopeManager.scopes).to.have.length(3);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.true;

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("FunctionDeclaration");
        expect(scope.isStrict).to.be.true;
    });

    it("omits a module global scope when ensuring all user scopes are strict", () => {
        const ast = espree("function foo() {}");

        const scopeManager = analyze(ast, { ecmaVersion: 6, impliedStrict: true, sourceType: "module" });

        expect(scopeManager.scopes).to.have.length(3);

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("module");
        expect(scope.isStrict).to.be.true;

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("FunctionDeclaration");
        expect(scope.isStrict).to.be.true;
    });
});

// vim: set sw=4 ts=4 et tw=80 :
