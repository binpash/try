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
            "column": 25
        }
    },
    "range": [
        0,
        25
    ],
    "body": [
        {
            "type": "VariableDeclaration",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 25
                }
            },
            "range": [
                0,
                25
            ],
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 6
                        },
                        "end": {
                            "line": 1,
                            "column": 24
                        }
                    },
                    "range": [
                        6,
                        24
                    ],
                    "id": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        },
                        "range": [
                            6,
                            9
                        ],
                        "name": "re1"
                    },
                    "init": conditionalRegex({
                        "type": "Literal",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 24
                            }
                        },
                        "range": [
                            12,
                            24
                        ],

                        // /d flag no supported in Node.js 12 or 14 yet
                        "value": null,
                        "raw": "/a+(<Z>z)?/d",
                        "regex": {
                            "pattern": "a+(<Z>z)?",
                            "flags": "d"
                        }
                    })
                }
            ],
            "kind": "const"
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "Keyword",
            "value": "const",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 5
                }
            },
            "range": [
                0,
                5
            ]
        },
        {
            "type": "Identifier",
            "value": "re1",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 6
                },
                "end": {
                    "line": 1,
                    "column": 9
                }
            },
            "range": [
                6,
                9
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 10
                },
                "end": {
                    "line": 1,
                    "column": 11
                }
            },
            "range": [
                10,
                11
            ]
        },
        {
            "type": "RegularExpression",
            "value": "/a+(<Z>z)?/d",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 12
                },
                "end": {
                    "line": 1,
                    "column": 24
                }
            },
            "range": [
                12,
                24
            ],
            "regex": {
                "flags": "d",
                "pattern": "a+(<Z>z)?"
            }
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 24
                },
                "end": {
                    "line": 1,
                    "column": 25
                }
            },
            "range": [
                24,
                25
            ]
        }
    ]
};
