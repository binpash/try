export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 7,
            "column": 2
        }
    },
    "range": [
        0,
        88
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
                    "column": 13
                }
            },
            "range": [
                0,
                13
            ],
            "directive": "use strict",
            "expression": {
                "type": "Literal",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                },
                "range": [
                    0,
                    12
                ],
                "value": "use strict",
                "raw": "\"use strict\""
            }
        },
        {
            "type": "VariableDeclaration",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 7,
                    "column": 2
                }
            },
            "range": [
                15,
                88
            ],
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 4
                        },
                        "end": {
                            "line": 7,
                            "column": 1
                        }
                    },
                    "range": [
                        19,
                        87
                    ],
                    "id": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 4
                            },
                            "end": {
                                "line": 3,
                                "column": 5
                            }
                        },
                        "range": [
                            19,
                            20
                        ],
                        "name": "x"
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 8
                            },
                            "end": {
                                "line": 7,
                                "column": 1
                            }
                        },
                        "range": [
                            23,
                            87
                        ],
                        "properties": [
                            {
                                "type": "Property",
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 1
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 15
                                    }
                                },
                                "range": [
                                    26,
                                    40
                                ],
                                "method": true,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 4
                                        }
                                    },
                                    "range": [
                                        26,
                                        29
                                    ],
                                    "name": "baz"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "FunctionExpression",
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 15
                                        }
                                    },
                                    "range": [
                                        29,
                                        40
                                    ],
                                    "id": null,
                                    "generator": false,
                                    "expression": false,
                                    "params": [
                                        {
                                            "type": "AssignmentPattern",
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 5
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 11
                                                }
                                            },
                                            "range": [
                                                30,
                                                36
                                            ],
                                            "left": {
                                                "type": "Identifier",
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 5
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 6
                                                    }
                                                },
                                                "range": [
                                                    30,
                                                    31
                                                ],
                                                "name": "a"
                                            },
                                            "right": {
                                                "type": "Literal",
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 9
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 11
                                                    }
                                                },
                                                "range": [
                                                    34,
                                                    36
                                                ],
                                                "value": 10,
                                                "raw": "10"
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "loc": {
                                            "start": {
                                                "line": 4,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 15
                                            }
                                        },
                                        "range": [
                                            38,
                                            40
                                        ],
                                        "body": []
                                    }
                                }
                            },
                            {
                                "type": "Property",
                                "loc": {
                                    "start": {
                                        "line": 5,
                                        "column": 1
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 18
                                    }
                                },
                                "range": [
                                    43,
                                    60
                                ],
                                "method": true,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "loc": {
                                        "start": {
                                            "line": 5,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 5,
                                            "column": 4
                                        }
                                    },
                                    "range": [
                                        43,
                                        46
                                    ],
                                    "name": "foo"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "FunctionExpression",
                                    "loc": {
                                        "start": {
                                            "line": 5,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 5,
                                            "column": 18
                                        }
                                    },
                                    "range": [
                                        46,
                                        60
                                    ],
                                    "id": null,
                                    "generator": false,
                                    "expression": false,
                                    "params": [
                                        {
                                            "type": "Identifier",
                                            "loc": {
                                                "start": {
                                                    "line": 5,
                                                    "column": 5
                                                },
                                                "end": {
                                                    "line": 5,
                                                    "column": 6
                                                }
                                            },
                                            "range": [
                                                47,
                                                48
                                            ],
                                            "name": "a"
                                        },
                                        {
                                            "type": "AssignmentPattern",
                                            "loc": {
                                                "start": {
                                                    "line": 5,
                                                    "column": 8
                                                },
                                                "end": {
                                                    "line": 5,
                                                    "column": 14
                                                }
                                            },
                                            "range": [
                                                50,
                                                56
                                            ],
                                            "left": {
                                                "type": "Identifier",
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 8
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 9
                                                    }
                                                },
                                                "range": [
                                                    50,
                                                    51
                                                ],
                                                "name": "b"
                                            },
                                            "right": {
                                                "type": "Literal",
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 12
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 14
                                                    }
                                                },
                                                "range": [
                                                    54,
                                                    56
                                                ],
                                                "value": 10,
                                                "raw": "10"
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "loc": {
                                            "start": {
                                                "line": 5,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 5,
                                                "column": 18
                                            }
                                        },
                                        "range": [
                                            58,
                                            60
                                        ],
                                        "body": []
                                    }
                                }
                            },
                            {
                                "type": "Property",
                                "loc": {
                                    "start": {
                                        "line": 6,
                                        "column": 1
                                    },
                                    "end": {
                                        "line": 6,
                                        "column": 23
                                    }
                                },
                                "range": [
                                    63,
                                    85
                                ],
                                "method": true,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "loc": {
                                        "start": {
                                            "line": 6,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 6,
                                            "column": 6
                                        }
                                    },
                                    "range": [
                                        63,
                                        68
                                    ],
                                    "name": "toast"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "FunctionExpression",
                                    "loc": {
                                        "start": {
                                            "line": 6,
                                            "column": 6
                                        },
                                        "end": {
                                            "line": 6,
                                            "column": 23
                                        }
                                    },
                                    "range": [
                                        68,
                                        85
                                    ],
                                    "id": null,
                                    "generator": false,
                                    "expression": false,
                                    "params": [
                                        {
                                            "type": "Identifier",
                                            "loc": {
                                                "start": {
                                                    "line": 6,
                                                    "column": 7
                                                },
                                                "end": {
                                                    "line": 6,
                                                    "column": 8
                                                }
                                            },
                                            "range": [
                                                69,
                                                70
                                            ],
                                            "name": "a"
                                        },
                                        {
                                            "type": "AssignmentPattern",
                                            "loc": {
                                                "start": {
                                                    "line": 6,
                                                    "column": 10
                                                },
                                                "end": {
                                                    "line": 6,
                                                    "column": 16
                                                }
                                            },
                                            "range": [
                                                72,
                                                78
                                            ],
                                            "left": {
                                                "type": "Identifier",
                                                "loc": {
                                                    "start": {
                                                        "line": 6,
                                                        "column": 10
                                                    },
                                                    "end": {
                                                        "line": 6,
                                                        "column": 11
                                                    }
                                                },
                                                "range": [
                                                    72,
                                                    73
                                                ],
                                                "name": "b"
                                            },
                                            "right": {
                                                "type": "Literal",
                                                "loc": {
                                                    "start": {
                                                        "line": 6,
                                                        "column": 14
                                                    },
                                                    "end": {
                                                        "line": 6,
                                                        "column": 16
                                                    }
                                                },
                                                "range": [
                                                    76,
                                                    78
                                                ],
                                                "value": 10,
                                                "raw": "10"
                                            }
                                        },
                                        {
                                            "type": "Identifier",
                                            "loc": {
                                                "start": {
                                                    "line": 6,
                                                    "column": 18
                                                },
                                                "end": {
                                                    "line": 6,
                                                    "column": 19
                                                }
                                            },
                                            "range": [
                                                80,
                                                81
                                            ],
                                            "name": "c"
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "loc": {
                                            "start": {
                                                "line": 6,
                                                "column": 21
                                            },
                                            "end": {
                                                "line": 6,
                                                "column": 23
                                            }
                                        },
                                        "range": [
                                            83,
                                            85
                                        ],
                                        "body": []
                                    }
                                }
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "String",
            "value": "\"use strict\"",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 12
                }
            },
            "range": [
                0,
                12
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
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
            "type": "Keyword",
            "value": "var",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 3
                }
            },
            "range": [
                15,
                18
            ]
        },
        {
            "type": "Identifier",
            "value": "x",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 4
                },
                "end": {
                    "line": 3,
                    "column": 5
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
                    "line": 3,
                    "column": 6
                },
                "end": {
                    "line": 3,
                    "column": 7
                }
            },
            "range": [
                21,
                22
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
                23,
                24
            ]
        },
        {
            "type": "Identifier",
            "value": "baz",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 1
                },
                "end": {
                    "line": 4,
                    "column": 4
                }
            },
            "range": [
                26,
                29
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 4
                },
                "end": {
                    "line": 4,
                    "column": 5
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
                    "line": 4,
                    "column": 5
                },
                "end": {
                    "line": 4,
                    "column": 6
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
                    "line": 4,
                    "column": 7
                },
                "end": {
                    "line": 4,
                    "column": 8
                }
            },
            "range": [
                32,
                33
            ]
        },
        {
            "type": "Numeric",
            "value": "10",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 9
                },
                "end": {
                    "line": 4,
                    "column": 11
                }
            },
            "range": [
                34,
                36
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 11
                },
                "end": {
                    "line": 4,
                    "column": 12
                }
            },
            "range": [
                36,
                37
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 13
                },
                "end": {
                    "line": 4,
                    "column": 14
                }
            },
            "range": [
                38,
                39
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 14
                },
                "end": {
                    "line": 4,
                    "column": 15
                }
            },
            "range": [
                39,
                40
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 15
                },
                "end": {
                    "line": 4,
                    "column": 16
                }
            },
            "range": [
                40,
                41
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 1
                },
                "end": {
                    "line": 5,
                    "column": 4
                }
            },
            "range": [
                43,
                46
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
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
                46,
                47
            ]
        },
        {
            "type": "Identifier",
            "value": "a",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 5
                },
                "end": {
                    "line": 5,
                    "column": 6
                }
            },
            "range": [
                47,
                48
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 6
                },
                "end": {
                    "line": 5,
                    "column": 7
                }
            },
            "range": [
                48,
                49
            ]
        },
        {
            "type": "Identifier",
            "value": "b",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 8
                },
                "end": {
                    "line": 5,
                    "column": 9
                }
            },
            "range": [
                50,
                51
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 10
                },
                "end": {
                    "line": 5,
                    "column": 11
                }
            },
            "range": [
                52,
                53
            ]
        },
        {
            "type": "Numeric",
            "value": "10",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 12
                },
                "end": {
                    "line": 5,
                    "column": 14
                }
            },
            "range": [
                54,
                56
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 14
                },
                "end": {
                    "line": 5,
                    "column": 15
                }
            },
            "range": [
                56,
                57
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 16
                },
                "end": {
                    "line": 5,
                    "column": 17
                }
            },
            "range": [
                58,
                59
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 17
                },
                "end": {
                    "line": 5,
                    "column": 18
                }
            },
            "range": [
                59,
                60
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 18
                },
                "end": {
                    "line": 5,
                    "column": 19
                }
            },
            "range": [
                60,
                61
            ]
        },
        {
            "type": "Identifier",
            "value": "toast",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 1
                },
                "end": {
                    "line": 6,
                    "column": 6
                }
            },
            "range": [
                63,
                68
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 6
                },
                "end": {
                    "line": 6,
                    "column": 7
                }
            },
            "range": [
                68,
                69
            ]
        },
        {
            "type": "Identifier",
            "value": "a",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 7
                },
                "end": {
                    "line": 6,
                    "column": 8
                }
            },
            "range": [
                69,
                70
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 8
                },
                "end": {
                    "line": 6,
                    "column": 9
                }
            },
            "range": [
                70,
                71
            ]
        },
        {
            "type": "Identifier",
            "value": "b",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 10
                },
                "end": {
                    "line": 6,
                    "column": 11
                }
            },
            "range": [
                72,
                73
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 12
                },
                "end": {
                    "line": 6,
                    "column": 13
                }
            },
            "range": [
                74,
                75
            ]
        },
        {
            "type": "Numeric",
            "value": "10",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 14
                },
                "end": {
                    "line": 6,
                    "column": 16
                }
            },
            "range": [
                76,
                78
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 16
                },
                "end": {
                    "line": 6,
                    "column": 17
                }
            },
            "range": [
                78,
                79
            ]
        },
        {
            "type": "Identifier",
            "value": "c",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 18
                },
                "end": {
                    "line": 6,
                    "column": 19
                }
            },
            "range": [
                80,
                81
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 19
                },
                "end": {
                    "line": 6,
                    "column": 20
                }
            },
            "range": [
                81,
                82
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 21
                },
                "end": {
                    "line": 6,
                    "column": 22
                }
            },
            "range": [
                83,
                84
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 22
                },
                "end": {
                    "line": 6,
                    "column": 23
                }
            },
            "range": [
                84,
                85
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 0
                },
                "end": {
                    "line": 7,
                    "column": 1
                }
            },
            "range": [
                86,
                87
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 1
                },
                "end": {
                    "line": 7,
                    "column": 2
                }
            },
            "range": [
                87,
                88
            ]
        }
    ]
};
