export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 35
        }
    },
    "range": [
        0,
        35
    ],
    "body": [
        {
            "type": "FunctionDeclaration",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 34
                }
            },
            "range": [
                0,
                34
            ],
            "id": {
                "type": "Identifier",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 15
                    },
                    "end": {
                        "line": 1,
                        "column": 18
                    }
                },
                "range": [
                    15,
                    18
                ],
                "name": "foo"
            },
            "generator": false,
            "expression": false,
            "async": true,
            "params": [],
            "body": {
                "type": "BlockStatement",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 21
                    },
                    "end": {
                        "line": 1,
                        "column": 34
                    }
                },
                "range": [
                    21,
                    34
                ],
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 23
                            },
                            "end": {
                                "line": 1,
                                "column": 32
                            }
                        },
                        "range": [
                            23,
                            32
                        ],
                        "expression": {
                            "type": "AwaitExpression",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            },
                            "range": [
                                23,
                                32
                            ],
                            "argument": {
                                "type": "UnaryExpression",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                },
                                "range": [
                                    29,
                                    32
                                ],
                                "operator": "+",
                                "prefix": true,
                                "argument": {
                                    "type": "Literal",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 31
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    },
                                    "range": [
                                        31,
                                        32
                                    ],
                                    "value": 1,
                                    "raw": "1"
                                }
                            }
                        }
                    }
                ]
            }
        },
        {
            "type": "EmptyStatement",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 34
                },
                "end": {
                    "line": 1,
                    "column": 35
                }
            },
            "range": [
                34,
                35
            ]
        }
    ],
    "sourceType": "module",
    "tokens": [
        {
            "type": "Identifier",
            "value": "async",
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
            "type": "Keyword",
            "value": "function",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 6
                },
                "end": {
                    "line": 1,
                    "column": 14
                }
            },
            "range": [
                6,
                14
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 15
                },
                "end": {
                    "line": 1,
                    "column": 18
                }
            },
            "range": [
                15,
                18
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 18
                },
                "end": {
                    "line": 1,
                    "column": 19
                }
            },
            "range": [
                18,
                19
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 19
                },
                "end": {
                    "line": 1,
                    "column": 20
                }
            },
            "range": [
                19,
                20
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 21
                },
                "end": {
                    "line": 1,
                    "column": 22
                }
            },
            "range": [
                21,
                22
            ]
        },
        {
            "type": "Identifier",
            "value": "await",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 23
                },
                "end": {
                    "line": 1,
                    "column": 28
                }
            },
            "range": [
                23,
                28
            ]
        },
        {
            "type": "Punctuator",
            "value": "+",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 29
                },
                "end": {
                    "line": 1,
                    "column": 30
                }
            },
            "range": [
                29,
                30
            ]
        },
        {
            "type": "Numeric",
            "value": "1",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 31
                },
                "end": {
                    "line": 1,
                    "column": 32
                }
            },
            "range": [
                31,
                32
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 33
                },
                "end": {
                    "line": 1,
                    "column": 34
                }
            },
            "range": [
                33,
                34
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 34
                },
                "end": {
                    "line": 1,
                    "column": 35
                }
            },
            "range": [
                34,
                35
            ]
        }
    ]
}