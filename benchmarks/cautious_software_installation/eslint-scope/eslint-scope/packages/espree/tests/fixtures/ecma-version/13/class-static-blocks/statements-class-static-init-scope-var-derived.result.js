export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 15,
            "column": 0
        },
        "end": {
            "line": 24,
            "column": 39
        }
    },
    "range": [
        630,
        759
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
                630,
                658
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
                        634,
                        657
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
                            634,
                            641
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
                            644,
                            657
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
                659,
                669
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
                        663,
                        668
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
                            663,
                            668
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
                    "line": 22,
                    "column": 1
                }
            },
            "range": [
                671,
                718
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
                    677,
                    678
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
                        "line": 22,
                        "column": 1
                    }
                },
                "range": [
                    679,
                    718
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
                            683,
                            716
                        ],
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "loc": {
                                    "start": {
                                        "line": 20,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 20,
                                        "column": 20
                                    }
                                },
                                "range": [
                                    696,
                                    712
                                ],
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "loc": {
                                        "start": {
                                            "line": 20,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 20,
                                            "column": 19
                                        }
                                    },
                                    "range": [
                                        696,
                                        711
                                    ],
                                    "operator": "=",
                                    "left": {
                                        "type": "Identifier",
                                        "loc": {
                                            "start": {
                                                "line": 20,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 20,
                                                "column": 9
                                            }
                                        },
                                        "range": [
                                            696,
                                            701
                                        ],
                                        "name": "probe"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "loc": {
                                            "start": {
                                                "line": 20,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 20,
                                                "column": 19
                                            }
                                        },
                                        "range": [
                                            704,
                                            711
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
                    "line": 24,
                    "column": 0
                },
                "end": {
                    "line": 24,
                    "column": 39
                }
            },
            "range": [
                720,
                759
            ],
            "expression": {
                "type": "CallExpression",
                "loc": {
                    "start": {
                        "line": 24,
                        "column": 0
                    },
                    "end": {
                        "line": 24,
                        "column": 38
                    }
                },
                "range": [
                    720,
                    758
                ],
                "callee": {
                    "type": "MemberExpression",
                    "loc": {
                        "start": {
                            "line": 24,
                            "column": 0
                        },
                        "end": {
                            "line": 24,
                            "column": 16
                        }
                    },
                    "range": [
                        720,
                        736
                    ],
                    "object": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 24,
                                "column": 0
                            },
                            "end": {
                                "line": 24,
                                "column": 6
                            }
                        },
                        "range": [
                            720,
                            726
                        ],
                        "name": "assert"
                    },
                    "property": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 24,
                                "column": 7
                            },
                            "end": {
                                "line": 24,
                                "column": 16
                            }
                        },
                        "range": [
                            727,
                            736
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
                                "line": 24,
                                "column": 17
                            },
                            "end": {
                                "line": 24,
                                "column": 22
                            }
                        },
                        "range": [
                            737,
                            742
                        ],
                        "name": "probe"
                    },
                    {
                        "type": "Literal",
                        "loc": {
                            "start": {
                                "line": 24,
                                "column": 24
                            },
                            "end": {
                                "line": 24,
                                "column": 37
                            }
                        },
                        "range": [
                            744,
                            757
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
                630,
                633
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
                634,
                641
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
                642,
                643
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
                644,
                657
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
                657,
                658
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
                659,
                662
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
                663,
                668
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
                668,
                669
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
                671,
                676
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
                677,
                678
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
                679,
                680
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
                683,
                689
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
                690,
                691
            ]
        },
        {
            "type": "Identifier",
            "value": "probe",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 4
                },
                "end": {
                    "line": 20,
                    "column": 9
                }
            },
            "range": [
                696,
                701
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 10
                },
                "end": {
                    "line": 20,
                    "column": 11
                }
            },
            "range": [
                702,
                703
            ]
        },
        {
            "type": "Identifier",
            "value": "test262",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 12
                },
                "end": {
                    "line": 20,
                    "column": 19
                }
            },
            "range": [
                704,
                711
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 19
                },
                "end": {
                    "line": 20,
                    "column": 20
                }
            },
            "range": [
                711,
                712
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
                715,
                716
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 22,
                    "column": 0
                },
                "end": {
                    "line": 22,
                    "column": 1
                }
            },
            "range": [
                717,
                718
            ]
        },
        {
            "type": "Identifier",
            "value": "assert",
            "loc": {
                "start": {
                    "line": 24,
                    "column": 0
                },
                "end": {
                    "line": 24,
                    "column": 6
                }
            },
            "range": [
                720,
                726
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 24,
                    "column": 6
                },
                "end": {
                    "line": 24,
                    "column": 7
                }
            },
            "range": [
                726,
                727
            ]
        },
        {
            "type": "Identifier",
            "value": "sameValue",
            "loc": {
                "start": {
                    "line": 24,
                    "column": 7
                },
                "end": {
                    "line": 24,
                    "column": 16
                }
            },
            "range": [
                727,
                736
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 24,
                    "column": 16
                },
                "end": {
                    "line": 24,
                    "column": 17
                }
            },
            "range": [
                736,
                737
            ]
        },
        {
            "type": "Identifier",
            "value": "probe",
            "loc": {
                "start": {
                    "line": 24,
                    "column": 17
                },
                "end": {
                    "line": 24,
                    "column": 22
                }
            },
            "range": [
                737,
                742
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 24,
                    "column": 22
                },
                "end": {
                    "line": 24,
                    "column": 23
                }
            },
            "range": [
                742,
                743
            ]
        },
        {
            "type": "String",
            "value": "'outer scope'",
            "loc": {
                "start": {
                    "line": 24,
                    "column": 24
                },
                "end": {
                    "line": 24,
                    "column": 37
                }
            },
            "range": [
                744,
                757
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 24,
                    "column": 37
                },
                "end": {
                    "line": 24,
                    "column": 38
                }
            },
            "range": [
                757,
                758
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 24,
                    "column": 38
                },
                "end": {
                    "line": 24,
                    "column": 39
                }
            },
            "range": [
                758,
                759
            ]
        }
    ]
};