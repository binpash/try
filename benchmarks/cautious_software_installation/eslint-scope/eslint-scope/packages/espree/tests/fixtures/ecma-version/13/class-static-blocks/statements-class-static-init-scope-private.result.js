export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 15,
            "column": 0
        },
        "end": {
            "line": 25,
            "column": 35
        }
    },
    "range": [
        646,
        777
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
                646,
                656
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
                        650,
                        655
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
                            650,
                            655
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
                    "line": 17,
                    "column": 0
                },
                "end": {
                    "line": 23,
                    "column": 1
                }
            },
            "range": [
                658,
                740
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
                    664,
                    665
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
                        "line": 23,
                        "column": 1
                    }
                },
                "range": [
                    666,
                    740
                ],
                "body": [
                    {
                        "type": "PropertyDefinition",
                        "loc": {
                            "start": {
                                "line": 18,
                                "column": 2
                            },
                            "end": {
                                "line": 18,
                                "column": 30
                            }
                        },
                        "range": [
                            670,
                            698
                        ],
                        "static": true,
                        "computed": false,
                        "key": {
                            "type": "PrivateIdentifier",
                            "loc": {
                                "start": {
                                    "line": 18,
                                    "column": 9
                                },
                                "end": {
                                    "line": 18,
                                    "column": 17
                                }
                            },
                            "range": [
                                677,
                                685
                            ],
                            "name": "test262"
                        },
                        "value": {
                            "type": "Literal",
                            "loc": {
                                "start": {
                                    "line": 18,
                                    "column": 20
                                },
                                "end": {
                                    "line": 18,
                                    "column": 29
                                }
                            },
                            "range": [
                                688,
                                697
                            ],
                            "value": "private",
                            "raw": "'private'"
                        }
                    },
                    {
                        "type": "StaticBlock",
                        "loc": {
                            "start": {
                                "line": 20,
                                "column": 2
                            },
                            "end": {
                                "line": 22,
                                "column": 3
                            }
                        },
                        "range": [
                            702,
                            738
                        ],
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "loc": {
                                    "start": {
                                        "line": 21,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 21,
                                        "column": 23
                                    }
                                },
                                "range": [
                                    715,
                                    734
                                ],
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "loc": {
                                        "start": {
                                            "line": 21,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 21,
                                            "column": 22
                                        }
                                    },
                                    "range": [
                                        715,
                                        733
                                    ],
                                    "operator": "=",
                                    "left": {
                                        "type": "Identifier",
                                        "loc": {
                                            "start": {
                                                "line": 21,
                                                "column": 4
                                            },
                                            "end": {
                                                "line": 21,
                                                "column": 9
                                            }
                                        },
                                        "range": [
                                            715,
                                            720
                                        ],
                                        "name": "probe"
                                    },
                                    "right": {
                                        "type": "MemberExpression",
                                        "loc": {
                                            "start": {
                                                "line": 21,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 21,
                                                "column": 22
                                            }
                                        },
                                        "range": [
                                            723,
                                            733
                                        ],
                                        "object": {
                                            "type": "Identifier",
                                            "loc": {
                                                "start": {
                                                    "line": 21,
                                                    "column": 12
                                                },
                                                "end": {
                                                    "line": 21,
                                                    "column": 13
                                                }
                                            },
                                            "range": [
                                                723,
                                                724
                                            ],
                                            "name": "C"
                                        },
                                        "property": {
                                            "type": "PrivateIdentifier",
                                            "loc": {
                                                "start": {
                                                    "line": 21,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 21,
                                                    "column": 22
                                                }
                                            },
                                            "range": [
                                                725,
                                                733
                                            ],
                                            "name": "test262"
                                        },
                                        "computed": false,
                                        "optional": false
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
                    "line": 25,
                    "column": 0
                },
                "end": {
                    "line": 25,
                    "column": 35
                }
            },
            "range": [
                742,
                777
            ],
            "expression": {
                "type": "CallExpression",
                "loc": {
                    "start": {
                        "line": 25,
                        "column": 0
                    },
                    "end": {
                        "line": 25,
                        "column": 34
                    }
                },
                "range": [
                    742,
                    776
                ],
                "callee": {
                    "type": "MemberExpression",
                    "loc": {
                        "start": {
                            "line": 25,
                            "column": 0
                        },
                        "end": {
                            "line": 25,
                            "column": 16
                        }
                    },
                    "range": [
                        742,
                        758
                    ],
                    "object": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 25,
                                "column": 0
                            },
                            "end": {
                                "line": 25,
                                "column": 6
                            }
                        },
                        "range": [
                            742,
                            748
                        ],
                        "name": "assert"
                    },
                    "property": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 25,
                                "column": 7
                            },
                            "end": {
                                "line": 25,
                                "column": 16
                            }
                        },
                        "range": [
                            749,
                            758
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
                                "line": 25,
                                "column": 17
                            },
                            "end": {
                                "line": 25,
                                "column": 22
                            }
                        },
                        "range": [
                            759,
                            764
                        ],
                        "name": "probe"
                    },
                    {
                        "type": "Literal",
                        "loc": {
                            "start": {
                                "line": 25,
                                "column": 24
                            },
                            "end": {
                                "line": 25,
                                "column": 33
                            }
                        },
                        "range": [
                            766,
                            775
                        ],
                        "value": "private",
                        "raw": "'private'"
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
                646,
                649
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
                650,
                655
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
                655,
                656
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
                658,
                663
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
                664,
                665
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
                666,
                667
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
                670,
                676
            ]
        },
        {
            "type": "PrivateIdentifier",
            "value": "test262",
            "loc": {
                "start": {
                    "line": 18,
                    "column": 9
                },
                "end": {
                    "line": 18,
                    "column": 17
                }
            },
            "range": [
                677,
                685
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 18,
                    "column": 18
                },
                "end": {
                    "line": 18,
                    "column": 19
                }
            },
            "range": [
                686,
                687
            ]
        },
        {
            "type": "String",
            "value": "'private'",
            "loc": {
                "start": {
                    "line": 18,
                    "column": 20
                },
                "end": {
                    "line": 18,
                    "column": 29
                }
            },
            "range": [
                688,
                697
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 18,
                    "column": 29
                },
                "end": {
                    "line": 18,
                    "column": 30
                }
            },
            "range": [
                697,
                698
            ]
        },
        {
            "type": "Keyword",
            "value": "static",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 2
                },
                "end": {
                    "line": 20,
                    "column": 8
                }
            },
            "range": [
                702,
                708
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 20,
                    "column": 9
                },
                "end": {
                    "line": 20,
                    "column": 10
                }
            },
            "range": [
                709,
                710
            ]
        },
        {
            "type": "Identifier",
            "value": "probe",
            "loc": {
                "start": {
                    "line": 21,
                    "column": 4
                },
                "end": {
                    "line": 21,
                    "column": 9
                }
            },
            "range": [
                715,
                720
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 21,
                    "column": 10
                },
                "end": {
                    "line": 21,
                    "column": 11
                }
            },
            "range": [
                721,
                722
            ]
        },
        {
            "type": "Identifier",
            "value": "C",
            "loc": {
                "start": {
                    "line": 21,
                    "column": 12
                },
                "end": {
                    "line": 21,
                    "column": 13
                }
            },
            "range": [
                723,
                724
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 21,
                    "column": 13
                },
                "end": {
                    "line": 21,
                    "column": 14
                }
            },
            "range": [
                724,
                725
            ]
        },
        {
            "type": "PrivateIdentifier",
            "value": "test262",
            "loc": {
                "start": {
                    "line": 21,
                    "column": 14
                },
                "end": {
                    "line": 21,
                    "column": 22
                }
            },
            "range": [
                725,
                733
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 21,
                    "column": 22
                },
                "end": {
                    "line": 21,
                    "column": 23
                }
            },
            "range": [
                733,
                734
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 22,
                    "column": 2
                },
                "end": {
                    "line": 22,
                    "column": 3
                }
            },
            "range": [
                737,
                738
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 23,
                    "column": 0
                },
                "end": {
                    "line": 23,
                    "column": 1
                }
            },
            "range": [
                739,
                740
            ]
        },
        {
            "type": "Identifier",
            "value": "assert",
            "loc": {
                "start": {
                    "line": 25,
                    "column": 0
                },
                "end": {
                    "line": 25,
                    "column": 6
                }
            },
            "range": [
                742,
                748
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 25,
                    "column": 6
                },
                "end": {
                    "line": 25,
                    "column": 7
                }
            },
            "range": [
                748,
                749
            ]
        },
        {
            "type": "Identifier",
            "value": "sameValue",
            "loc": {
                "start": {
                    "line": 25,
                    "column": 7
                },
                "end": {
                    "line": 25,
                    "column": 16
                }
            },
            "range": [
                749,
                758
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 25,
                    "column": 16
                },
                "end": {
                    "line": 25,
                    "column": 17
                }
            },
            "range": [
                758,
                759
            ]
        },
        {
            "type": "Identifier",
            "value": "probe",
            "loc": {
                "start": {
                    "line": 25,
                    "column": 17
                },
                "end": {
                    "line": 25,
                    "column": 22
                }
            },
            "range": [
                759,
                764
            ]
        },
        {
            "type": "Punctuator",
            "value": ",",
            "loc": {
                "start": {
                    "line": 25,
                    "column": 22
                },
                "end": {
                    "line": 25,
                    "column": 23
                }
            },
            "range": [
                764,
                765
            ]
        },
        {
            "type": "String",
            "value": "'private'",
            "loc": {
                "start": {
                    "line": 25,
                    "column": 24
                },
                "end": {
                    "line": 25,
                    "column": 33
                }
            },
            "range": [
                766,
                775
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 25,
                    "column": 33
                },
                "end": {
                    "line": 25,
                    "column": 34
                }
            },
            "range": [
                775,
                776
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 25,
                    "column": 34
                },
                "end": {
                    "line": 25,
                    "column": 35
                }
            },
            "range": [
                776,
                777
            ]
        }
    ]
};