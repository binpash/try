export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 3,
            "column": 2
        }
    },
    "range": [
        0,
        44
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
                43
            ],
            "id": {
                "type": "Identifier",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 10
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                },
                "range": [
                    10,
                    14
                ],
                "name": "wrap"
            },
            "generator": true,
            "expression": false,
            "async": false,
            "params": [],
            "body": {
                "type": "BlockStatement",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 17
                    },
                    "end": {
                        "line": 3,
                        "column": 1
                    }
                },
                "range": [
                    17,
                    43
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
                                "column": 22
                            }
                        },
                        "range": [
                            23,
                            41
                        ],
                        "expression": {
                            "type": "CallExpression",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 4
                                },
                                "end": {
                                    "line": 2,
                                    "column": 22
                                }
                            },
                            "range": [
                                23,
                                41
                            ],
                            "callee": {
                                "type": "Identifier",
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
                                    23,
                                    28
                                ],
                                "name": "async"
                            },
                            "arguments": [
                                {
                                    "type": "AssignmentExpression",
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 21
                                        }
                                    },
                                    "range": [
                                        29,
                                        40
                                    ],
                                    "operator": "=",
                                    "left": {
                                        "type": "Identifier",
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 10
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 11
                                            }
                                        },
                                        "range": [
                                            29,
                                            30
                                        ],
                                        "name": "a"
                                    },
                                    "right": {
                                        "type": "YieldExpression",
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 21
                                            }
                                        },
                                        "range": [
                                            33,
                                            40
                                        ],
                                        "delegate": false,
                                        "argument": {
                                            "type": "Identifier",
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 21
                                                }
                                            },
                                            "range": [
                                                39,
                                                40
                                            ],
                                            "name": "b"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "type": "EmptyStatement",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 1
                },
                "end": {
                    "line": 3,
                    "column": 2
                }
            },
            "range": [
                43,
                44
            ]
        }
    ],
    "sourceType": "module",
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
            "type": "Punctuator",
            "value": "*",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 8
                },
                "end": {
                    "line": 1,
                    "column": 9
                }
            },
            "range": [
                8,
                9
            ]
        },
        {
            "type": "Identifier",
            "value": "wrap",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 10
                },
                "end": {
                    "line": 1,
                    "column": 14
                }
            },
            "range": [
                10,
                14
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
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
            "type": "Punctuator",
            "value": ")",
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
            "value": "{",
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
            "type": "Identifier",
            "value": "async",
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
                23,
                28
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 9
                },
                "end": {
                    "line": 2,
                    "column": 10
                }
            },
            "range": [
                28,
                29
            ]
        },
        {
            "type": "Identifier",
            "value": "a",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 10
                },
                "end": {
                    "line": 2,
                    "column": 11
                }
            },
            "range": [
                29,
                30
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 12
                },
                "end": {
                    "line": 2,
                    "column": 13
                }
            },
            "range": [
                31,
                32
            ]
        },
        {
            "type": "Keyword",
            "value": "yield",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 14
                },
                "end": {
                    "line": 2,
                    "column": 19
                }
            },
            "range": [
                33,
                38
            ]
        },
        {
            "type": "Identifier",
            "value": "b",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 20
                },
                "end": {
                    "line": 2,
                    "column": 21
                }
            },
            "range": [
                39,
                40
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 21
                },
                "end": {
                    "line": 2,
                    "column": 22
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
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 1
                }
            },
            "range": [
                42,
                43
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 1
                },
                "end": {
                    "line": 3,
                    "column": 2
                }
            },
            "range": [
                43,
                44
            ]
        }
    ]
}