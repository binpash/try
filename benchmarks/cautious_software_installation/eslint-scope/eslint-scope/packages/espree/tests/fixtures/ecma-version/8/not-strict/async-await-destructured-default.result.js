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
        52
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
                51
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
                "name": "wrap"
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
                        "column": 22
                    },
                    "end": {
                        "line": 3,
                        "column": 1
                    }
                },
                "range": [
                    22,
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
                                "column": 25
                            }
                        },
                        "range": [
                            28,
                            49
                        ],
                        "expression": {
                            "type": "AssignmentExpression",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 5
                                },
                                "end": {
                                    "line": 2,
                                    "column": 24
                                }
                            },
                            "range": [
                                29,
                                48
                            ],
                            "operator": "=",
                            "left": {
                                "type": "ObjectPattern",
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 18
                                    }
                                },
                                "range": [
                                    29,
                                    42
                                ],
                                "properties": [
                                    {
                                        "type": "Property",
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 6
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 17
                                            }
                                        },
                                        "range": [
                                            30,
                                            41
                                        ],
                                        "method": false,
                                        "shorthand": true,
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
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
                                                30,
                                                31
                                            ],
                                            "name": "a"
                                        },
                                        "kind": "init",
                                        "value": {
                                            "type": "AssignmentPattern",
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 6
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 17
                                                }
                                            },
                                            "range": [
                                                30,
                                                41
                                            ],
                                            "left": {
                                                "type": "Identifier",
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
                                                    30,
                                                    31
                                                ],
                                                "name": "a"
                                            },
                                            "right": {
                                                "type": "AwaitExpression",
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 10
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 17
                                                    }
                                                },
                                                "range": [
                                                    34,
                                                    41
                                                ],
                                                "argument": {
                                                    "type": "Identifier",
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
                                                        40,
                                                        41
                                                    ],
                                                    "name": "b"
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            "right": {
                                "type": "Identifier",
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 21
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 24
                                    }
                                },
                                "range": [
                                    45,
                                    48
                                ],
                                "name": "obj"
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
                    "line": 3,
                    "column": 1
                },
                "end": {
                    "line": 3,
                    "column": 2
                }
            },
            "range": [
                51,
                52
            ]
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
            "value": "wrap",
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
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 4
                },
                "end": {
                    "line": 2,
                    "column": 5
                }
            },
            "range": [
                28,
                29
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 5
                },
                "end": {
                    "line": 2,
                    "column": 6
                }
            },
            "range": [
                29,
                30
            ]
        },
        {
            "type": "Identifier",
            "value": "a",
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
                30,
                31
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
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
                32,
                33
            ]
        },
        {
            "type": "Identifier",
            "value": "await",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 10
                },
                "end": {
                    "line": 2,
                    "column": 15
                }
            },
            "range": [
                34,
                39
            ]
        },
        {
            "type": "Identifier",
            "value": "b",
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
                41,
                42
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 19
                },
                "end": {
                    "line": 2,
                    "column": 20
                }
            },
            "range": [
                43,
                44
            ]
        },
        {
            "type": "Identifier",
            "value": "obj",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 21
                },
                "end": {
                    "line": 2,
                    "column": 24
                }
            },
            "range": [
                45,
                48
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 24
                },
                "end": {
                    "line": 2,
                    "column": 25
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
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 1
                }
            },
            "range": [
                50,
                51
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
                51,
                52
            ]
        }
    ]
}