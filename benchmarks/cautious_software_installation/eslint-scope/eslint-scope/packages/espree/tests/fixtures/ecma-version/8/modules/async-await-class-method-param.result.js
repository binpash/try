export default {
    "type": "Program",
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
                    "column": 58
                }
            },
            "range": [
                0,
                58
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
                            "column": 54
                        }
                    },
                    "range": [
                        19,
                        54
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
                        "type": "ClassExpression",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 23
                            },
                            "end": {
                                "line": 1,
                                "column": 54
                            }
                        },
                        "range": [
                            23,
                            54
                        ],
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 29
                                },
                                "end": {
                                    "line": 1,
                                    "column": 54
                                }
                            },
                            "range": [
                                29,
                                54
                            ],
                            "body": [
                                {
                                    "type": "MethodDefinition",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 30
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 53
                                        }
                                    },
                                    "range": [
                                        30,
                                        53
                                    ],
                                    "computed": false,
                                    "key": {
                                        "type": "Identifier",
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 36
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 39
                                            }
                                        },
                                        "range": [
                                            36,
                                            39
                                        ],
                                        "name": "bar"
                                    },
                                    "static": false,
                                    "kind": "method",
                                    "value": {
                                        "type": "FunctionExpression",
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 39
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 53
                                            }
                                        },
                                        "range": [
                                            39,
                                            53
                                        ],
                                        "id": null,
                                        "generator": false,
                                        "expression": false,
                                        "async": true,
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 42
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 53
                                                }
                                            },
                                            "range": [
                                                42,
                                                53
                                            ],
                                            "body": [
                                                {
                                                    "type": "ExpressionStatement",
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 44
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 51
                                                        }
                                                    },
                                                    "range": [
                                                        44,
                                                        51
                                                    ],
                                                    "expression": {
                                                        "type": "AwaitExpression",
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 44
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 51
                                                            }
                                                        },
                                                        "range": [
                                                            44,
                                                            51
                                                        ],
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 50
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 51
                                                                }
                                                            },
                                                            "range": [
                                                                50,
                                                                51
                                                            ],
                                                            "name": "b"
                                                        }
                                                    }
                                                }
                                            ]
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
                        "column": 56
                    },
                    "end": {
                        "line": 1,
                        "column": 58
                    }
                },
                "range": [
                    56,
                    58
                ],
                "body": []
            }
        },
        {
            "type": "EmptyStatement",
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
            "type": "Keyword",
            "value": "class",
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
            "value": "{",
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
            "type": "Identifier",
            "value": "async",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 30
                },
                "end": {
                    "line": 1,
                    "column": 35
                }
            },
            "range": [
                30,
                35
            ]
        },
        {
            "type": "Identifier",
            "value": "bar",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 36
                },
                "end": {
                    "line": 1,
                    "column": 39
                }
            },
            "range": [
                36,
                39
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 39
                },
                "end": {
                    "line": 1,
                    "column": 40
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
                    "line": 1,
                    "column": 40
                },
                "end": {
                    "line": 1,
                    "column": 41
                }
            },
            "range": [
                40,
                41
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
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
            "type": "Identifier",
            "value": "await",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 44
                },
                "end": {
                    "line": 1,
                    "column": 49
                }
            },
            "range": [
                44,
                49
            ]
        },
        {
            "type": "Identifier",
            "value": "b",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 50
                },
                "end": {
                    "line": 1,
                    "column": 51
                }
            },
            "range": [
                50,
                51
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
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
                    "column": 53
                },
                "end": {
                    "line": 1,
                    "column": 54
                }
            },
            "range": [
                53,
                54
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
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
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 56
                },
                "end": {
                    "line": 1,
                    "column": 57
                }
            },
            "range": [
                56,
                57
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
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
            "value": ";",
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
        }
    ]
}