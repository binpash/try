export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 5,
            "column": 1
        }
    },
    "range": [
        0,
        37
    ],
    "body": [
        {
            "type": "TryStatement",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 1
                }
            },
            "range": [
                0,
                37
            ],
            "block": {
                "type": "BlockStatement",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 4
                    },
                    "end": {
                        "line": 3,
                        "column": 1
                    }
                },
                "range": [
                    4,
                    17
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
                                "column": 9
                            }
                        },
                        "range": [
                            10,
                            15
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
                                    "column": 9
                                }
                            },
                            "range": [
                                10,
                                15
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
                                        "column": 7
                                    }
                                },
                                "range": [
                                    10,
                                    13
                                ],
                                "name": "foo"
                            },
                            "arguments": []
                        }
                    }
                ]
            },
            "handler": {
                "type": "CatchClause",
                "loc": {
                    "start": {
                        "line": 3,
                        "column": 2
                    },
                    "end": {
                        "line": 5,
                        "column": 1
                    }
                },
                "range": [
                    18,
                    37
                ],
                "param": null,
                "body": {
                    "type": "BlockStatement",
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 8
                        },
                        "end": {
                            "line": 5,
                            "column": 1
                        }
                    },
                    "range": [
                        24,
                        37
                    ],
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "loc": {
                                "start": {
                                    "line": 4,
                                    "column": 4
                                },
                                "end": {
                                    "line": 4,
                                    "column": 9
                                }
                            },
                            "range": [
                                30,
                                35
                            ],
                            "expression": {
                                "type": "CallExpression",
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 9
                                    }
                                },
                                "range": [
                                    30,
                                    35
                                ],
                                "callee": {
                                    "type": "Identifier",
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 7
                                        }
                                    },
                                    "range": [
                                        30,
                                        33
                                    ],
                                    "name": "bar"
                                },
                                "arguments": []
                            }
                        }
                    ]
                }
            },
            "finalizer": null
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "Keyword",
            "value": "try",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 3
                }
            },
            "range": [
                0,
                3
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 4
                },
                "end": {
                    "line": 1,
                    "column": 5
                }
            },
            "range": [
                4,
                5
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 4
                },
                "end": {
                    "line": 2,
                    "column": 7
                }
            },
            "range": [
                10,
                13
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
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
                13,
                14
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
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
                14,
                15
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
                16,
                17
            ]
        },
        {
            "type": "Keyword",
            "value": "catch",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 2
                },
                "end": {
                    "line": 3,
                    "column": 7
                }
            },
            "range": [
                18,
                23
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
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
                24,
                25
            ]
        },
        {
            "type": "Identifier",
            "value": "bar",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 4
                },
                "end": {
                    "line": 4,
                    "column": 7
                }
            },
            "range": [
                30,
                33
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 7
                },
                "end": {
                    "line": 4,
                    "column": 8
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
                    "line": 4,
                    "column": 8
                },
                "end": {
                    "line": 4,
                    "column": 9
                }
            },
            "range": [
                34,
                35
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 1
                }
            },
            "range": [
                36,
                37
            ]
        }
    ]
};