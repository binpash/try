export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 3,
            "column": 1
        }
    },
    "range": [
        0,
        62
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
                    "line": 3,
                    "column": 1
                }
            },
            "range": [
                0,
                62
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
                        "column": 19
                    }
                },
                "range": [
                    15,
                    19
                ],
                "name": "main"
            },
            "expression": false,
            "generator": false,
            "async": true,
            "params": [],
            "body": {
                "type": "BlockStatement",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 22
                    },
                    "end": {
                        "line": 3,
                        "column": 1
                    }
                },
                "range": [
                    22,
                    62
                ],
                "body": [
                    {
                        "type": "VariableDeclaration",
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 4
                            },
                            "end": {
                                "line": 2,
                                "column": 36
                            }
                        },
                        "range": [
                            28,
                            60
                        ],
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 36
                                    }
                                },
                                "range": [
                                    34,
                                    60
                                ],
                                "id": {
                                    "type": "Identifier",
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 13
                                        }
                                    },
                                    "range": [
                                        34,
                                        37
                                    ],
                                    "name": "foo"
                                },
                                "init": {
                                    "type": "AwaitExpression",
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 36
                                        }
                                    },
                                    "range": [
                                        40,
                                        60
                                    ],
                                    "argument": {
                                        "type": "ImportExpression",
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 22
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 36
                                            }
                                        },
                                        "range": [
                                            46,
                                            60
                                        ],
                                        "source": {
                                            "type": "Identifier",
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 29
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 35
                                                }
                                            },
                                            "range": [
                                                53,
                                                59
                                            ],
                                            "name": "source"
                                        }
                                    }
                                }
                            }
                        ],
                        "kind": "const"
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
            "value": "main",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 15
                },
                "end": {
                    "line": 1,
                    "column": 19
                }
            },
            "range": [
                15,
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
            "type": "Punctuator",
            "value": ")",
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
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 22
                },
                "end": {
                    "line": 1,
                    "column": 23
                }
            },
            "range": [
                22,
                23
            ]
        },
        {
            "type": "Keyword",
            "value": "const",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 4
                },
                "end": {
                    "line": 2,
                    "column": 9
                }
            },
            "range": [
                28,
                33
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 10
                },
                "end": {
                    "line": 2,
                    "column": 13
                }
            },
            "range": [
                34,
                37
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
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
                38,
                39
            ]
        },
        {
            "type": "Identifier",
            "value": "await",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 16
                },
                "end": {
                    "line": 2,
                    "column": 21
                }
            },
            "range": [
                40,
                45
            ]
        },
        {
            "type": "Keyword",
            "value": "import",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 22
                },
                "end": {
                    "line": 2,
                    "column": 28
                }
            },
            "range": [
                46,
                52
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 28
                },
                "end": {
                    "line": 2,
                    "column": 29
                }
            },
            "range": [
                52,
                53
            ]
        },
        {
            "type": "Identifier",
            "value": "source",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 29
                },
                "end": {
                    "line": 2,
                    "column": 35
                }
            },
            "range": [
                53,
                59
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 35
                },
                "end": {
                    "line": 2,
                    "column": 36
                }
            },
            "range": [
                59,
                60
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 1
                }
            },
            "range": [
                61,
                62
            ]
        }
    ]
};