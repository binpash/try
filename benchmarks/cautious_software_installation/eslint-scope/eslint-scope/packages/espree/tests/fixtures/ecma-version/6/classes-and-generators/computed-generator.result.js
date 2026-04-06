export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 4,
            "column": 1
        }
    },
    "range": [
        0,
        40
    ],
    "body": [
        {
            "type": "ClassDeclaration",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 1
                }
            },
            "range": [
                0,
                40
            ],
            "id": {
                "type": "Identifier",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 6
                    },
                    "end": {
                        "line": 1,
                        "column": 9
                    }
                },
                "range": [
                    6,
                    9
                ],
                "name": "Foo"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 10
                    },
                    "end": {
                        "line": 4,
                        "column": 1
                    }
                },
                "range": [
                    10,
                    40
                ],
                "body": [
                    {
                        "type": "MethodDefinition",
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 1
                            },
                            "end": {
                                "line": 3,
                                "column": 2
                            }
                        },
                        "range": [
                            13,
                            38
                        ],
                        "computed": true,
                        "key": {
                            "type": "MemberExpression",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 3
                                },
                                "end": {
                                    "line": 2,
                                    "column": 18
                                }
                            },
                            "range": [
                                15,
                                30
                            ],
                            "object": {
                                "type": "Identifier",
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 3
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 9
                                    }
                                },
                                "range": [
                                    15,
                                    21
                                ],
                                "name": "Symbol"
                            },
                            "property": {
                                "type": "Identifier",
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 18
                                    }
                                },
                                "range": [
                                    22,
                                    30
                                ],
                                "name": "iterator"
                            },
                            "computed": false
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 19
                                },
                                "end": {
                                    "line": 3,
                                    "column": 2
                                }
                            },
                            "range": [
                                31,
                                38
                            ],
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 2
                                    }
                                },
                                "range": [
                                    34,
                                    38
                                ],
                                "body": []
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
            "type": "Keyword",
            "value": "class",
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
            "type": "Identifier",
            "value": "Foo",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 6
                },
                "end": {
                    "line": 1,
                    "column": 9
                }
            },
            "range": [
                6,
                9
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 10
                },
                "end": {
                    "line": 1,
                    "column": 11
                }
            },
            "range": [
                10,
                11
            ]
        },
        {
            "type": "Punctuator",
            "value": "*",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 1
                },
                "end": {
                    "line": 2,
                    "column": 2
                }
            },
            "range": [
                13,
                14
            ]
        },
        {
            "type": "Punctuator",
            "value": "[",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 2
                },
                "end": {
                    "line": 2,
                    "column": 3
                }
            },
            "range": [
                14,
                15
            ]
        },
        {
            "type": "Identifier",
            "value": "Symbol",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 3
                },
                "end": {
                    "line": 2,
                    "column": 9
                }
            },
            "range": [
                15,
                21
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
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
                21,
                22
            ]
        },
        {
            "type": "Identifier",
            "value": "iterator",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 10
                },
                "end": {
                    "line": 2,
                    "column": 18
                }
            },
            "range": [
                22,
                30
            ]
        },
        {
            "type": "Punctuator",
            "value": "]",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 18
                },
                "end": {
                    "line": 2,
                    "column": 19
                }
            },
            "range": [
                30,
                31
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
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
                31,
                32
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
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
                32,
                33
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 22
                },
                "end": {
                    "line": 2,
                    "column": 23
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
                    "line": 3,
                    "column": 1
                },
                "end": {
                    "line": 3,
                    "column": 2
                }
            },
            "range": [
                37,
                38
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 1
                }
            },
            "range": [
                39,
                40
            ]
        }
    ]
};