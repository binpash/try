export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 4,
            "column": 1
        }
    },
    "range": [
        0,
        51
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
                    "line": 4,
                    "column": 1
                }
            },
            "range": [
                0,
                51
            ],
            "id": {
                "type": "Identifier",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 9
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                },
                "range": [
                    9,
                    12
                ],
                "name": "foo"
            },
            "params": [],
            "body": {
                "type": "BlockStatement",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 14
                    },
                    "end": {
                        "line": 4,
                        "column": 1
                    }
                },
                "range": [
                    14,
                    51
                ],
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 4
                            },
                            "end": {
                                "line": 2,
                                "column": 17
                            }
                        },
                        "range": [
                            20,
                            33
                        ],
                        "expression": {
                            "type": "Literal",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 4
                                },
                                "end": {
                                    "line": 2,
                                    "column": 16
                                }
                            },
                            "range": [
                                20,
                                32
                            ],
                            "value": "use strict",
                            "raw": "\"use strict\""
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 4
                            },
                            "end": {
                                "line": 3,
                                "column": 15
                            }
                        },
                        "range": [
                            38,
                            49
                        ],
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 14
                                    }
                                },
                                "range": [
                                    42,
                                    48
                                ],
                                "id": {
                                    "type": "Identifier",
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 9
                                        }
                                    },
                                    "range": [
                                        42,
                                        43
                                    ],
                                    "name": "i"
                                },
                                "init": {
                                    "type": "Literal",
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 14
                                        }
                                    },
                                    "range": [
                                        46,
                                        48
                                    ],
                                    "value": 0,
                                    "raw": "00"
                                }
                            }
                        ],
                        "kind": "var"
                    }
                ]
            },
            "expression": false,
            "generator": false
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "Keyword",
            "value": "function",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 8
                }
            },
            "range": [
                0,
                8
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 9
                },
                "end": {
                    "line": 1,
                    "column": 12
                }
            },
            "range": [
                9,
                12
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 12
                },
                "end": {
                    "line": 1,
                    "column": 13
                }
            },
            "range": [
                12,
                13
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 13
                },
                "end": {
                    "line": 1,
                    "column": 14
                }
            },
            "range": [
                13,
                14
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 14
                },
                "end": {
                    "line": 1,
                    "column": 15
                }
            },
            "range": [
                14,
                15
            ]
        },
        {
            "type": "String",
            "value": "\"use strict\"",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 4
                },
                "end": {
                    "line": 2,
                    "column": 16
                }
            },
            "range": [
                20,
                32
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 16
                },
                "end": {
                    "line": 2,
                    "column": 17
                }
            },
            "range": [
                32,
                33
            ]
        },
        {
            "type": "Keyword",
            "value": "var",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 4
                },
                "end": {
                    "line": 3,
                    "column": 7
                }
            },
            "range": [
                38,
                41
            ]
        },
        {
            "type": "Identifier",
            "value": "i",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 8
                },
                "end": {
                    "line": 3,
                    "column": 9
                }
            },
            "range": [
                42,
                43
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 10
                },
                "end": {
                    "line": 3,
                    "column": 11
                }
            },
            "range": [
                44,
                45
            ]
        },
        {
            "type": "Numeric",
            "value": "00",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 12
                },
                "end": {
                    "line": 3,
                    "column": 14
                }
            },
            "range": [
                46,
                48
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 14
                },
                "end": {
                    "line": 3,
                    "column": 15
                }
            },
            "range": [
                48,
                49
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 1
                }
            },
            "range": [
                50,
                51
            ]
        }
    ]
};