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
        57
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
                    "line": 5,
                    "column": 1
                }
            },
            "range": [
                0,
                57
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
                        "line": 5,
                        "column": 1
                    }
                },
                "range": [
                    8,
                    57
                ],
                "body": [
                    {
                        "type": "PropertyDefinition",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 4
                            },
                            "end": {
                                "line": 4,
                                "column": 8
                            }
                        },
                        "range": [
                            39,
                            55
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
                                    "column": 7
                                }
                            },
                            "range": [
                                39,
                                42
                            ],
                            "name": "aaa"
                        },
                        "value": {
                            "type": "BinaryExpression",
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 10
                                },
                                "end": {
                                    "line": 4,
                                    "column": 8
                                }
                            },
                            "range": [
                                45,
                                55
                            ],
                            "left": {
                                "type": "Literal",
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
                                    45,
                                    46
                                ],
                                "value": 2,
                                "raw": "2"
                            },
                            "operator": "*",
                            "right": {
                                "type": "CallExpression",
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 8
                                    }
                                },
                                "range": [
                                    52,
                                    55
                                ],
                                "callee": {
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
                                        52,
                                        53
                                    ],
                                    "name": "f"
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
            "value": "aaa",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 4
                },
                "end": {
                    "line": 3,
                    "column": 7
                }
            },
            "range": [
                39,
                42
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
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
                43,
                44
            ]
        },
        {
            "type": "Numeric",
            "value": "2",
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
                45,
                46
            ]
        },
        {
            "type": "Punctuator",
            "value": "*",
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
                51,
                52
            ]
        },
        {
            "type": "Identifier",
            "value": "f",
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
                52,
                53
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 6
                },
                "end": {
                    "line": 4,
                    "column": 7
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
                    "line": 4,
                    "column": 7
                },
                "end": {
                    "line": 4,
                    "column": 8
                }
            },
            "range": [
                54,
                55
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
                56,
                57
            ]
        }
    ]
};