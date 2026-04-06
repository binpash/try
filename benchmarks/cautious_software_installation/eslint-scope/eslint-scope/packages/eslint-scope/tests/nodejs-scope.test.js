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

describe("nodejsScope option", () => {

    it("creates a function scope following the global scope immediately when nodejscope: true", () => {
        const ast = espree(`
            "use strict";
            var hello = 20;
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6, nodejsScope: true });

        expect(scopeManager.scopes).to.have.length(2);
        expect(scopeManager.isGlobalReturn()).to.be.true;

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(2);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("hello");
    });

    it("creates a function scope following the global scope immediately when sourceType:commonjs", () => {
        const ast = espree(`
            "use strict";
            var hello = 20;
        `);

        const scopeManager = analyze(ast, { ecmaVersion: 6, sourceType: "commonjs" });

        expect(scopeManager.scopes).to.have.length(2);
        expect(scopeManager.isGlobalReturn()).to.be.true;

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.true;
        expect(scope.variables).to.have.length(2);
        expect(scope.variables[0].name).to.be.equal("arguments");
        expect(scope.variables[1].name).to.be.equal("hello");
    });

    it("creates a function scope following the global scope immediately and creates module scope", () => {
        const ast = espree("import {x as v} from 'mod';");

        const scopeManager = analyze(ast, { ecmaVersion: 6, nodejsScope: true, sourceType: "module" });

        expect(scopeManager.scopes).to.have.length(3);
        expect(scopeManager.isGlobalReturn()).to.be.true;

        let scope = scopeManager.scopes[0];

        expect(scope.type).to.be.equal("global");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(0);

        scope = scopeManager.scopes[1];
        expect(scope.type).to.be.equal("function");
        expect(scope.block.type).to.be.equal("Program");
        expect(scope.isStrict).to.be.false;
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("arguments");

        scope = scopeManager.scopes[2];
        expect(scope.type).to.be.equal("module");
        expect(scope.variables).to.have.length(1);
        expect(scope.variables[0].name).to.be.equal("v");
        expect(scope.variables[0].defs[0].type).to.be.equal("ImportBinding");
        expect(scope.references).to.have.length(0);
    });
});

// vim: set sw=4 ts=4 et tw=80 :
