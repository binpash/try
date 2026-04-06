export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 60
        }
    },
    "range": [
        0,
        60
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
                    "column": 59
                }
            },
            "range": [
                0,
                59
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
                    "type": "AssignmentPattern",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 19
                        },
                        "end": {
                            "line": 1,
                            "column": 55
                        }
                    },
                    "range": [
                        19,
                        55
                    ],
                    "left": {
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
                    "right": {
                        "type": "FunctionExpression",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 23
                            },
                            "end": {
                                "line": 1,
                                "column": 55
                            }
                        },
                        "range": [
                            23,
                            55
                        ],
                        "id": {
                            "type": "Identifier",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 38
                                },
                                "end": {
                                    "line": 1,
                                    "column": 41
                                }
                            },
                            "range": [
                                38,
                                41
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
                                    "column": 44
                                },
                                "end": {
                                    "line": 1,
                                    "column": 55
                                }
                            },
                            "range": [
                                44,
                                55
                            ],
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 46
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 53
                                        }
                                    },
                                    "range": [
                                        46,
                                        53
                                    ],
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 46
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 53
                                            }
                                        },
                                        "range": [
                                            46,
                                            53
                                        ],
                                        "argument": {
                                            "type": "Identifier",
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 52
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 53
                                                }
                                            },
                                            "range": [
                                                52,
                                                53
                                            ],
                                            "name": "b"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
            "body": {
                "type": "BlockStatement",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 57
                    },
                    "end": {
                        "line": 1,
                        "column": 59
                    }
                },
                "range": [
                    57,
                    59
                ],
                "body": []
            }
        },
        {
            "type": "EmptyStatement",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 59
                },
                "end": {
                    "line": 1,
                    "column": 60
                }
            },
            "range": [
                59,
                60
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
            "value": "=",
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
            "value": "async",
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
            "type": "Keyword",
            "value": "function",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 29
                },
                "end": {
                    "line": 1,
                    "column": 37
                }
            },
            "range": [
                29,
                37
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 38
                },
                "end": {
                    "line": 1,
                    "column": 41
                }
            },
            "range": [
                38,
                41
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 41
                },
                "end": {
                    "line": 1,
                    "column": 42
                }
            },
            "range": [
                41,
                42
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 42
                },
                "end": {
                    "line": 1,
                    "column": 43
                }
            },
            "range": [
                42,
                43
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 44
                },
                "end": {
                    "line": 1,
                    "column": 45
                }
            },
            "range": [
                44,
                45
            ]
        },
        {
            "type": "Identifier",
            "value": "await",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 46
                },
                "end": {
                    "line": 1,
                    "column": 51
                }
            },
            "range": [
                46,
                51
            ]
        },
        {
            "type": "Identifier",
            "value": "b",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 52
                },
                "end": {
                    "line": 1,
                    "column": 53
                }
            },
            "range": [
                52,
                53
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 54
                },
                "end": {
                    "line": 1,
                    "column": 55
                }
            },
            "range": [
                54,
                55
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 55
                },
                "end": {
                    "line": 1,
                    "column": 56
                }
            },
            "range": [
                55,
                56
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 57
                },
                "end": {
                    "line": 1,
                    "column": 58
                }
            },
            "range": [
                57,
                58
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 58
                },
                "end": {
                    "line": 1,
                    "column": 59
                }
            },
            "range": [
                58,
                59
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 59
                },
                "end": {
                    "line": 1,
                    "column": 60
                }
            },
            "range": [
                59,
                60
            ]
        }
    ]
}