export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 2,
            "column": 0
        },
        "end": {
            "line": 2,
            "column": 9
        }
    },
    "range": [
        1,
        10
    ],
    "body": [
        {
            "type": "ExpressionStatement",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 9
                }
            },
            "range": [
                1,
                10
            ],
            "expression": {
                "type": "BinaryExpression",
                "loc": {
                    "start": {
                        "line": 2,
                        "column": 0
                    },
                    "end": {
                        "line": 2,
                        "column": 8
                    }
                },
                "range": [
                    1,
                    9
                ],
                "left": {
                    "type": "UpdateExpression",
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 0
                        },
                        "end": {
                            "line": 2,
                            "column": 3
                        }
                    },
                    "range": [
                        1,
                        4
                    ],
                    "operator": "++",
                    "prefix": false,
                    "argument": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 0
                            },
                            "end": {
                                "line": 2,
                                "column": 1
                            }
                        },
                        "range": [
                            1,
                            2
                        ],
                        "name": "a"
                    }
                },
                "operator": "**",
                "right": {
                    "type": "Literal",
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 7
                        },
                        "end": {
                            "line": 2,
                            "column": 8
                        }
                    },
                    "range": [
                        8,
                        9
                    ],
                    "value": 2,
                    "raw": "2"
                }
            }
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "Identifier",
            "value": "a",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 1
                }
            },
            "range": [
                1,
                2
            ]
        },
        {
            "type": "Punctuator",
            "value": "++",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 1
                },
                "end": {
                    "line": 2,
                    "column": 3
                }
            },
            "range": [
                2,
                4
            ]
        },
        {
            "type": "Punctuator",
            "value": "**",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 4
                },
                "end": {
                    "line": 2,
                    "column": 6
                }
            },
            "range": [
                5,
                7
            ]
        },
        {
            "type": "Numeric",
            "value": "2",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 7
                },
                "end": {
                    "line": 2,
                    "column": 8
                }
            },
            "range": [
                8,
                9
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 8
                },
                "end": {
                    "line": 2,
                    "column": 9
                }
            },
            "range": [
                9,
                10
            ]
        }
    ]
};
