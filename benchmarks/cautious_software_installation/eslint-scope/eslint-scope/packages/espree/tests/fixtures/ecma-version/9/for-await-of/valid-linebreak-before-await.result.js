export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 2,
            "column": 18
        }
    },
    "range": [
        0,
        43
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
                    "line": 2,
                    "column": 18
                }
            },
            "range": [
                0,
                43
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
                        "column": 16
                    }
                },
                "range": [
                    15,
                    16
                ],
                "name": "f"
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
                        "column": 19
                    },
                    "end": {
                        "line": 2,
                        "column": 18
                    }
                },
                "range": [
                    19,
                    43
                ],
                "body": [
                    {
                        "type": "ForOfStatement",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 2,
                                "column": 16
                            }
                        },
                        "range": [
                            21,
                            41
                        ],
                        "await": true,
                        "left": {
                            "type": "Identifier",
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
                                32,
                                33
                            ],
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 12
                                },
                                "end": {
                                    "line": 2,
                                    "column": 14
                                }
                            },
                            "range": [
                                37,
                                39
                            ],
                            "name": "xs"
                        },
                        "body": {
                            "type": "EmptyStatement",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 15
                                },
                                "end": {
                                    "line": 2,
                                    "column": 16
                                }
                            },
                            "range": [
                                40,
                                41
                            ]
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script",
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
            "value": "f",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 15
                },
                "end": {
                    "line": 1,
                    "column": 16
                }
            },
            "range": [
                15,
                16
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 16
                },
                "end": {
                    "line": 1,
                    "column": 17
                }
            },
            "range": [
                16,
                17
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 17
                },
                "end": {
                    "line": 1,
                    "column": 18
                }
            },
            "range": [
                17,
                18
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
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
            "type": "Keyword",
            "value": "for",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 21
                },
                "end": {
                    "line": 1,
                    "column": 24
                }
            },
            "range": [
                21,
                24
            ]
        },
        {
            "type": "Identifier",
            "value": "await",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 5
                }
            },
            "range": [
                25,
                30
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 6
                },
                "end": {
                    "line": 2,
                    "column": 7
                }
            },
            "range": [
                31,
                32
            ]
        },
        {
            "type": "Identifier",
            "value": "x",
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
                32,
                33
            ]
        },
        {
            "type": "Identifier",
            "value": "of",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 9
                },
                "end": {
                    "line": 2,
                    "column": 11
                }
            },
            "range": [
                34,
                36
            ]
        },
        {
            "type": "Identifier",
            "value": "xs",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 12
                },
                "end": {
                    "line": 2,
                    "column": 14
                }
            },
            "range": [
                37,
                39
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 14
                },
                "end": {
                    "line": 2,
                    "column": 15
                }
            },
            "range": [
                39,
                40
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 15
                },
                "end": {
                    "line": 2,
                    "column": 16
                }
            },
            "range": [
                40,
                41
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 17
                },
                "end": {
                    "line": 2,
                    "column": 18
                }
            },
            "range": [
                42,
                43
            ]
        }
    ]
};