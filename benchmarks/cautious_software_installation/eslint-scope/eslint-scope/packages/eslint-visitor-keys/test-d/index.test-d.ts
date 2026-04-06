import { expectType, expectAssignable } from 'tsd';

import { KEYS, getKeys, unionWith, VisitorKeys } from "../";

const assignmentExpression = {
    type: "AssignmentExpression",
    operator: "=",
    left: {
        type: "Identifier",
        name: "a",
        range: [
            0,
            1
        ]
    },
    right: {
        type: "Literal",
        value: 5,
        raw: "5",
        range: [
            4,
            5
        ]
    },
    range: [
        0,
        5
    ]
};

expectType<{readonly [type: string]: readonly string[]}>(KEYS);

expectType<readonly string[]>(getKeys(assignmentExpression));

expectType<{readonly [type: string]: readonly string[]}>(unionWith({
    TestInterface1: ["left", "right"],
    TestInterface2: ["expression"]
}));

const readonlyKeys: {
    readonly [type: string]: readonly string[]
} = {
    TestInterface1: ["left", "right"]
};

expectAssignable<VisitorKeys>(readonlyKeys);

// https://github.com/SamVerschueren/tsd/issues/143
// expectError(() => {
//     const erring: VisitorKeys = {
//         TestInterface1: ["left", "right"]
//     };
//     erring.TestInterface1 = ["badAttemptOverwrite"];
// });
