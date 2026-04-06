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
                "raw": "/(?<\\u0041\\u0042>a)\\k<AB>/",
                "regex": {
                    "pattern": "(?<\\u0041\\u0042>a)\\k<AB>",
                    "flags": ""
                }
            })
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "RegularExpression",
            "value": "/(?<\\u0041\\u0042>a)\\k<AB>/",
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
                "pattern": "(?<\\u0041\\u0042>a)\\k<AB>"
            }
        }
    ]
};
