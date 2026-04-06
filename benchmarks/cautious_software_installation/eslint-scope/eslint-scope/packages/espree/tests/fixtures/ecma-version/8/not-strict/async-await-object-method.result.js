export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 29
        }
    },
    "range": [
        0,
        29
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
                    "column": 29
                }
            },
            "range": [
                0,
                29
            ],
            "expression": {
                "type": "ObjectExpression",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 1
                    },
                    "end": {
                        "line": 1,
                        "column": 27
                    }
                },
                "range": [
                    1,
                    27
                ],
                "properties": [
                    {
                        "type": "Property",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 2
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        },
                        "range": [
                            2,
                            26
                        ],
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            },
                            "range": [
                                8,
                                11
                            ],
                            "name": "foo"
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 26
                                }
                            },
                            "range": [
                                11,
                                26
                            ],
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [
                                {
                                    "type": "Identifier",
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
                                    ],
                                    "name": "a"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                },
                                "range": [
                                    15,
                                    26
                                ],
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 17
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 24
                                            }
                                        },
                                        "range": [
                                            17,
                                            24
                                        ],
                                        "expression": {
                                            "type": "AwaitExpression",
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 17
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 24
                                                }
                                            },
                                            "range": [
                                                17,
                                                24
                                            ],
                                            "argument": {
                                                "type": "Identifier",
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
                                                ],
                                                "name": "a"
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
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 1
                },
                "end": {
                    "line": 1,
                    "column": 2
                }
            },
            "range": [
                1,
                2
            ]
        },
        {
            "type": "Identifier",
            "value": "async",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 2
                },
                "end": {
                    "line": 1,
                    "column": 7
                }
            },
            "range": [
                2,
                7
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 8
                },
                "end": {
                    "line": 1,
                    "column": 11
                }
            },
            "range": [
                8,
                11
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 11
                },
                "end": {
                    "line": 1,
                    "column": 12
                }
            },
            "range": [
                11,
                12
            ]
        },
        {
            "type": "Identifier",
            "value": "a",
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
            "type": "Identifier",
            "value": "await",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 17
                },
                "end": {
                    "line": 1,
                    "column": 22
                }
            },
            "range": [
                17,
                22
            ]
        },
        {
            "type": "Identifier",
            "value": "a",
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
            "value": "}",
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
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 26
                },
                "end": {
                    "line": 1,
                    "column": 27
                }
            },
            "range": [
                26,
                27
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 27
                },
                "end": {
                    "line": 1,
                    "column": 28
                }
            },
            "range": [
                27,
                28
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 28
                },
                "end": {
                    "line": 1,
                    "column": 29
                }
            },
            "range": [
                28,
                29
            ]
        }
    ]
}