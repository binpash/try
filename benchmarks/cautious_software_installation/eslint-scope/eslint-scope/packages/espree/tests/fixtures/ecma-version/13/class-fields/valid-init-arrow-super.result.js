export default {
    "type": "Program",
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
        49
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
                    "line": 3,
                    "column": 1
                }
            },
            "range": [
                0,
                49
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
                        "line": 3,
                        "column": 1
                    }
                },
                "range": [
                    8,
                    49
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
                                "column": 37
                            }
                        },
                        "range": [
                            14,
                            47
                        ],
                        "static": false,
                        "computed": false,
                        "key": {
                            "type": "Identifier",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 4
                                },
                                "end": {
                                    "line": 2,
                                    "column": 12
                                }
                            },
                            "range": [
                                14,
                                22
                            ],
                            "name": "toString"
                        },
                        "value": {
                            "type": "ArrowFunctionExpression",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 15
                                },
                                "end": {
                                    "line": 2,
                                    "column": 37
                                }
                            },
                            "range": [
                                25,
                                47
                            ],
                            "id": null,
                            "expression": true,
                            "generator": false,
                            "async": false,
                            "params": [],
                            "body": {
                                "type": "CallExpression",
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 21
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 37
                                    }
                                },
                                "range": [
                                    31,
                                    47
                                ],
                                "callee": {
                                    "type": "MemberExpression",
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 21
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 35
                                        }
                                    },
                                    "range": [
                                        31,
                                        45
                                    ],
                                    "object": {
                                        "type": "Super",
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 21
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 26
                                            }
                                        },
                                        "range": [
                                            31,
                                            36
                                        ]
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 27
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 35
                                            }
                                        },
                                        "range": [
                                            37,
                                            45
                                        ],
                                        "name": "toString"
                                    },
                                    "computed": false,
                                    "optional": false
                                },
                                "arguments": [],
                                "optional": false
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
            "type": "Identifier",
            "value": "toString",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 4
                },
                "end": {
                    "line": 2,
                    "column": 12
                }
            },
            "range": [
                14,
                22
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 13
                },
                "end": {
                    "line": 2,
                    "column": 14
                }
            },
            "range": [
                23,
                24
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
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
                25,
                26
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
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
                26,
                27
            ]
        },
        {
            "type": "Punctuator",
            "value": "=>",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 18
                },
                "end": {
                    "line": 2,
                    "column": 20
                }
            },
            "range": [
                28,
                30
            ]
        },
        {
            "type": "Keyword",
            "value": "super",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 21
                },
                "end": {
                    "line": 2,
                    "column": 26
                }
            },
            "range": [
                31,
                36
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 26
                },
                "end": {
                    "line": 2,
                    "column": 27
                }
            },
            "range": [
                36,
                37
            ]
        },
        {
            "type": "Identifier",
            "value": "toString",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 27
                },
                "end": {
                    "line": 2,
                    "column": 35
                }
            },
            "range": [
                37,
                45
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 35
                },
                "end": {
                    "line": 2,
                    "column": 36
                }
            },
            "range": [
                45,
                46
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 36
                },
                "end": {
                    "line": 2,
                    "column": 37
                }
            },
            "range": [
                46,
                47
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
                48,
                49
            ]
        }
    ]
};