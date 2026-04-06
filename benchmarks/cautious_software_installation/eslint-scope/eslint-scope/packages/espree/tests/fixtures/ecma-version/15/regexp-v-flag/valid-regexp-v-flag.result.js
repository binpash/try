import conditionalRegex from "../../../../util/conditional-regex-value.js";

export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 6,
            "column": 2
        }
    },
    "range": [
        0,
        99
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
                    "line": 6,
                    "column": 2
                }
            },
            "range": [
                0,
                99
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
                            "line": 6,
                            "column": 1
                        }
                    },
                    "range": [
                        6,
                        98
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
                                "column": 10
                            }
                        },
                        "range": [
                            6,
                            10
                        ],
                        "name": "list"
                    },
                    "init": {
                        "type": "ArrayExpression",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 6,
                                "column": 1
                            }
                        },
                        "range": [
                            13,
                            98
                        ],
                        "elements": [
                            conditionalRegex({
                                "type": "Literal",
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 13
                                    }
                                },
                                "range": [
                                    19,
                                    28
                                ],
                                "value": null,
                                "raw": "/[A&&B]/v",
                                "regex": {
                                    "pattern": "[A&&B]",
                                    "flags": "v"
                                }
                            }),
                            conditionalRegex({
                                "type": "Literal",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 13
                                    }
                                },
                                "range": [
                                    34,
                                    43
                                ],
                                "value": null,
                                "raw": "/[A--B]/v",
                                "regex": {
                                    "pattern": "[A--B]",
                                    "flags": "v"
                                }
                            }),
                            conditionalRegex({
                                "type": "Literal",
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 26
                                    }
                                },
                                "range": [
                                    49,
                                    71
                                ],
                                "value": null,
                                "raw": "/[\\q{abc|d}&&[A--B]]/v",
                                "regex": {
                                    "pattern": "[\\q{abc|d}&&[A--B]]",
                                    "flags": "v"
                                }
                            }),
                            conditionalRegex({
                                "type": "Literal",
                                "loc": {
                                    "start": {
                                        "line": 5,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 22
                                    }
                                },
                                "range": [
                                    77,
                                    95
                                ],
                                "value": null,
                                "raw": "/\\p{Basic_Emoji}/v",
                                "regex": {
                                    "pattern": "\\p{Basic_Emoji}",
                                    "flags": "v"
                                }
                            })
                        ]
                    }
                }
            ],
            "kind": "const"
        }
    ],
    "sourceType": "script",
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
            "value": "list",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 6
                },
                "end": {
                    "line": 1,
                    "column": 10
                }
            },
            "range": [
                6,
                10
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
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
            "type": "Punctuator",
            "value": "[",
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
            "type": "RegularExpression",
            "value": "/[A&&B]/v",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 4
                },
                "end": {
                    "line": 2,
                    "column": 13
                }
            },
            "range": [
                19,
                28
            ],
            "regex": {
                "flags": "v",
                "pattern": "[A&&B]"
            }
        },
        {
            "type": "Punctuator",
            "value": ",",
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
                28,
                29
            ]
        },
        {
            "type": "RegularExpression",
            "value": "/[A--B]/v",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 4
                },
                "end": {
                    "line": 3,
                    "column": 13
                }
            },
            "range": [
                34,
                43
            ],
            "regex": {
                "flags": "v",
                "pattern": "[A--B]"
            }
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 13
                },
                "end": {
                    "line": 3,
                    "column": 14
                }
            },
            "range": [
                43,
                44
            ]
        },
        {
            "type": "RegularExpression",
            "value": "/[\\q{abc|d}&&[A--B]]/v",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 4
                },
                "end": {
                    "line": 4,
                    "column": 26
                }
            },
            "range": [
                49,
                71
            ],
            "regex": {
                "flags": "v",
                "pattern": "[\\q{abc|d}&&[A--B]]"
            }
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 26
                },
                "end": {
                    "line": 4,
                    "column": 27
                }
            },
            "range": [
                71,
                72
            ]
        },
        {
            "type": "RegularExpression",
            "value": "/\\p{Basic_Emoji}/v",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 4
                },
                "end": {
                    "line": 5,
                    "column": 22
                }
            },
            "range": [
                77,
                95
            ],
            "regex": {
                "flags": "v",
                "pattern": "\\p{Basic_Emoji}"
            }
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 22
                },
                "end": {
                    "line": 5,
                    "column": 23
                }
            },
            "range": [
                95,
                96
            ]
        },
        {
            "type": "Punctuator",
            "value": "]",
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
                97,
                98
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 1
                },
                "end": {
                    "line": 6,
                    "column": 2
                }
            },
            "range": [
                98,
                99
            ]
        }
    ]
};
