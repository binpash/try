export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 47
        }
    },
    "range": [
        0,
        47
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
                    "column": 46
                }
            },
            "range": [
                0,
                46
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
            "params": [
                {
                    "type": "Identifier",
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
                    ],
                    "name": "a"
                },
                {
                    "type": "Identifier",
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
                    ],
                    "name": "b"
                }
            ],
            "body": {
                "type": "BlockStatement",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 25
                    },
                    "end": {
                        "line": 1,
                        "column": 46
                    }
                },
                "range": [
                    25,
                    46
                ],
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 27
                            },
                            "end": {
                                "line": 1,
                                "column": 44
                            }
                        },
                        "range": [
                            27,
                            44
                        ],
                        "expression": {
                            "type": "BinaryExpression",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 27
                                },
                                "end": {
                                    "line": 1,
                                    "column": 44
                                }
                            },
                            "range": [
                                27,
                                44
                            ],
                            "left": {
                                "type": "AwaitExpression",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                },
                                "range": [
                                    27,
                                    34
                                ],
                                "argument": {
                                    "type": "Identifier",
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
                                    ],
                                    "name": "a"
                                }
                            },
                            "operator": "+",
                            "right": {
                                "type": "AwaitExpression",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 37
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 44
                                    }
                                },
                                "range": [
                                    37,
                                    44
                                ],
                                "argument": {
                                    "type": "Identifier",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 43
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 44
                                        }
                                    },
                                    "range": [
                                        43,
                                        44
                                    ],
                                    "name": "b"
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
                    "column": 46
                },
                "end": {
                    "line": 1,
                    "column": 47
                }
            },
            "range": [
                46,
                47
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
            "type": "Identifier",
            "value": "a",
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
            "value": ",",
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
            "type": "Identifier",
            "value": "b",
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
            "type": "Punctuator",
            "value": ")",
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
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 25
                },
                "end": {
                    "line": 1,
                    "column": 26
                }
            },
            "range": [
                25,
                26
            ]
        },
        {
            "type": "Identifier",
            "value": "await",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 27
                },
                "end": {
                    "line": 1,
                    "column": 32
                }
            },
            "range": [
                27,
                32
            ]
        },
        {
            "type": "Identifier",
            "value": "a",
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
            "value": "+",
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
        },
        {
            "type": "Identifier",
            "value": "await",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 37
                },
                "end": {
                    "line": 1,
                    "column": 42
                }
            },
            "range": [
                37,
                42
            ]
        },
        {
            "type": "Identifier",
            "value": "b",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 43
                },
                "end": {
                    "line": 1,
                    "column": 44
                }
            },
            "range": [
                43,
                44
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 45
                },
                "end": {
                    "line": 1,
                    "column": 46
                }
            },
            "range": [
                45,
                46
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 46
                },
                "end": {
                    "line": 1,
                    "column": 47
                }
            },
            "range": [
                46,
                47
            ]
        }
    ]
}