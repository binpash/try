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

describe("import declaration", () => {

    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-static-and-runtme-semantics-module-records
    it("should import names from source", () => {
        getSupportedEcmaVersions({ min: 6 }).forEach(ecmaVersion => {
            const ast = espree("import v from \"mod\";");

            const scopeManager = analyze(ast, { ecmaVersion, sourceType: "module" });

            expect(scopeManager.scopes).to.have.length(2);
            const globalScope = scopeManager.scopes[0];

            expect(globalScope.type).to.be.equal("global");
            expect(globalScope.variables).to.have.length(0);
            expect(globalScope.references).to.have.length(0);

            const scope = scopeManager.scopes[1];

            expect(scope.type).to.be.equal("module");
            expect(scope.isStrict).to.be.true;
            expect(scope.variables).to.have.length(1);
            expect(scope.variables[0].name).to.be.equal("v");
            expect(scope.variables[0].defs[0].type).to.be.equal("ImportBinding");
            expect(scope.references).to.have.length(0);
        });

    });

    it("should import namespaces", () => {
        getSupportedEcmaVersions({ min: 6 }).forEach(ecmaVersion => {
            const ast = espree("import * as ns from \"mod\";");

            const scopeManager = analyze(ast, { ecmaVersion, sourceType: "module" });

            expect(scopeManager.scopes).to.have.length(2);
            const globalScope = scopeManager.scopes[0];

            expect(globalScope.type).to.be.equal("global");
            expect(globalScope.variables).to.have.length(0);
            expect(globalScope.references).to.have.length(0);

            const scope = scopeManager.scopes[1];

            expect(scope.type).to.be.equal("module");
            expect(scope.isStrict).to.be.true;
            expect(scope.variables).to.have.length(1);
            expect(scope.variables[0].name).to.be.equal("ns");
            expect(scope.variables[0].defs[0].type).to.be.equal("ImportBinding");
            expect(scope.references).to.have.length(0);
        });
    });

    it("should import insided names#1", () => {
        getSupportedEcmaVersions({ min: 6 }).forEach(ecmaVersion => {
            const ast = espree("import {x} from \"mod\";");

            const scopeManager = analyze(ast, { ecmaVersion, sourceType: "module" });

            expect(scopeManager.scopes).to.have.length(2);
            const globalScope = scopeManager.scopes[0];

            expect(globalScope.type).to.be.equal("global");
            expect(globalScope.variables).to.have.length(0);
            expect(globalScope.references).to.have.length(0);

            const scope = scopeManager.scopes[1];

            expect(scope.type).to.be.equal("module");
            expect(scope.isStrict).to.be.true;
            expect(scope.variables).to.have.length(1);
            expect(scope.variables[0].name).to.be.equal("x");
            expect(scope.variables[0].defs[0].type).to.be.equal("ImportBinding");
            expect(scope.references).to.have.length(0);
        });
    });

    it("should import insided names#2", () => {
        getSupportedEcmaVersions({ min: 6 }).forEach(ecmaVersion => {
            const ast = espree("import {x as v} from \"mod\";");

            const scopeManager = analyze(ast, { ecmaVersion, sourceType: "module" });

            expect(scopeManager.scopes).to.have.length(2);
            const globalScope = scopeManager.scopes[0];

            expect(globalScope.type).to.be.equal("global");
            expect(globalScope.variables).to.have.length(0);
            expect(globalScope.references).to.have.length(0);

            const scope = scopeManager.scopes[1];

            expect(scope.type).to.be.equal("module");
            expect(scope.isStrict).to.be.true;
            expect(scope.variables).to.have.length(1);
            expect(scope.variables[0].name).to.be.equal("v");
            expect(scope.variables[0].defs[0].type).to.be.equal("ImportBinding");
            expect(scope.references).to.have.length(0);
        });
    });

    // TODO: Should parse it.
    // import from "mod";
});

// vim: set sw=4 ts=4 et tw=80 :
