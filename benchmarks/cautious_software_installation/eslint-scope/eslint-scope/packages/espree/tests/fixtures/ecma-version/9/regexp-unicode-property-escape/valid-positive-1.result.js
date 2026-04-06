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
            "column": 12
        }
    },
    "range": [
        0,
        12
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
                    "column": 12
                }
            },
            "range": [
                0,
                12
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
                        "column": 12
                    }
                },
                "range": [
                    0,
                    12
                ],
                "value": null,
                "raw": "/\\p{ASCII}/u",
                "regex": {
                    "pattern": "\\p{ASCII}",
                    "flags": "u"
                }
            })
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "RegularExpression",
            "value": "/\\p{ASCII}/u",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 12
                }
            },
            "range": [
                0,
                12
            ],
            "regex": {
                "flags": "u",
                "pattern": "\\p{ASCII}"
            }
        }
    ]
};