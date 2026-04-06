export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 15,
            "column": 0
        },
        "end": {
            "line": 27,
            "column": 39
        }
    },
    "range": [
        631,
        808
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
                    "column": 28
                }
            },
            "range": [
                631,
                659
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
                            "column": 27
                        }
                    },
                    "range": [
                        635,
                        658
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
                                "column": 11
                            }
                        },
                        "range": [
                            635,
                            642
                        ],
                        "name": "test262"
                    },
                    "init": {
                        "type": "Literal",
                        "loc": {
                            "start": {
                                "line": 15,
                                "column": 14
                            },
                            "end": {
                                "line": 15,
                                "column": 27
                            }
                        },
                        "range": [
                            645,
                            658
                        ],
                        "value": "outer scope",
                        "raw": "'outer scope'"
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "loc": {
                "start": {
                    "line": 16,
                    "column": 0
                },
                "end": {
                    "line": 16,
                    "column": 10
                }
            },
            "range": [
                660,
                670
            ],
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "loc": {
                        "start": {
                            "line": 16,
                            "column": 4
                        },
                        "end": {
                            "line": 16,
                            "column": 9
                        }
                    },
                    "range": [
                        664,
                        669
                    ],
                    "id": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 16,
                                "column": 4
                            },
                            "end": {
                                "line": 16,
                                "column": 9
                            }
                        },
                        "range": [
                            664,
                            669
                        ],
                        "name": "probe"
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
                    "line": 18,
                    "column": 0
                },
                "end": {
                    "line": 25,
                    "column": 1
                }
            },
            "range": [
                672,
                767
            ],
            "id": {
                "type": "Identifier",
                "loc": {
                    "start": {
                        "line": 18,
                        "column": 6
                    },
                    "end": {
                        "line": 18,
                        "column": 7
                    }
                },
                "range": [
                    678,
                    679
                ],
                "name": "C"
            },
            "superClass": null,
            "body": {
                "type": "ClassBody",
                "loc": {
                    "start": {
                        "line": 18,
                        "column": 8
                    },
                    "end": {
                        "line": 25,
                        "column": 1
                    }
                },
                "range": [
                    680,
                    767
                ],
                "body": [
                    {
                        "type": "StaticBlock",
                        "loc": {
                            "start": {
                                "line": 19,
                                "column": 2
                            },
                            "end": {
                                "line": 21,
                                "column": 3
                            }
                        },
                        "range": [
                            684,
                            729
                        ],
                        "body": [
                            {
                                "type": "VariableDeclaration",
                                "loc": {
                                    "start": {
                                        "line": 20,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 20,
                                        "column": 32
                                    }
                                },
                                "range": [
                                    697,
                                    725
                                ],
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "loc": {
                                            "start": {
                                                "line": 20,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 20,
                                                "column": 31
                                            }
                                        },
                                        "range": [
                                            701,
                                            724
                                        ],
                                        "id": {
                                            "type": "Identifier",
                                            "loc": {
                                                "start": {
                                                    "line": 20,
                                                    "column": 8
                                                },
                                                "end": {
                                                    "line": 20,
                                                    "column": 15
                                                }
                                            },
                                            "range": [
                                                701,
                                                708
                                            ],
                                            "name": "test262"
                                        },
                                        "init": {
                                            "type": "Literal",
                                            "loc": {
                                                "start": {
                                                    "line": 20,
                                                    "column": 18
                                                },
                                                "end": {
                                                    "line": 20,
                                                    "column": 31
                                                }
                                            },
                                            "range": [
                                                711,
                                                724
                                            ],
                                            "value": "first block",
                                            "raw": "'first block'"
                                        }
                                    }
                                ],
                                "kind": "let"
                            }
                        ]
                    },
                    {
                        "type": "StaticBlock",
                        "loc": {
                            "start": {
                                "line": 22,
                                "column": 2
                            },
                            "end": {
                                "line": 24,
                                "column": 3
                            }
                        },
                        "range": [
                            732,
                            765
                        ],
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "loc": {
                                    "start": {
                                        "line": 23,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 23,
                                        "column": 20
                                    }
                                },
                                "range": [
                                    745,
                                    761
                                ],
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "loc": {
                                        "start": {
                                            "line": 23,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 23,
                                            "column": 19
                                        }
                                    },
                                    "range": [
                                        745,
                                        760
                                    ],
                                    "operator": "=",
                                    "left": {
                                        "type": "Identifier",
                                        "loc": {
                                            "start": {
                                                "line": 23,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 23,
                                                "column": 9
                                            }
                                        },
                                        "range": [
                                            745,
                                            750
                                        ],
                                        "name": "probe"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "loc": {
                                            "start": {
                                                "line": 23,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 23,
                                                "column": 19
                                            }
                                        },
                                        "range": [
                                            753,
                                            760
                                        ],
                                        "name": "test262"
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
                    "line": 27,
                    "column": 0
                },
                "end": {
                    "line": 27,
                    "column": 39
                }
            },
            "range": [
                769,
                808
            ],
            "expression": {
                "type": "CallExpression",
                "loc": {
                    "start": {
                        "line": 27,
                        "column": 0
                    },
                    "end": {
                        "line": 27,
                        "column": 38
                    }
                },
                "range": [
                    769,
                    807
                ],
                "callee": {
                    "type": "MemberExpression",
                    "loc": {
                        "start": {
                            "line": 27,
                            "column": 0
                        },
                        "end": {
                            "line": 27,
                            "column": 16
                        }
                    },
                    "range": [
                        769,
                        785
                    ],
                    "object": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 27,
                                "column": 0
                            },
                            "end": {
                                "line": 27,
                                "column": 6
                            }
                        },
                        "range": [
                            769,
                            775
                        ],
                        "name": "assert"
                    },
                    "property": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 27,
                                "column": 7
                            },
                            "end": {
                                "line": 27,
                                "column": 16
                            }
                        },
                        "range": [
                            776,
                            785
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
                                "line": 27,
                                "column": 17
                            },
                            "end": {
                                "line": 27,
                                "column": 22
                            }
                        },
                        "range": [
                            786,
                            791
                        ],
                        "name": "probe"
                    },
                    {
                        "type": "Literal",
                        "loc": {
                            "start": {
                                "line": 27,
                                "column": 24
                            },
                            "end": {
                                "line": 27,
                                "column": 37
                            }
                        },
                        "range": [
                            793,
                            806
                        ],
                        "value": "outer scope",
                        "raw": "'outer scope'"
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
                631,
                634
            ]
        },
        {
            "type": "Identifier",
            "value": "test262",
            "loc": {
                "start": {
                    "line": 15,
                    "column": 4
                },
                "end": {
                    "line": 15,
                    "column": 11
                }
            },
            "range": [
                635,
                642
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 15,
                    "column": 12
                },
                "end": {
                    "line": 15,
                    "column": 13
                }
            },
            "range": [
                643,
                644
            ]
        },
        {
            "type": "String",
            "value": "'outer scope'",
            "loc": {
                "start": {
                    "line": 15,
                    "column": 14
                },
                "end": {
                    "line": 15,
                    "column": 27
                }
            },
            "range": [
                645,
                658
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 15,
                    "column": 27
                },
                "end": {
                    "line": 15,
                    "column": 28
                }
            },
            "range": [
                658,
                659
            ]
        },
        {
            "type": "Keyword",
            "value": "var",
            "loc": {
                "start": {
                    "line": 16,
                    "column": 0
                },
                "end": {
                    "line": 16,
                    "column": 3
                }
            },
            "range": [
                660,
                663
            ]
        },
        {
            "type": "Identifier",
            "value": "probe",
            "loc": {
                "start": {
                    "line": 16,
                    "column": 4
                },
                "end": {
                    "line": 16,
                    "column": 9
                }
            },
            "range": [
                664,
                669
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 16,
                    "column": 9
                },
                "end": {
                    "line": 16,
                    "column": 10
                }
            },
            "range": [
                669,
                670
            ]
        },
        {
            "type": "Keyword",
            "value": "class",
            "loc": {
                "start": {
                    "line": 18,
                    "column": 0
                },
                "end": {
                    "line": 18,
                    "column": 5
                }
            },
            "range": [
                672,
                677
            ]
        },
        {
            "type": "Identifier",
            "value": "C",
            "loc": {
                "start": {
                    "line": 18,
                    "column": 6
                },
                "end": {
                    "line": 18,
                    "column": 7
                }
            },
            "range": [
                678,
                679
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 18,
                    "column": 8
                },
                "end": {
                    "line": 18,
                    "column": 9
                }
            },
            "range": [
                680,
                681
            ]
        },
        {
            "type": "Keyword",
            "value": "static",
            "loc": {
                "start": {
                    "line": 19,
                    "column": 2
                },
                "end": {
                    "line": 19,
                    "column": 8
                }
            },
            "range": [
                684,
                690
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 19,
                    "column": 9
                },
                "end": {
                    "line": 19,
                    "column": 10
                }
            },
            "range": [
                691,
                692
            ]
        },
        {
            "type": "Keyword",
            "value": "let",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 4
                },
                "end": {
                    "line": 20,
                    "column": 7
                }
            },
            "range": [
                697,
                700
            ]
        },
        {
            "type": "Identifier",
            "value": "test262",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 8
                },
                "end": {
                    "line": 20,
                    "column": 15
                }
            },
            "range": [
                701,
                708
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 16
                },
                "end": {
                    "line": 20,
                    "column": 17
                }
            },
            "range": [
                709,
                710
            ]
        },
        {
            "type": "String",
            "value": "'first block'",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 18
                },
                "end": {
                    "line": 20,
                    "column": 31
                }
            },
            "range": [
                711,
                724
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 31
                },
                "end": {
                    "line": 20,
                    "column": 32
                }
            },
            "range": [
                724,
                725
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 21,
                    "column": 2
                },
                "end": {
                    "line": 21,
                    "column": 3
                }
            },
            "range": [
                728,
                729
            ]
        },
        {
            "type": "Keyword",
            "value": "static",
            "loc": {
                "start": {
                    "line": 22,
                    "column": 2
                },
                "end": {
                    "line": 22,
                    "column": 8
                }
            },
            "range": [
                732,
                738
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 22,
                    "column": 9
                },
                "end": {
                    "line": 22,
                    "column": 10
                }
            },
            "range": [
                739,
                740
            ]
        },
        {
            "type": "Identifier",
            "value": "probe",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 4
                },
                "end": {
                    "line": 23,
                    "column": 9
                }
            },
            "range": [
                745,
                750
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 10
                },
                "end": {
                    "line": 23,
                    "column": 11
                }
            },
            "range": [
                751,
                752
            ]
        },
        {
            "type": "Identifier",
            "value": "test262",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 12
                },
                "end": {
                    "line": 23,
                    "column": 19
                }
            },
            "range": [
                753,
                760
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 19
                },
                "end": {
                    "line": 23,
                    "column": 20
                }
            },
            "range": [
                760,
                761
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 24,
                    "column": 2
                },
                "end": {
                    "line": 24,
                    "column": 3
                }
            },
            "range": [
                764,
                765
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 25,
                    "column": 0
                },
                "end": {
                    "line": 25,
                    "column": 1
                }
            },
            "range": [
                766,
                767
            ]
        },
        {
            "type": "Identifier",
            "value": "assert",
            "loc": {
                "start": {
                    "line": 27,
                    "column": 0
                },
                "end": {
                    "line": 27,
                    "column": 6
                }
            },
            "range": [
                769,
                775
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 27,
                    "column": 6
                },
                "end": {
                    "line": 27,
                    "column": 7
                }
            },
            "range": [
                775,
                776
            ]
        },
        {
            "type": "Identifier",
            "value": "sameValue",
            "loc": {
                "start": {
                    "line": 27,
                    "column": 7
                },
                "end": {
                    "line": 27,
                    "column": 16
                }
            },
            "range": [
                776,
                785
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 27,
                    "column": 16
                },
                "end": {
                    "line": 27,
                    "column": 17
                }
            },
            "range": [
                785,
                786
            ]
        },
        {
            "type": "Identifier",
            "value": "probe",
            "loc": {
                "start": {
                    "line": 27,
                    "column": 17
                },
                "end": {
                    "line": 27,
                    "column": 22
                }
            },
            "range": [
                786,
                791
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 27,
                    "column": 22
                },
                "end": {
                    "line": 27,
                    "column": 23
                }
            },
            "range": [
                791,
                792
            ]
        },
        {
            "type": "String",
            "value": "'outer scope'",
            "loc": {
                "start": {
                    "line": 27,
                    "column": 24
                },
                "end": {
                    "line": 27,
                    "column": 37
                }
            },
            "range": [
                793,
                806
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 27,
                    "column": 37
                },
                "end": {
                    "line": 27,
                    "column": 38
                }
            },
            "range": [
                806,
                807
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 27,
                    "column": 38
                },
                "end": {
                    "line": 27,
                    "column": 39
                }
            },
            "range": [
                807,
                808
            ]
        }
    ]
};