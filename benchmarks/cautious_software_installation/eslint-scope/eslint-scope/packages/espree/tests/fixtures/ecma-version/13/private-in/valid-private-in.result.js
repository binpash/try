export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 6,
            "column": 1
        }
    },
    "range": [
        0,
        64
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
                    "line": 6,
                    "column": 1
                }
            },
            "range": [
                0,
                64
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
                        "column": 7
                    }
                },
                "range": [
                    6,
                    7
                ],
                "name": "C"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 8
                    },
                    "end": {
                        "line": 6,
                        "column": 1
                    }
                },
                "range": [
                    8,
                    64
                ],
                "body": [
                    {
                        "type": "PropertyDefinition",
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 4
                            },
                            "end": {
                                "line": 2,
                                "column": 6
                            }
                        },
                        "range": [
                            14,
                            16
                        ],
                        "static": false,
                        "computed": false,
                        "key": {
                            "type": "PrivateIdentifier",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 4
                                },
                                "end": {
                                    "line": 2,
                                    "column": 6
                                }
                            },
                            "range": [
                                14,
                                16
                            ],
                            "name": "a"
                        },
                        "value": null
                    },
                    {
                        "type": "MethodDefinition",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 4
                            },
                            "end": {
                                "line": 5,
                                "column": 5
                            }
                        },
                        "range": [
                            21,
                            62
                        ],
                        "static": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 4
                                },
                                "end": {
                                    "line": 3,
                                    "column": 6
                                }
                            },
                            "range": [
                                21,
                                23
                            ],
                            "name": "fn"
                        },
                        "kind": "method",
                        "value": {
                            "type": "FunctionExpression",
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 6
                                },
                                "end": {
                                    "line": 5,
                                    "column": 5
                                }
                            },
                            "range": [
                                23,
                                62
                            ],
                            "id": null,
                            "expression": false,
                            "generator": false,
                            "async": false,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 7
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 10
                                        }
                                    },
                                    "range": [
                                        24,
                                        27
                                    ],
                                    "name": "obj"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 5
                                    }
                                },
                                "range": [
                                    29,
                                    62
                                ],
                                "body": [
                                    {
                                        "type": "ReturnStatement",
                                        "loc": {
                                            "start": {
                                                "line": 4,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 25
                                            }
                                        },
                                        "range": [
                                            39,
                                            56
                                        ],
                                        "argument": {
                                            "type": "BinaryExpression",
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 25
                                                }
                                            },
                                            "range": [
                                                46,
                                                56
                                            ],
                                            "left": {
                                                "type": "PrivateIdentifier",
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 15
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 17
                                                    }
                                                },
                                                "range": [
                                                    46,
                                                    48
                                                ],
                                                "name": "a"
                                            },
                                            "operator": "in",
                                            "right": {
                                                "type": "Identifier",
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 22
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 25
                                                    }
                                                },
                                                "range": [
                                                    53,
                                                    56
                                                ],
                                                "name": "obj"
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
            "value": "C",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 6
                },
                "end": {
                    "line": 1,
                    "column": 7
                }
            },
            "range": [
                6,
                7
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
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
            "type": "PrivateIdentifier",
            "value": "a",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 4
                },
                "end": {
                    "line": 2,
                    "column": 6
                }
            },
            "range": [
                14,
                16
            ]
        },
        {
            "type": "Identifier",
            "value": "fn",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 4
                },
                "end": {
                    "line": 3,
                    "column": 6
                }
            },
            "range": [
                21,
                23
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 6
                },
                "end": {
                    "line": 3,
                    "column": 7
                }
            },
            "range": [
                23,
                24
            ]
        },
        {
            "type": "Identifier",
            "value": "obj",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 7
                },
                "end": {
                    "line": 3,
                    "column": 10
                }
            },
            "range": [
                24,
                27
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 10
                },
                "end": {
                    "line": 3,
                    "column": 11
                }
            },
            "range": [
                27,
                28
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 12
                },
                "end": {
                    "line": 3,
                    "column": 13
                }
            },
            "range": [
                29,
                30
            ]
        },
        {
            "type": "Keyword",
            "value": "return",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 8
                },
                "end": {
                    "line": 4,
                    "column": 14
                }
            },
            "range": [
                39,
                45
            ]
        },
        {
            "type": "PrivateIdentifier",
            "value": "a",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 15
                },
                "end": {
                    "line": 4,
                    "column": 17
                }
            },
            "range": [
                46,
                48
            ]
        },
        {
            "type": "Keyword",
            "value": "in",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 18
                },
                "end": {
                    "line": 4,
                    "column": 20
                }
            },
            "range": [
                49,
                51
            ]
        },
        {
            "type": "Identifier",
            "value": "obj",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 22
                },
                "end": {
                    "line": 4,
                    "column": 25
                }
            },
            "range": [
                53,
                56
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 4
                },
                "end": {
                    "line": 5,
                    "column": 5
                }
            },
            "range": [
                61,
                62
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 0
                },
                "end": {
                    "line": 6,
                    "column": 1
                }
            },
            "range": [
                63,
                64
            ]
        }
    ]
};