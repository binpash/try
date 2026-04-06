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
            "column": 22
        }
    },
    "range": [
        0,
        22
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
                    "column": 22
                }
            },
            "range": [
                0,
                22
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
                        "column": 22
                    }
                },
                "range": [
                    0,
                    22
                ],
                "value": null,
                "raw": "/\\P{Script=Hiragana}/u",
                "regex": {
                    "pattern": "\\P{Script=Hiragana}",
                    "flags": "u"
                }
            })
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "RegularExpression",
            "value": "/\\P{Script=Hiragana}/u",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 22
                }
            },
            "range": [
                0,
                22
            ],
            "regex": {
                "flags": "u",
                "pattern": "\\P{Script=Hiragana}"
            }
        }
    ]
};