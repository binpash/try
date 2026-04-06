export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 36
        }
    },
    "range": [
        0,
        36
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
                    "column": 36
                }
            },
            "range": [
                0,
                36
            ],
            "expression": {
                "type": "FunctionExpression",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 1
                    },
                    "end": {
                        "line": 1,
                        "column": 34
                    }
                },
                "range": [
                    1,
                    34
                ],
                "id": {
                    "type": "Identifier",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 16
                        },
                        "end": {
                            "line": 1,
                            "column": 19
                        }
                    },
                    "range": [
                        16,
                        19
                    ],
                    "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [
                    {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 20
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        },
                        "range": [
                            20,
                            21
                        ],
                        "name": "a"
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 23
                        },
                        "end": {
                            "line": 1,
                            "column": 34
                        }
                    },
                    "range": [
                        23,
                        34
                    ],
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 25
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            },
                            "range": [
                                25,
                                32
                            ],
                            "expression": {
                                "type": "AwaitExpression",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 25
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                },
                                "range": [
                                    25,
                                    32
                                ],
                                "argument": {
                                    "type": "Identifier",
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
                                    "name": "a"
                                }
                            }
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 1
                }
            },
            "range": [
                0,
                1
            ]
        },
        {
            "type": "Identifier",
            "value": "async",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 1
                },
                "end": {
                    "line": 1,
                    "column": 6
                }
            },
            "range": [
                1,
                6
            ]
        },
        {
            "type": "Keyword",
            "value": "function",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 7
                },
                "end": {
                    "line": 1,
                    "column": 15
                }
            },
            "range": [
                7,
                15
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 16
                },
                "end": {
                    "line": 1,
                    "column": 19
                }
            },
            "range": [
                16,
                19
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
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
            "type": "Identifier",
            "value": "a",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 20
                },
                "end": {
                    "line": 1,
                    "column": 21
                }
            },
            "range": [
                20,
                21
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
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
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 23
                },
                "end": {
                    "line": 1,
                    "column": 24
                }
            },
            "range": [
                23,
                24
            ]
        },
        {
            "type": "Identifier",
            "value": "await",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 25
                },
                "end": {
                    "line": 1,
                    "column": 30
                }
            },
            "range": [
                25,
                30
            ]
        },
        {
            "type": "Identifier",
            "value": "a",
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
            "value": ")",
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
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 35
                },
                "end": {
                    "line": 1,
                    "column": 36
                }
            },
            "range": [
                35,
                36
            ]
        }
    ]
}