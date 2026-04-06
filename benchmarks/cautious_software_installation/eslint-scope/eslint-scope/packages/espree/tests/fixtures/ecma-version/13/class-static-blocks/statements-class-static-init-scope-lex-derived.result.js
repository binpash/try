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
        631,
        713
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
                631,
                641
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
                        635,
                        640
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
                            635,
                            640
                        ],
                        "name": "probe"
                    },
                    "init": null
                }
            ],
            "kind": "let"
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
                643,
                684
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
                    649,
                    650
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
                    651,
                    684
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
                            655,
                            682
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
                                        "column": 14
                                    }
                                },
                                "range": [
                                    668,
                                    678
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
                                            "column": 13
                                        }
                                    },
                                    "range": [
                                        668,
                                        677
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
                                            668,
                                            673
                                        ],
                                        "name": "probe"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "loc": {
                                            "start": {
                                                "line": 19,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 19,
                                                "column": 13
                                            }
                                        },
                                        "range": [
                                            676,
                                            677
                                        ],
                                        "name": "C"
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
                686,
                713
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
                    686,
                    712
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
                        686,
                        702
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
                            686,
                            692
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
                            693,
                            702
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
                            703,
                            708
                        ],
                        "name": "probe"
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
                            710,
                            711
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
            "value": "let",
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
                631,
                634
            ]
        },
        {
            "type": "Identifier",
            "value": "probe",
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
                635,
                640
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
                640,
                641
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
                643,
                648
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
                649,
                650
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
                651,
                652
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
                655,
                661
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
                662,
                663
            ]
        },
        {
            "type": "Identifier",
            "value": "probe",
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
                668,
                673
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
                674,
                675
            ]
        },
        {
            "type": "Identifier",
            "value": "C",
            "loc": {
                "start": {
                    "line": 19,
                    "column": 12
                },
                "end": {
                    "line": 19,
                    "column": 13
                }
            },
            "range": [
                676,
                677
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 19,
                    "column": 13
                },
                "end": {
                    "line": 19,
                    "column": 14
                }
            },
            "range": [
                677,
                678
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
                681,
                682
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
                683,
                684
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
                686,
                692
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
                692,
                693
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
                693,
                702
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
                702,
                703
            ]
        },
        {
            "type": "Identifier",
            "value": "probe",
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
                703,
                708
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
                708,
                709
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
                710,
                711
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
                711,
                712
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
                712,
                713
            ]
        }
    ]
};