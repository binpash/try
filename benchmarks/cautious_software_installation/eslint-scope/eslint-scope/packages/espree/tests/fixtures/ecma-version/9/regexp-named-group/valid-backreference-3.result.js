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
            "column": 26
        }
    },
    "range": [
        0,
        26
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
                    "column": 26
                }
            },
            "range": [
                0,
                26
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
                        "column": 26
                    }
                },
                "range": [
                    0,
                    26
                ],
                "value": null,
                "raw": "/(?<AB>a)\\k<\\u0041\\u0042>/",
                "regex": {
                    "pattern": "(?<AB>a)\\k<\\u0041\\u0042>",
                    "flags": ""
                }
            })
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "RegularExpression",
            "value": "/(?<AB>a)\\k<\\u0041\\u0042>/",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 26
                }
            },
            "range": [
                0,
                26
            ],
            "regex": {
                "flags": "",
                "pattern": "(?<AB>a)\\k<\\u0041\\u0042>"
            }
        }
    ]
};
