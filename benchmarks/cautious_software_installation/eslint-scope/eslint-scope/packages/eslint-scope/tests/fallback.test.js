// -*- coding: utf-8 -*-
//  Copyright (C) 2016 Yusuke Suzuki <utatane.tea@gmail.com>
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

describe("fallback option", () => {
    it("should raise an error when it encountered an unknown node if no fallback.", () => {
        const ast = espree(`
            var foo = 0;
        `);

        ast.body[0].declarations[0].init.type = "NumericLiteral";

        expect(() => {
            analyze(ast, { fallback: "none" });
        }).to.throw("Unknown node type NumericLiteral");
    });

    it("should not raise an error even if it encountered an unknown node when fallback is iteration.", () => {
        const ast = espree(`
            var foo = 0;
        `);

        ast.body[0].declarations[0].init.type = "NumericLiteral";

        analyze(ast); // default is `fallback: "iteration"`
        analyze(ast, { fallback: "iteration" });
    });

    it("should not raise an error even if it encountered an unknown node when fallback is a function.", () => {
        const ast = espree(`
            var foo = 0;
        `);

        ast.body[0].declarations[0].init.type = "NumericLiteral";

        analyze(ast, { fallback: node => Object.keys(node) });
    });
});

// vim: set sw=4 ts=4 et tw=80 :
