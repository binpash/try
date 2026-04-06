// Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import { expect } from "chai";
import espree from "./util/espree.js";
import { analyze } from "../lib/index.js";

describe("implicit global reference", () => {
    it("assignments global scope", () => {
        const ast = espree(`
            var x = 20;
            x = 300;
        `);

        const scopes = analyze(ast).scopes;

        expect(scopes.map(scope => scope.variables.map(variable => variable.defs.map(def => def.type)))).to.be.eql(
            [
                [
                    [
                        "Variable"
                    ]
                ]
            ]
        );

        expect(scopes[0].implicit.variables.map(variable => variable.name)).to.be.eql([]);
    });

    it("assignments global scope without definition", () => {
        const ast = espree(`
            x = 300;
            x = 300;
        `);

        const scopes = analyze(ast).scopes;

        expect(scopes.map(scope => scope.variables.map(variable => variable.defs.map(def => def.type)))).to.be.eql(
            [
                [
                ]
            ]
        );

        expect(scopes[0].implicit.variables.map(variable => variable.name)).to.be.eql(
            [
                "x"
            ]
        );
    });

    it("assignments global scope without definition eval", () => {
        const ast = espree(`
            function inner() {
                eval(str);
                x = 300;
            }
        `);

        const scopes = analyze(ast).scopes;

        expect(scopes.map(scope => scope.variables.map(variable => variable.defs.map(def => def.type)))).to.be.eql(
            [
                [
                    [
                        "FunctionName"
                    ]
                ],
                [
                    [
                    ]
                ]
            ]
        );

        expect(scopes[0].implicit.variables.map(variable => variable.name)).to.be.eql([]);
    });

    it("assignment leaks", () => {
        const ast = espree(`
            function outer() {
                x = 20;
            }
        `);

        const scopes = analyze(ast).scopes;

        expect(scopes.map(scope => scope.variables.map(variable => variable.name))).to.be.eql(
            [
                [
                    "outer"
                ],
                [
                    "arguments"
                ]
            ]
        );

        expect(scopes[0].implicit.variables.map(variable => variable.name)).to.be.eql(
            [
                "x"
            ]
        );
    });

    it("assignment doesn't leak", () => {
        const ast = espree(`
            function outer() {
                function inner() {
                    x = 20;
                }
                var x;
            }
        `);

        const scopes = analyze(ast).scopes;

        expect(scopes.map(scope => scope.variables.map(variable => variable.name))).to.be.eql(
            [
                [
                    "outer"
                ],
                [
                    "arguments",
                    "inner",
                    "x"
                ],
                [
                    "arguments"
                ]
            ]
        );

        expect(scopes[0].implicit.variables.map(variable => variable.name)).to.be.eql([]);
    });

    it("for-in-statement leaks", () => {
        const ast = espree(`
            function outer() {
                for (x in y) { }
            }`);

        const scopes = analyze(ast).scopes;

        expect(scopes.map(scope => scope.variables.map(variable => variable.name))).to.be.eql(
            [
                [
                    "outer"
                ],
                [
                    "arguments"
                ]
            ]
        );

        expect(scopes[0].implicit.variables.map(variable => variable.name)).to.be.eql(
            [
                "x"
            ]
        );
    });

    it("for-in-statement doesn't leaks", () => {
        const ast = espree(`
            function outer() {
                function inner() {
                    for (x in y) { }
                }
                var x;
            }
        `);

        const scopes = analyze(ast).scopes;

        expect(scopes.map(scope => scope.variables.map(variable => variable.name))).to.be.eql(
            [
                [
                    "outer"
                ],
                [
                    "arguments",
                    "inner",
                    "x"
                ],
                [
                    "arguments"
                ]
            ]
        );

        expect(scopes[0].implicit.variables.map(variable => variable.name)).to.be.eql([]);
    });
});
