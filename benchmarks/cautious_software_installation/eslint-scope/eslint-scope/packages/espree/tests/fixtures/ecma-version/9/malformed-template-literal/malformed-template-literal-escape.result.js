export default {
    "type": "Program",
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
            "expression": {
                "type": "TaggedTemplateExpression",
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
                "tag": {
                    "type": "Identifier",
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
                    ],
                    "name": "foo"
                },
                "quasi": {
                    "type": "TemplateLiteral",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 3
                        },
                        "end": {
                            "line": 1,
                            "column": 13
                        }
                    },
                    "range": [
                        3,
                        13
                    ],
                    "expressions": [],
                    "quasis": [
                        {
                            "type": "TemplateElement",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 3
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            },
                            "range": [
                                3,
                                13
                            ],
                            "value": {
                                "raw": "\\unicode",
                                "cooked": null
                            },
                            "tail": true
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "Identifier",
            "value": "foo",
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
            "type": "Template",
            "value": "`\\unicode`",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 3
                },
                "end": {
                    "line": 1,
                    "column": 13
                }
            },
            "range": [
                3,
                13
            ]
        }
    ]
};