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
        43
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
                    "line": 3,
                    "column": 1
                }
            },
            "range": [
                0,
                43
            ],
            "id": {
                "type": "Identifier",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 10
                    },
                    "end": {
                        "line": 1,
                        "column": 13
                    }
                },
                "range": [
                    10,
                    13
                ],
                "name": "foo"
            },
            "expression": false,
            "generator": true,
            "params": [],
            "body": {
                "type": "BlockStatement",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 16
                    },
                    "end": {
                        "line": 3,
                        "column": 1
                    }
                },
                "range": [
                    16,
                    43
                ],
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 2
                            },
                            "end": {
                                "line": 2,
                                "column": 23
                            }
                        },
                        "range": [
                            20,
                            41
                        ],
                        "expression": {
                            "type": "YieldExpression",
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 2
                                },
                                "end": {
                                    "line": 2,
                                    "column": 22
                                }
                            },
                            "range": [
                                20,
                                40
                            ],
                            "delegate": false,
                            "argument": {
                                "type": "JSXElement",
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 22
                                    }
                                },
                                "range": [
                                    26,
                                    40
                                ],
                                "openingElement": {
                                    "type": "JSXOpeningElement",
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 13
                                        }
                                    },
                                    "range": [
                                        26,
                                        31
                                    ],
                                    "attributes": [],
                                    "name": {
                                        "type": "JSXIdentifier",
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
                                            27,
                                            30
                                        ],
                                        "name": "div"
                                    },
                                    "selfClosing": false
                                },
                                "closingElement": {
                                    "type": "JSXClosingElement",
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 22
                                        }
                                    },
                                    "range": [
                                        34,
                                        40
                                    ],
                                    "name": {
                                        "type": "JSXIdentifier",
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 21
                                            }
                                        },
                                        "range": [
                                            36,
                                            39
                                        ],
                                        "name": "div"
                                    }
                                },
                                "children": [
                                    {
                                        "type": "JSXText",
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 16
                                            }
                                        },
                                        "range": [
                                            31,
                                            34
                                        ],
                                        "value": "bar",
                                        "raw": "bar"
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
            "value": "function",
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
            ]
        },
        {
            "type": "Punctuator",
            "value": "*",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 9
                },
                "end": {
                    "line": 1,
                    "column": 10
                }
            },
            "range": [
                9,
                10
            ]
        },
        {
            "type": "Identifier",
            "value": "foo",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 10
                },
                "end": {
                    "line": 1,
                    "column": 13
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
            "value": ")",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 14
                },
                "end": {
                    "line": 1,
                    "column": 15
                }
            },
            "range": [
                14,
                15
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 16
                },
                "end": {
                    "line": 1,
                    "column": 17
                }
            },
            "range": [
                16,
                17
            ]
        },
        {
            "type": "Keyword",
            "value": "yield",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 2
                },
                "end": {
                    "line": 2,
                    "column": 7
                }
            },
            "range": [
                20,
                25
            ]
        },
        {
            "type": "Punctuator",
            "value": "<",
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
                26,
                27
            ]
        },
        {
            "type": "JSXIdentifier",
            "value": "div",
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
                27,
                30
            ]
        },
        {
            "type": "Punctuator",
            "value": ">",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 12
                },
                "end": {
                    "line": 2,
                    "column": 13
                }
            },
            "range": [
                30,
                31
            ]
        },
        {
            "type": "JSXText",
            "value": "bar",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 13
                },
                "end": {
                    "line": 2,
                    "column": 16
                }
            },
            "range": [
                31,
                34
            ]
        },
        {
            "type": "Punctuator",
            "value": "<",
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
                34,
                35
            ]
        },
        {
            "type": "Punctuator",
            "value": "/",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 17
                },
                "end": {
                    "line": 2,
                    "column": 18
                }
            },
            "range": [
                35,
                36
            ]
        },
        {
            "type": "JSXIdentifier",
            "value": "div",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 18
                },
                "end": {
                    "line": 2,
                    "column": 21
                }
            },
            "range": [
                36,
                39
            ]
        },
        {
            "type": "Punctuator",
            "value": ">",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 21
                },
                "end": {
                    "line": 2,
                    "column": 22
                }
            },
            "range": [
                39,
                40
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
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
                40,
                41
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
                42,
                43
            ]
        }
    ]
}