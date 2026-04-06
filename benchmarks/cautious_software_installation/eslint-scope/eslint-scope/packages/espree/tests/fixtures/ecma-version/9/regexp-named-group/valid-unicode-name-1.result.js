import conditionalRegex from "../../../../util/conditional-regex-value.js";

export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 20
        }
    },
    "range": [
        0,
        20
    ],
    "body": [
        {
            "type": "ExpressionStatement",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 20
                }
            },
            "range": [
                0,
                20
            ],
            "expression": conditionalRegex({
                "type": "Literal",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 20
                    }
                },
                "range": [
                    0,
                    20
                ],
                "value": null,
                "raw": "/(?<\\u0041\\u0042>a)/",
                "regex": {
                    "pattern": "(?<\\u0041\\u0042>a)",
                    "flags": ""
                }
            })
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "RegularExpression",
            "value": "/(?<\\u0041\\u0042>a)/",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 20
                }
            },
            "range": [
                0,
                20
            ],
            "regex": {
                "flags": "",
                "pattern": "(?<\\u0041\\u0042>a)"
            }
        }
    ]
};