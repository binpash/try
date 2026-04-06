export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 2,
            "column": 35
        }
    },
    "range": [
        0,
        44
    ],
    "body": [
        {
            "type": "VariableDeclaration",
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
            ],
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    },
                    "range": [
                        4,
                        7
                    ],
                    "id": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        },
                        "range": [
                            4,
                            7
                        ],
                        "name": "foo"
                    },
                    "init": null
                }
            ],
            "kind": "let"
        },
        {
            "type": "ExportNamedDeclaration",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 35
                }
            },
            "range": [
                9,
                44
            ],
            "declaration": null,
            "specifiers": [
                {
                    "type": "ExportSpecifier",
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 9
                        },
                        "end": {
                            "line": 2,
                            "column": 32
                        }
                    },
                    "range": [
                        18,
                        41
                    ],
                    "local": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 9
                            },
                            "end": {
                                "line": 2,
                                "column": 12
                            }
                        },
                        "range": [
                            18,
                            21
                        ],
                        "name": "foo"
                    },
                    "exported": {
                        "type": "Literal",
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 16
                            },
                            "end": {
                                "line": 2,
                                "column": 32
                            }
                        },
                        "range": [
                            25,
                            41
                        ],
                        "value": " 👶 ",
                        "raw": "\" \\uD83D\\uDC76 \""
                    }
                }
            ],
            "source": null
        }
    ],
    "sourceType": "module",
    "tokens": [
        {
            "type": "Keyword",
            "value": "let",
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
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 4
                },
                "end": {
                    "line": 1,
                    "column": 7
                }
            },
            "range": [
                4,
                7
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 7
                },
                "end": {
                    "line": 1,
                    "column": 8
                }
            },
            "range": [
                7,
                8
            ]
        },
        {
            "type": "Keyword",
            "value": "export",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 6
                }
            },
            "range": [
                9,
                15
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
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
                16,
                17
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 9
                },
                "end": {
                    "line": 2,
                    "column": 12
                }
            },
            "range": [
                18,
                21
            ]
        },
        {
            "type": "Identifier",
            "value": "as",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 13
                },
                "end": {
                    "line": 2,
                    "column": 15
                }
            },
            "range": [
                22,
                24
            ]
        },
        {
            "type": "String",
            "value": "\" \\uD83D\\uDC76 \"",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 16
                },
                "end": {
                    "line": 2,
                    "column": 32
                }
            },
            "range": [
                25,
                41
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 33
                },
                "end": {
                    "line": 2,
                    "column": 34
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
                    "line": 2,
                    "column": 34
                },
                "end": {
                    "line": 2,
                    "column": 35
                }
            },
            "range": [
                43,
                44
            ]
        }
    ]
};