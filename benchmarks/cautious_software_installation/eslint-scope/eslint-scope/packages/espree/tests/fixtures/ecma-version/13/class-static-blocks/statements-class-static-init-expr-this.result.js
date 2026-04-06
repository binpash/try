export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 15,
            "column": 0
        },
        "end": {
            "line": 23,
            "column": 27
        }
    },
    "range": [
        521,
        606
    ],
    "body": [
        {
            "type": "VariableDeclaration",
            "loc": {
                "start": {
                    "line": 15,
                    "column": 0
                },
                "end": {
                    "line": 15,
                    "column": 10
                }
            },
            "range": [
                521,
                531
            ],
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "loc": {
                        "start": {
                            "line": 15,
                            "column": 4
                        },
                        "end": {
                            "line": 15,
                            "column": 9
                        }
                    },
                    "range": [
                        525,
                        530
                    ],
                    "id": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 15,
                                "column": 4
                            },
                            "end": {
                                "line": 15,
                                "column": 9
                            }
                        },
                        "range": [
                            525,
                            530
                        ],
                        "name": "value"
                    },
                    "init": null
                }
            ],
            "kind": "var"
        },
        {
            "type": "ClassDeclaration",
            "loc": {
                "start": {
                    "line": 17,
                    "column": 0
                },
                "end": {
                    "line": 21,
                    "column": 1
                }
            },
            "range": [
                533,
                577
            ],
            "id": {
                "type": "Identifier",
                "loc": {
                    "start": {
                        "line": 17,
                        "column": 6
                    },
                    "end": {
                        "line": 17,
                        "column": 7
                    }
                },
                "range": [
                    539,
                    540
                ],
                "name": "C"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "loc": {
                    "start": {
                        "line": 17,
                        "column": 8
                    },
                    "end": {
                        "line": 21,
                        "column": 1
                    }
                },
                "range": [
                    541,
                    577
                ],
                "body": [
                    {
                        "type": "StaticBlock",
                        "loc": {
                            "start": {
                                "line": 18,
                                "column": 2
                            },
                            "end": {
                                "line": 20,
                                "column": 3
                            }
                        },
                        "range": [
                            545,
                            575
                        ],
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "loc": {
                                    "start": {
                                        "line": 19,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 19,
                                        "column": 17
                                    }
                                },
                                "range": [
                                    558,
                                    571
                                ],
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "loc": {
                                        "start": {
                                            "line": 19,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 19,
                                            "column": 16
                                        }
                                    },
                                    "range": [
                                        558,
                                        570
                                    ],
                                    "operator": "=",
                                    "left": {
                                        "type": "Identifier",
                                        "loc": {
                                            "start": {
                                                "line": 19,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 19,
                                                "column": 9
                                            }
                                        },
                                        "range": [
                                            558,
                                            563
                                        ],
                                        "name": "value"
                                    },
                                    "right": {
                                        "type": "ThisExpression",
                                        "loc": {
                                            "start": {
                                                "line": 19,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 19,
                                                "column": 16
                                            }
                                        },
                                        "range": [
                                            566,
                                            570
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            "type": "ExpressionStatement",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 0
                },
                "end": {
                    "line": 23,
                    "column": 27
                }
            },
            "range": [
                579,
                606
            ],
            "expression": {
                "type": "CallExpression",
                "loc": {
                    "start": {
                        "line": 23,
                        "column": 0
                    },
                    "end": {
                        "line": 23,
                        "column": 26
                    }
                },
                "range": [
                    579,
                    605
                ],
                "callee": {
                    "type": "MemberExpression",
                    "loc": {
                        "start": {
                            "line": 23,
                            "column": 0
                        },
                        "end": {
                            "line": 23,
                            "column": 16
                        }
                    },
                    "range": [
                        579,
                        595
                    ],
                    "object": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 23,
                                "column": 0
                            },
                            "end": {
                                "line": 23,
                                "column": 6
                            }
                        },
                        "range": [
                            579,
                            585
                        ],
                        "name": "assert"
                    },
                    "property": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 23,
                                "column": 7
                            },
                            "end": {
                                "line": 23,
                                "column": 16
                            }
                        },
                        "range": [
                            586,
                            595
                        ],
                        "name": "sameValue"
                    },
                    "computed": false,
                    "optional": false
                },
                "arguments": [
                    {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 23,
                                "column": 17
                            },
                            "end": {
                                "line": 23,
                                "column": 22
                            }
                        },
                        "range": [
                            596,
                            601
                        ],
                        "name": "value"
                    },
                    {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 23,
                                "column": 24
                            },
                            "end": {
                                "line": 23,
                                "column": 25
                            }
                        },
                        "range": [
                            603,
                            604
                        ],
                        "name": "C"
                    }
                ],
                "optional": false
            }
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "Keyword",
            "value": "var",
            "loc": {
                "start": {
                    "line": 15,
                    "column": 0
                },
                "end": {
                    "line": 15,
                    "column": 3
                }
            },
            "range": [
                521,
                524
            ]
        },
        {
            "type": "Identifier",
            "value": "value",
            "loc": {
                "start": {
                    "line": 15,
                    "column": 4
                },
                "end": {
                    "line": 15,
                    "column": 9
                }
            },
            "range": [
                525,
                530
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 15,
                    "column": 9
                },
                "end": {
                    "line": 15,
                    "column": 10
                }
            },
            "range": [
                530,
                531
            ]
        },
        {
            "type": "Keyword",
            "value": "class",
            "loc": {
                "start": {
                    "line": 17,
                    "column": 0
                },
                "end": {
                    "line": 17,
                    "column": 5
                }
            },
            "range": [
                533,
                538
            ]
        },
        {
            "type": "Identifier",
            "value": "C",
            "loc": {
                "start": {
                    "line": 17,
                    "column": 6
                },
                "end": {
                    "line": 17,
                    "column": 7
                }
            },
            "range": [
                539,
                540
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 17,
                    "column": 8
                },
                "end": {
                    "line": 17,
                    "column": 9
                }
            },
            "range": [
                541,
                542
            ]
        },
        {
            "type": "Keyword",
            "value": "static",
            "loc": {
                "start": {
                    "line": 18,
                    "column": 2
                },
                "end": {
                    "line": 18,
                    "column": 8
                }
            },
            "range": [
                545,
                551
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 18,
                    "column": 9
                },
                "end": {
                    "line": 18,
                    "column": 10
                }
            },
            "range": [
                552,
                553
            ]
        },
        {
            "type": "Identifier",
            "value": "value",
            "loc": {
                "start": {
                    "line": 19,
                    "column": 4
                },
                "end": {
                    "line": 19,
                    "column": 9
                }
            },
            "range": [
                558,
                563
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 19,
                    "column": 10
                },
                "end": {
                    "line": 19,
                    "column": 11
                }
            },
            "range": [
                564,
                565
            ]
        },
        {
            "type": "Keyword",
            "value": "this",
            "loc": {
                "start": {
                    "line": 19,
                    "column": 12
                },
                "end": {
                    "line": 19,
                    "column": 16
                }
            },
            "range": [
                566,
                570
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 19,
                    "column": 16
                },
                "end": {
                    "line": 19,
                    "column": 17
                }
            },
            "range": [
                570,
                571
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 2
                },
                "end": {
                    "line": 20,
                    "column": 3
                }
            },
            "range": [
                574,
                575
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 21,
                    "column": 0
                },
                "end": {
                    "line": 21,
                    "column": 1
                }
            },
            "range": [
                576,
                577
            ]
        },
        {
            "type": "Identifier",
            "value": "assert",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 0
                },
                "end": {
                    "line": 23,
                    "column": 6
                }
            },
            "range": [
                579,
                585
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 6
                },
                "end": {
                    "line": 23,
                    "column": 7
                }
            },
            "range": [
                585,
                586
            ]
        },
        {
            "type": "Identifier",
            "value": "sameValue",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 7
                },
                "end": {
                    "line": 23,
                    "column": 16
                }
            },
            "range": [
                586,
                595
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 16
                },
                "end": {
                    "line": 23,
                    "column": 17
                }
            },
            "range": [
                595,
                596
            ]
        },
        {
            "type": "Identifier",
            "value": "value",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 17
                },
                "end": {
                    "line": 23,
                    "column": 22
                }
            },
            "range": [
                596,
                601
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 22
                },
                "end": {
                    "line": 23,
                    "column": 23
                }
            },
            "range": [
                601,
                602
            ]
        },
        {
            "type": "Identifier",
            "value": "C",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 24
                },
                "end": {
                    "line": 23,
                    "column": 25
                }
            },
            "range": [
                603,
                604
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 25
                },
                "end": {
                    "line": 23,
                    "column": 26
                }
            },
            "range": [
                604,
                605
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 26
                },
                "end": {
                    "line": 23,
                    "column": 27
                }
            },
            "range": [
                605,
                606
            ]
        }
    ]
};