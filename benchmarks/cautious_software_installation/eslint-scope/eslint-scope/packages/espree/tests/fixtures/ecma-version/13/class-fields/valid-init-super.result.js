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
        126
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
                126
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
                        "line": 4,
                        "column": 1
                    }
                },
                "range": [
                    8,
                    126
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
                                "line": 3,
                                "column": 24
                            }
                        },
                        "range": [
                            104,
                            124
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
                                104,
                                107
                            ],
                            "name": "aaa"
                        },
                        "value": {
                            "type": "MemberExpression",
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 10
                                },
                                "end": {
                                    "line": 3,
                                    "column": 24
                                }
                            },
                            "range": [
                                110,
                                124
                            ],
                            "object": {
                                "type": "Super",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 15
                                    }
                                },
                                "range": [
                                    110,
                                    115
                                ]
                            },
                            "property": {
                                "type": "Identifier",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 24
                                    }
                                },
                                "range": [
                                    116,
                                    124
                                ],
                                "name": "toString"
                            },
                            "computed": false,
                            "optional": false
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
                104,
                107
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
                108,
                109
            ]
        },
        {
            "type": "Keyword",
            "value": "super",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 10
                },
                "end": {
                    "line": 3,
                    "column": 15
                }
            },
            "range": [
                110,
                115
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 15
                },
                "end": {
                    "line": 3,
                    "column": 16
                }
            },
            "range": [
                115,
                116
            ]
        },
        {
            "type": "Identifier",
            "value": "toString",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 16
                },
                "end": {
                    "line": 3,
                    "column": 24
                }
            },
            "range": [
                116,
                124
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
                125,
                126
            ]
        }
    ]
};