import conditionalRegex from "../../../../util/conditional-regex-value.js";

export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 5,
            "column": 2
        }
    },
    "range": [
        0,
        110
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
                    "line": 5,
                    "column": 2
                }
            },
            "range": [
                0,
                110
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
                            "line": 5,
                            "column": 1
                        }
                    },
                    "range": [
                        6,
                        109
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
                                "line": 5,
                                "column": 1
                            }
                        },
                        "range": [
                            13,
                            109
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
                                        "column": 21
                                    }
                                },
                                "range": [
                                    19,
                                    36
                                ],
                                "value": null,
                                "raw": "/(?<x>a)|(?<x>b)/",
                                "regex": {
                                    "pattern": "(?<x>a)|(?<x>b)",
                                    "flags": ""
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
                                        "column": 31
                                    }
                                },
                                "range": [
                                    42,
                                    69
                                ],
                                "value": null,
                                "raw": "/(?:(?<x>a)|(?<x>b))\\\\k<x>/",
                                "regex": {
                                    "pattern": "(?:(?<x>a)|(?<x>b))\\\\k<x>",
                                    "flags": ""
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
                                        "column": 35
                                    }
                                },
                                "range": [
                                    75,
                                    106
                                ],
                                "value": null,
                                "raw": "/(?<y>a)(?<x>a)|(?<x>b)(?<y>b)/",
                                "regex": {
                                    "pattern": "(?<y>a)(?<x>a)|(?<x>b)(?<y>b)",
                                    "flags": ""
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
            "value": "/(?<x>a)|(?<x>b)/",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 4
                },
                "end": {
                    "line": 2,
                    "column": 21
                }
            },
            "range": [
                19,
                36
            ],
            "regex": {
                "flags": "",
                "pattern": "(?<x>a)|(?<x>b)"
            }
        },
        {
            "type": "Punctuator",
            "value": ",",
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
                36,
                37
            ]
        },
        {
            "type": "RegularExpression",
            "value": "/(?:(?<x>a)|(?<x>b))\\\\k<x>/",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 4
                },
                "end": {
                    "line": 3,
                    "column": 31
                }
            },
            "range": [
                42,
                69
            ],
            "regex": {
                "flags": "",
                "pattern": "(?:(?<x>a)|(?<x>b))\\\\k<x>"
            }
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 31
                },
                "end": {
                    "line": 3,
                    "column": 32
                }
            },
            "range": [
                69,
                70
            ]
        },
        {
            "type": "RegularExpression",
            "value": "/(?<y>a)(?<x>a)|(?<x>b)(?<y>b)/",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 4
                },
                "end": {
                    "line": 4,
                    "column": 35
                }
            },
            "range": [
                75,
                106
            ],
            "regex": {
                "flags": "",
                "pattern": "(?<y>a)(?<x>a)|(?<x>b)(?<y>b)"
            }
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 35
                },
                "end": {
                    "line": 4,
                    "column": 36
                }
            },
            "range": [
                106,
                107
            ]
        },
        {
            "type": "Punctuator",
            "value": "]",
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
                108,
                109
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 1
                },
                "end": {
                    "line": 5,
                    "column": 2
                }
            },
            "range": [
                109,
                110
            ]
        }
    ]
};