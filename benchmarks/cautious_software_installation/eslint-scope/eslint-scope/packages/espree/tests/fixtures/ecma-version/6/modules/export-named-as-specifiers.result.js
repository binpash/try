export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 3,
            "column": 29
        }
    },
    "range": [
        0,
        65
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
                    "line": 2,
                    "column": 16
                }
            },
            "range": [
                0,
                35
            ],
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 6
                        },
                        "end": {
                            "line": 1,
                            "column": 17
                        }
                    },
                    "range": [
                        6,
                        17
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
                        "name": "foo"
                    },
                    "init": {
                        "type": "Literal",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        },
                        "range": [
                            12,
                            17
                        ],
                        "value": "foo",
                        "raw": "\"foo\""
                    }
                },
                {
                    "type": "VariableDeclarator",
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 4
                        },
                        "end": {
                            "line": 2,
                            "column": 15
                        }
                    },
                    "range": [
                        23,
                        34
                    ],
                    "id": {
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
                            23,
                            26
                        ],
                        "name": "bar"
                    },
                    "init": {
                        "type": "Literal",
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
                            29,
                            34
                        ],
                        "value": "bar",
                        "raw": "\"bar\""
                    }
                }
            ],
            "kind": "const"
        },
        {
            "type": "ExportNamedDeclaration",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 29
                }
            },
            "range": [
                36,
                65
            ],
            "declaration": null,
            "specifiers": [
                {
                    "type": "ExportSpecifier",
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 8
                        },
                        "end": {
                            "line": 3,
                            "column": 22
                        }
                    },
                    "range": [
                        44,
                        58
                    ],
                    "local": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 8
                            },
                            "end": {
                                "line": 3,
                                "column": 11
                            }
                        },
                        "range": [
                            44,
                            47
                        ],
                        "name": "foo"
                    },
                    "exported": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 15
                            },
                            "end": {
                                "line": 3,
                                "column": 22
                            }
                        },
                        "range": [
                            51,
                            58
                        ],
                        "name": "default"
                    }
                },
                {
                    "type": "ExportSpecifier",
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 24
                        },
                        "end": {
                            "line": 3,
                            "column": 27
                        }
                    },
                    "range": [
                        60,
                        63
                    ],
                    "local": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 24
                            },
                            "end": {
                                "line": 3,
                                "column": 27
                            }
                        },
                        "range": [
                            60,
                            63
                        ],
                        "name": "bar"
                    },
                    "exported": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 24
                            },
                            "end": {
                                "line": 3,
                                "column": 27
                            }
                        },
                        "range": [
                            60,
                            63
                        ],
                        "name": "bar"
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
            "value": "const",
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
            "value": "foo",
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
            "value": "=",
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
            "type": "String",
            "value": "\"foo\"",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 12
                },
                "end": {
                    "line": 1,
                    "column": 17
                }
            },
            "range": [
                12,
                17
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
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
            "value": "bar",
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
                23,
                26
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
                27,
                28
            ]
        },
        {
            "type": "String",
            "value": "\"bar\"",
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
                29,
                34
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 15
                },
                "end": {
                    "line": 2,
                    "column": 16
                }
            },
            "range": [
                34,
                35
            ]
        },
        {
            "type": "Keyword",
            "value": "export",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 6
                }
            },
            "range": [
                36,
                42
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 7
                },
                "end": {
                    "line": 3,
                    "column": 8
                }
            },
            "range": [
                43,
                44
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 8
                },
                "end": {
                    "line": 3,
                    "column": 11
                }
            },
            "range": [
                44,
                47
            ]
        },
        {
            "type": "Identifier",
            "value": "as",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 12
                },
                "end": {
                    "line": 3,
                    "column": 14
                }
            },
            "range": [
                48,
                50
            ]
        },
        {
            "type": "Identifier",
            "value": "default",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 15
                },
                "end": {
                    "line": 3,
                    "column": 22
                }
            },
            "range": [
                51,
                58
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 22
                },
                "end": {
                    "line": 3,
                    "column": 23
                }
            },
            "range": [
                58,
                59
            ]
        },
        {
            "type": "Identifier",
            "value": "bar",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 24
                },
                "end": {
                    "line": 3,
                    "column": 27
                }
            },
            "range": [
                60,
                63
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 27
                },
                "end": {
                    "line": 3,
                    "column": 28
                }
            },
            "range": [
                63,
                64
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 28
                },
                "end": {
                    "line": 3,
                    "column": 29
                }
            },
            "range": [
                64,
                65
            ]
        }
    ]
};