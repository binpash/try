export default {
    "type": "Program",
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 14,
            "column": 29
        }
    },
    "range": [
        0,
        292
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
                    "line": 1,
                    "column": 36
                }
            },
            "range": [
                0,
                36
            ],
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 35
                        }
                    },
                    "range": [
                        4,
                        35
                    ],
                    "id": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        },
                        "range": [
                            4,
                            9
                        ],
                        "name": "React"
                    },
                    "init": {
                        "type": "CallExpression",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 35
                            }
                        },
                        "range": [
                            12,
                            35
                        ],
                        "callee": {
                            "type": "Identifier",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 19
                                }
                            },
                            "range": [
                                12,
                                19
                            ],
                            "name": "require"
                        },
                        "arguments": [
                            {
                                "type": "Literal",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                },
                                "range": [
                                    20,
                                    34
                                ],
                                "value": "react/addons",
                                "raw": "'react/addons'"
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 12,
                    "column": 3
                }
            },
            "range": [
                38,
                261
            ],
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 4
                        },
                        "end": {
                            "line": 12,
                            "column": 2
                        }
                    },
                    "range": [
                        42,
                        260
                    ],
                    "id": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 4
                            },
                            "end": {
                                "line": 3,
                                "column": 15
                            }
                        },
                        "range": [
                            42,
                            53
                        ],
                        "name": "MyComponent"
                    },
                    "init": {
                        "type": "CallExpression",
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 18
                            },
                            "end": {
                                "line": 12,
                                "column": 2
                            }
                        },
                        "range": [
                            56,
                            260
                        ],
                        "callee": {
                            "type": "MemberExpression",
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 18
                                },
                                "end": {
                                    "line": 3,
                                    "column": 35
                                }
                            },
                            "range": [
                                56,
                                73
                            ],
                            "object": {
                                "type": "Identifier",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 23
                                    }
                                },
                                "range": [
                                    56,
                                    61
                                ],
                                "name": "React"
                            },
                            "property": {
                                "type": "Identifier",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 35
                                    }
                                },
                                "range": [
                                    62,
                                    73
                                ],
                                "name": "createClass"
                            },
                            "computed": false
                        },
                        "arguments": [
                            {
                                "type": "ObjectExpression",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 36
                                    },
                                    "end": {
                                        "line": 12,
                                        "column": 1
                                    }
                                },
                                "range": [
                                    74,
                                    259
                                ],
                                "properties": [
                                    {
                                        "type": "Property",
                                        "loc": {
                                            "start": {
                                                "line": 4,
                                                "column": 2
                                            },
                                            "end": {
                                                "line": 11,
                                                "column": 3
                                            }
                                        },
                                        "range": [
                                            78,
                                            257
                                        ],
                                        "method": false,
                                        "shorthand": false,
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 2
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 8
                                                }
                                            },
                                            "range": [
                                                78,
                                                84
                                            ],
                                            "name": "render"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 10
                                                },
                                                "end": {
                                                    "line": 11,
                                                    "column": 3
                                                }
                                            },
                                            "range": [
                                                86,
                                                257
                                            ],
                                            "id": null,
                                            "generator": false,
                                            "expression": false,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 21
                                                    },
                                                    "end": {
                                                        "line": 11,
                                                        "column": 3
                                                    }
                                                },
                                                "range": [
                                                    97,
                                                    257
                                                ],
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 4
                                                            },
                                                            "end": {
                                                                "line": 10,
                                                                "column": 6
                                                            }
                                                        },
                                                        "range": [
                                                            103,
                                                            253
                                                        ],
                                                        "argument": {
                                                            "type": "JSXElement",
                                                            "loc": {
                                                                "start": {
                                                                    "line": 6,
                                                                    "column": 6
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 12
                                                                }
                                                            },
                                                            "range": [
                                                                118,
                                                                246
                                                            ],
                                                            "openingElement": {
                                                                "type": "JSXOpeningElement",
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 6,
                                                                        "column": 6
                                                                    },
                                                                    "end": {
                                                                        "line": 6,
                                                                        "column": 11
                                                                    }
                                                                },
                                                                "range": [
                                                                    118,
                                                                    123
                                                                ],
                                                                "attributes": [],
                                                                "name": {
                                                                    "type": "JSXIdentifier",
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 6,
                                                                            "column": 7
                                                                        },
                                                                        "end": {
                                                                            "line": 6,
                                                                            "column": 10
                                                                        }
                                                                    },
                                                                    "range": [
                                                                        119,
                                                                        122
                                                                    ],
                                                                    "name": "div"
                                                                },
                                                                "selfClosing": false
                                                            },
                                                            "closingElement": {
                                                                "type": "JSXClosingElement",
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 6
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 12
                                                                    }
                                                                },
                                                                "range": [
                                                                    240,
                                                                    246
                                                                ],
                                                                "name": {
                                                                    "type": "JSXIdentifier",
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 9,
                                                                            "column": 8
                                                                        },
                                                                        "end": {
                                                                            "line": 9,
                                                                            "column": 11
                                                                        }
                                                                    },
                                                                    "range": [
                                                                        242,
                                                                        245
                                                                    ],
                                                                    "name": "div"
                                                                }
                                                            },
                                                            "children": [
                                                                {
                                                                    "type": "JSXText",
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 6,
                                                                            "column": 11
                                                                        },
                                                                        "end": {
                                                                            "line": 7,
                                                                            "column": 8
                                                                        }
                                                                    },
                                                                    "range": [
                                                                        123,
                                                                        132
                                                                    ],
                                                                    "value": "\n        ",
                                                                    "raw": "\n        "
                                                                },
                                                                {
                                                                    "type": "JSXElement",
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 7,
                                                                            "column": 8
                                                                        },
                                                                        "end": {
                                                                            "line": 7,
                                                                            "column": 49
                                                                        }
                                                                    },
                                                                    "range": [
                                                                        132,
                                                                        173
                                                                    ],
                                                                    "openingElement": {
                                                                        "type": "JSXOpeningElement",
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 7,
                                                                                "column": 8
                                                                            },
                                                                            "end": {
                                                                                "line": 7,
                                                                                "column": 49
                                                                            }
                                                                        },
                                                                        "range": [
                                                                            132,
                                                                            173
                                                                        ],
                                                                        "attributes": [
                                                                            {
                                                                                "type": "JSXAttribute",
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 7,
                                                                                        "column": 13
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 7,
                                                                                        "column": 47
                                                                                    }
                                                                                },
                                                                                "range": [
                                                                                    137,
                                                                                    171
                                                                                ],
                                                                                "name": {
                                                                                    "type": "JSXIdentifier",
                                                                                    "loc": {
                                                                                        "start": {
                                                                                            "line": 7,
                                                                                            "column": 13
                                                                                        },
                                                                                        "end": {
                                                                                            "line": 7,
                                                                                            "column": 19
                                                                                        }
                                                                                    },
                                                                                    "range": [
                                                                                        137,
                                                                                        143
                                                                                    ],
                                                                                    "name": "myProp"
                                                                                },
                                                                                "value": {
                                                                                    "type": "JSXExpressionContainer",
                                                                                    "loc": {
                                                                                        "start": {
                                                                                            "line": 7,
                                                                                            "column": 20
                                                                                        },
                                                                                        "end": {
                                                                                            "line": 7,
                                                                                            "column": 47
                                                                                        }
                                                                                    },
                                                                                    "range": [
                                                                                        144,
                                                                                        171
                                                                                    ],
                                                                                    "expression": {
                                                                                        "type": "TemplateLiteral",
                                                                                        "loc": {
                                                                                            "start": {
                                                                                                "line": 7,
                                                                                                "column": 21
                                                                                            },
                                                                                            "end": {
                                                                                                "line": 7,
                                                                                                "column": 46
                                                                                            }
                                                                                        },
                                                                                        "range": [
                                                                                            145,
                                                                                            170
                                                                                        ],
                                                                                        "expressions": [
                                                                                            {
                                                                                                "type": "MemberExpression",
                                                                                                "loc": {
                                                                                                    "start": {
                                                                                                        "line": 7,
                                                                                                        "column": 24
                                                                                                    },
                                                                                                    "end": {
                                                                                                        "line": 7,
                                                                                                        "column": 44
                                                                                                    }
                                                                                                },
                                                                                                "range": [
                                                                                                    148,
                                                                                                    168
                                                                                                ],
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "loc": {
                                                                                                        "start": {
                                                                                                            "line": 7,
                                                                                                            "column": 24
                                                                                                        },
                                                                                                        "end": {
                                                                                                            "line": 7,
                                                                                                            "column": 34
                                                                                                        }
                                                                                                    },
                                                                                                    "range": [
                                                                                                        148,
                                                                                                        158
                                                                                                    ],
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression",
                                                                                                        "loc": {
                                                                                                            "start": {
                                                                                                                "line": 7,
                                                                                                                "column": 24
                                                                                                            },
                                                                                                            "end": {
                                                                                                                "line": 7,
                                                                                                                "column": 28
                                                                                                            }
                                                                                                        },
                                                                                                        "range": [
                                                                                                            148,
                                                                                                            152
                                                                                                        ]
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "loc": {
                                                                                                            "start": {
                                                                                                                "line": 7,
                                                                                                                "column": 29
                                                                                                            },
                                                                                                            "end": {
                                                                                                                "line": 7,
                                                                                                                "column": 34
                                                                                                            }
                                                                                                        },
                                                                                                        "range": [
                                                                                                            153,
                                                                                                            158
                                                                                                        ],
                                                                                                        "name": "props"
                                                                                                    },
                                                                                                    "computed": false
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "loc": {
                                                                                                        "start": {
                                                                                                            "line": 7,
                                                                                                            "column": 35
                                                                                                        },
                                                                                                        "end": {
                                                                                                            "line": 7,
                                                                                                            "column": 44
                                                                                                        }
                                                                                                    },
                                                                                                    "range": [
                                                                                                        159,
                                                                                                        168
                                                                                                    ],
                                                                                                    "name": "something"
                                                                                                },
                                                                                                "computed": false
                                                                                            }
                                                                                        ],
                                                                                        "quasis": [
                                                                                            {
                                                                                                "type": "TemplateElement",
                                                                                                "loc": {
                                                                                                    "start": {
                                                                                                        "line": 7,
                                                                                                        "column": 21
                                                                                                    },
                                                                                                    "end": {
                                                                                                        "line": 7,
                                                                                                        "column": 24
                                                                                                    }
                                                                                                },
                                                                                                "range": [
                                                                                                    145,
                                                                                                    148
                                                                                                ],
                                                                                                "value": {
                                                                                                    "raw": "",
                                                                                                    "cooked": ""
                                                                                                },
                                                                                                "tail": false
                                                                                            },
                                                                                            {
                                                                                                "type": "TemplateElement",
                                                                                                "loc": {
                                                                                                    "start": {
                                                                                                        "line": 7,
                                                                                                        "column": 44
                                                                                                    },
                                                                                                    "end": {
                                                                                                        "line": 7,
                                                                                                        "column": 46
                                                                                                    }
                                                                                                },
                                                                                                "range": [
                                                                                                    168,
                                                                                                    170
                                                                                                ],
                                                                                                "value": {
                                                                                                    "raw": "",
                                                                                                    "cooked": ""
                                                                                                },
                                                                                                "tail": true
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            }
                                                                        ],
                                                                        "name": {
                                                                            "type": "JSXIdentifier",
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 7,
                                                                                    "column": 9
                                                                                },
                                                                                "end": {
                                                                                    "line": 7,
                                                                                    "column": 12
                                                                                }
                                                                            },
                                                                            "range": [
                                                                                133,
                                                                                136
                                                                            ],
                                                                            "name": "div"
                                                                        },
                                                                        "selfClosing": true
                                                                    },
                                                                    "closingElement": null,
                                                                    "children": []
                                                                },
                                                                {
                                                                    "type": "JSXText",
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 7,
                                                                            "column": 49
                                                                        },
                                                                        "end": {
                                                                            "line": 8,
                                                                            "column": 8
                                                                        }
                                                                    },
                                                                    "range": [
                                                                        173,
                                                                        182
                                                                    ],
                                                                    "value": "\n        ",
                                                                    "raw": "\n        "
                                                                },
                                                                {
                                                                    "type": "JSXElement",
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 8,
                                                                            "column": 8
                                                                        },
                                                                        "end": {
                                                                            "line": 8,
                                                                            "column": 59
                                                                        }
                                                                    },
                                                                    "range": [
                                                                        182,
                                                                        233
                                                                    ],
                                                                    "openingElement": {
                                                                        "type": "JSXOpeningElement",
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 8,
                                                                                "column": 8
                                                                            },
                                                                            "end": {
                                                                                "line": 8,
                                                                                "column": 59
                                                                            }
                                                                        },
                                                                        "range": [
                                                                            182,
                                                                            233
                                                                        ],
                                                                        "attributes": [
                                                                            {
                                                                                "type": "JSXAttribute",
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 8,
                                                                                        "column": 13
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 8,
                                                                                        "column": 57
                                                                                    }
                                                                                },
                                                                                "range": [
                                                                                    187,
                                                                                    231
                                                                                ],
                                                                                "name": {
                                                                                    "type": "JSXIdentifier",
                                                                                    "loc": {
                                                                                        "start": {
                                                                                            "line": 8,
                                                                                            "column": 13
                                                                                        },
                                                                                        "end": {
                                                                                            "line": 8,
                                                                                            "column": 26
                                                                                        }
                                                                                    },
                                                                                    "range": [
                                                                                        187,
                                                                                        200
                                                                                    ],
                                                                                    "name": "differentProp"
                                                                                },
                                                                                "value": {
                                                                                    "type": "JSXExpressionContainer",
                                                                                    "loc": {
                                                                                        "start": {
                                                                                            "line": 8,
                                                                                            "column": 27
                                                                                        },
                                                                                        "end": {
                                                                                            "line": 8,
                                                                                            "column": 57
                                                                                        }
                                                                                    },
                                                                                    "range": [
                                                                                        201,
                                                                                        231
                                                                                    ],
                                                                                    "expression": {
                                                                                        "type": "TemplateLiteral",
                                                                                        "loc": {
                                                                                            "start": {
                                                                                                "line": 8,
                                                                                                "column": 28
                                                                                            },
                                                                                            "end": {
                                                                                                "line": 8,
                                                                                                "column": 56
                                                                                            }
                                                                                        },
                                                                                        "range": [
                                                                                            202,
                                                                                            230
                                                                                        ],
                                                                                        "expressions": [
                                                                                            {
                                                                                                "type": "MemberExpression",
                                                                                                "loc": {
                                                                                                    "start": {
                                                                                                        "line": 8,
                                                                                                        "column": 31
                                                                                                    },
                                                                                                    "end": {
                                                                                                        "line": 8,
                                                                                                        "column": 54
                                                                                                    }
                                                                                                },
                                                                                                "range": [
                                                                                                    205,
                                                                                                    228
                                                                                                ],
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "loc": {
                                                                                                        "start": {
                                                                                                            "line": 8,
                                                                                                            "column": 31
                                                                                                        },
                                                                                                        "end": {
                                                                                                            "line": 8,
                                                                                                            "column": 41
                                                                                                        }
                                                                                                    },
                                                                                                    "range": [
                                                                                                        205,
                                                                                                        215
                                                                                                    ],
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression",
                                                                                                        "loc": {
                                                                                                            "start": {
                                                                                                                "line": 8,
                                                                                                                "column": 31
                                                                                                            },
                                                                                                            "end": {
                                                                                                                "line": 8,
                                                                                                                "column": 35
                                                                                                            }
                                                                                                        },
                                                                                                        "range": [
                                                                                                            205,
                                                                                                            209
                                                                                                        ]
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "loc": {
                                                                                                            "start": {
                                                                                                                "line": 8,
                                                                                                                "column": 36
                                                                                                            },
                                                                                                            "end": {
                                                                                                                "line": 8,
                                                                                                                "column": 41
                                                                                                            }
                                                                                                        },
                                                                                                        "range": [
                                                                                                            210,
                                                                                                            215
                                                                                                        ],
                                                                                                        "name": "props"
                                                                                                    },
                                                                                                    "computed": false
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "loc": {
                                                                                                        "start": {
                                                                                                            "line": 8,
                                                                                                            "column": 42
                                                                                                        },
                                                                                                        "end": {
                                                                                                            "line": 8,
                                                                                                            "column": 54
                                                                                                        }
                                                                                                    },
                                                                                                    "range": [
                                                                                                        216,
                                                                                                        228
                                                                                                    ],
                                                                                                    "name": "anotherThing"
                                                                                                },
                                                                                                "computed": false
                                                                                            }
                                                                                        ],
                                                                                        "quasis": [
                                                                                            {
                                                                                                "type": "TemplateElement",
                                                                                                "loc": {
                                                                                                    "start": {
                                                                                                        "line": 8,
                                                                                                        "column": 28
                                                                                                    },
                                                                                                    "end": {
                                                                                                        "line": 8,
                                                                                                        "column": 31
                                                                                                    }
                                                                                                },
                                                                                                "range": [
                                                                                                    202,
                                                                                                    205
                                                                                                ],
                                                                                                "value": {
                                                                                                    "raw": "",
                                                                                                    "cooked": ""
                                                                                                },
                                                                                                "tail": false
                                                                                            },
                                                                                            {
                                                                                                "type": "TemplateElement",
                                                                                                "loc": {
                                                                                                    "start": {
                                                                                                        "line": 8,
                                                                                                        "column": 54
                                                                                                    },
                                                                                                    "end": {
                                                                                                        "line": 8,
                                                                                                        "column": 56
                                                                                                    }
                                                                                                },
                                                                                                "range": [
                                                                                                    228,
                                                                                                    230
                                                                                                ],
                                                                                                "value": {
                                                                                                    "raw": "",
                                                                                                    "cooked": ""
                                                                                                },
                                                                                                "tail": true
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            }
                                                                        ],
                                                                        "name": {
                                                                            "type": "JSXIdentifier",
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 8,
                                                                                    "column": 9
                                                                                },
                                                                                "end": {
                                                                                    "line": 8,
                                                                                    "column": 12
                                                                                }
                                                                            },
                                                                            "range": [
                                                                                183,
                                                                                186
                                                                            ],
                                                                            "name": "div"
                                                                        },
                                                                        "selfClosing": true
                                                                    },
                                                                    "closingElement": null,
                                                                    "children": []
                                                                },
                                                                {
                                                                    "type": "JSXText",
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 8,
                                                                            "column": 59
                                                                        },
                                                                        "end": {
                                                                            "line": 9,
                                                                            "column": 6
                                                                        }
                                                                    },
                                                                    "range": [
                                                                        233,
                                                                        240
                                                                    ],
                                                                    "value": "\n      ",
                                                                    "raw": "\n      "
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        "kind": "init"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "ExpressionStatement",
            "loc": {
                "start": {
                    "line": 14,
                    "column": 0
                },
                "end": {
                    "line": 14,
                    "column": 29
                }
            },
            "range": [
                263,
                292
            ],
            "expression": {
                "type": "AssignmentExpression",
                "loc": {
                    "start": {
                        "line": 14,
                        "column": 0
                    },
                    "end": {
                        "line": 14,
                        "column": 28
                    }
                },
                "range": [
                    263,
                    291
                ],
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "loc": {
                        "start": {
                            "line": 14,
                            "column": 0
                        },
                        "end": {
                            "line": 14,
                            "column": 14
                        }
                    },
                    "range": [
                        263,
                        277
                    ],
                    "object": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 14,
                                "column": 0
                            },
                            "end": {
                                "line": 14,
                                "column": 6
                            }
                        },
                        "range": [
                            263,
                            269
                        ],
                        "name": "module"
                    },
                    "property": {
                        "type": "Identifier",
                        "loc": {
                            "start": {
                                "line": 14,
                                "column": 7
                            },
                            "end": {
                                "line": 14,
                                "column": 14
                            }
                        },
                        "range": [
                            270,
                            277
                        ],
                        "name": "exports"
                    },
                    "computed": false
                },
                "right": {
                    "type": "Identifier",
                    "loc": {
                        "start": {
                            "line": 14,
                            "column": 17
                        },
                        "end": {
                            "line": 14,
                            "column": 28
                        }
                    },
                    "range": [
                        280,
                        291
                    ],
                    "name": "MyComponent"
                }
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
            "type": "Identifier",
            "value": "React",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 4
                },
                "end": {
                    "line": 1,
                    "column": 9
                }
            },
            "range": [
                4,
                9
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 10
                },
                "end": {
                    "line": 1,
                    "column": 11
                }
            },
            "range": [
                10,
                11
            ]
        },
        {
            "type": "Identifier",
            "value": "require",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 12
                },
                "end": {
                    "line": 1,
                    "column": 19
                }
            },
            "range": [
                12,
                19
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 19
                },
                "end": {
                    "line": 1,
                    "column": 20
                }
            },
            "range": [
                19,
                20
            ]
        },
        {
            "type": "String",
            "value": "'react/addons'",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 20
                },
                "end": {
                    "line": 1,
                    "column": 34
                }
            },
            "range": [
                20,
                34
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 34
                },
                "end": {
                    "line": 1,
                    "column": 35
                }
            },
            "range": [
                34,
                35
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 35
                },
                "end": {
                    "line": 1,
                    "column": 36
                }
            },
            "range": [
                35,
                36
            ]
        },
        {
            "type": "Keyword",
            "value": "var",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 3
                }
            },
            "range": [
                38,
                41
            ]
        },
        {
            "type": "Identifier",
            "value": "MyComponent",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 4
                },
                "end": {
                    "line": 3,
                    "column": 15
                }
            },
            "range": [
                42,
                53
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 16
                },
                "end": {
                    "line": 3,
                    "column": 17
                }
            },
            "range": [
                54,
                55
            ]
        },
        {
            "type": "Identifier",
            "value": "React",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 18
                },
                "end": {
                    "line": 3,
                    "column": 23
                }
            },
            "range": [
                56,
                61
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 23
                },
                "end": {
                    "line": 3,
                    "column": 24
                }
            },
            "range": [
                61,
                62
            ]
        },
        {
            "type": "Identifier",
            "value": "createClass",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 24
                },
                "end": {
                    "line": 3,
                    "column": 35
                }
            },
            "range": [
                62,
                73
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 35
                },
                "end": {
                    "line": 3,
                    "column": 36
                }
            },
            "range": [
                73,
                74
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 36
                },
                "end": {
                    "line": 3,
                    "column": 37
                }
            },
            "range": [
                74,
                75
            ]
        },
        {
            "type": "Identifier",
            "value": "render",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 2
                },
                "end": {
                    "line": 4,
                    "column": 8
                }
            },
            "range": [
                78,
                84
            ]
        },
        {
            "type": "Punctuator",
            "value": ":",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 8
                },
                "end": {
                    "line": 4,
                    "column": 9
                }
            },
            "range": [
                84,
                85
            ]
        },
        {
            "type": "Keyword",
            "value": "function",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 10
                },
                "end": {
                    "line": 4,
                    "column": 18
                }
            },
            "range": [
                86,
                94
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 18
                },
                "end": {
                    "line": 4,
                    "column": 19
                }
            },
            "range": [
                94,
                95
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 19
                },
                "end": {
                    "line": 4,
                    "column": 20
                }
            },
            "range": [
                95,
                96
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 21
                },
                "end": {
                    "line": 4,
                    "column": 22
                }
            },
            "range": [
                97,
                98
            ]
        },
        {
            "type": "Keyword",
            "value": "return",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 4
                },
                "end": {
                    "line": 5,
                    "column": 10
                }
            },
            "range": [
                103,
                109
            ]
        },
        {
            "type": "Punctuator",
            "value": "(",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 11
                },
                "end": {
                    "line": 5,
                    "column": 12
                }
            },
            "range": [
                110,
                111
            ]
        },
        {
            "type": "Punctuator",
            "value": "<",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 6
                },
                "end": {
                    "line": 6,
                    "column": 7
                }
            },
            "range": [
                118,
                119
            ]
        },
        {
            "type": "JSXIdentifier",
            "value": "div",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 7
                },
                "end": {
                    "line": 6,
                    "column": 10
                }
            },
            "range": [
                119,
                122
            ]
        },
        {
            "type": "Punctuator",
            "value": ">",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 10
                },
                "end": {
                    "line": 6,
                    "column": 11
                }
            },
            "range": [
                122,
                123
            ]
        },
        {
            "type": "JSXText",
            "value": "\n        ",
            "loc": {
                "start": {
                    "line": 6,
                    "column": 11
                },
                "end": {
                    "line": 7,
                    "column": 8
                }
            },
            "range": [
                123,
                132
            ]
        },
        {
            "type": "Punctuator",
            "value": "<",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 8
                },
                "end": {
                    "line": 7,
                    "column": 9
                }
            },
            "range": [
                132,
                133
            ]
        },
        {
            "type": "JSXIdentifier",
            "value": "div",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 9
                },
                "end": {
                    "line": 7,
                    "column": 12
                }
            },
            "range": [
                133,
                136
            ]
        },
        {
            "type": "JSXIdentifier",
            "value": "myProp",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 13
                },
                "end": {
                    "line": 7,
                    "column": 19
                }
            },
            "range": [
                137,
                143
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 19
                },
                "end": {
                    "line": 7,
                    "column": 20
                }
            },
            "range": [
                143,
                144
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 20
                },
                "end": {
                    "line": 7,
                    "column": 21
                }
            },
            "range": [
                144,
                145
            ]
        },
        {
            "type": "Template",
            "value": "`${",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 21
                },
                "end": {
                    "line": 7,
                    "column": 24
                }
            },
            "range": [
                145,
                148
            ]
        },
        {
            "type": "Keyword",
            "value": "this",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 24
                },
                "end": {
                    "line": 7,
                    "column": 28
                }
            },
            "range": [
                148,
                152
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 28
                },
                "end": {
                    "line": 7,
                    "column": 29
                }
            },
            "range": [
                152,
                153
            ]
        },
        {
            "type": "Identifier",
            "value": "props",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 29
                },
                "end": {
                    "line": 7,
                    "column": 34
                }
            },
            "range": [
                153,
                158
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 34
                },
                "end": {
                    "line": 7,
                    "column": 35
                }
            },
            "range": [
                158,
                159
            ]
        },
        {
            "type": "Identifier",
            "value": "something",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 35
                },
                "end": {
                    "line": 7,
                    "column": 44
                }
            },
            "range": [
                159,
                168
            ]
        },
        {
            "type": "Template",
            "value": "}`",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 44
                },
                "end": {
                    "line": 7,
                    "column": 46
                }
            },
            "range": [
                168,
                170
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 46
                },
                "end": {
                    "line": 7,
                    "column": 47
                }
            },
            "range": [
                170,
                171
            ]
        },
        {
            "type": "Punctuator",
            "value": "/",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 47
                },
                "end": {
                    "line": 7,
                    "column": 48
                }
            },
            "range": [
                171,
                172
            ]
        },
        {
            "type": "Punctuator",
            "value": ">",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 48
                },
                "end": {
                    "line": 7,
                    "column": 49
                }
            },
            "range": [
                172,
                173
            ]
        },
        {
            "type": "JSXText",
            "value": "\n        ",
            "loc": {
                "start": {
                    "line": 7,
                    "column": 49
                },
                "end": {
                    "line": 8,
                    "column": 8
                }
            },
            "range": [
                173,
                182
            ]
        },
        {
            "type": "Punctuator",
            "value": "<",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 8
                },
                "end": {
                    "line": 8,
                    "column": 9
                }
            },
            "range": [
                182,
                183
            ]
        },
        {
            "type": "JSXIdentifier",
            "value": "div",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 9
                },
                "end": {
                    "line": 8,
                    "column": 12
                }
            },
            "range": [
                183,
                186
            ]
        },
        {
            "type": "JSXIdentifier",
            "value": "differentProp",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 13
                },
                "end": {
                    "line": 8,
                    "column": 26
                }
            },
            "range": [
                187,
                200
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 26
                },
                "end": {
                    "line": 8,
                    "column": 27
                }
            },
            "range": [
                200,
                201
            ]
        },
        {
            "type": "Punctuator",
            "value": "{",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 27
                },
                "end": {
                    "line": 8,
                    "column": 28
                }
            },
            "range": [
                201,
                202
            ]
        },
        {
            "type": "Template",
            "value": "`${",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 28
                },
                "end": {
                    "line": 8,
                    "column": 31
                }
            },
            "range": [
                202,
                205
            ]
        },
        {
            "type": "Keyword",
            "value": "this",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 31
                },
                "end": {
                    "line": 8,
                    "column": 35
                }
            },
            "range": [
                205,
                209
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 35
                },
                "end": {
                    "line": 8,
                    "column": 36
                }
            },
            "range": [
                209,
                210
            ]
        },
        {
            "type": "Identifier",
            "value": "props",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 36
                },
                "end": {
                    "line": 8,
                    "column": 41
                }
            },
            "range": [
                210,
                215
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 41
                },
                "end": {
                    "line": 8,
                    "column": 42
                }
            },
            "range": [
                215,
                216
            ]
        },
        {
            "type": "Identifier",
            "value": "anotherThing",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 42
                },
                "end": {
                    "line": 8,
                    "column": 54
                }
            },
            "range": [
                216,
                228
            ]
        },
        {
            "type": "Template",
            "value": "}`",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 54
                },
                "end": {
                    "line": 8,
                    "column": 56
                }
            },
            "range": [
                228,
                230
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 56
                },
                "end": {
                    "line": 8,
                    "column": 57
                }
            },
            "range": [
                230,
                231
            ]
        },
        {
            "type": "Punctuator",
            "value": "/",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 57
                },
                "end": {
                    "line": 8,
                    "column": 58
                }
            },
            "range": [
                231,
                232
            ]
        },
        {
            "type": "Punctuator",
            "value": ">",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 58
                },
                "end": {
                    "line": 8,
                    "column": 59
                }
            },
            "range": [
                232,
                233
            ]
        },
        {
            "type": "JSXText",
            "value": "\n      ",
            "loc": {
                "start": {
                    "line": 8,
                    "column": 59
                },
                "end": {
                    "line": 9,
                    "column": 6
                }
            },
            "range": [
                233,
                240
            ]
        },
        {
            "type": "Punctuator",
            "value": "<",
            "loc": {
                "start": {
                    "line": 9,
                    "column": 6
                },
                "end": {
                    "line": 9,
                    "column": 7
                }
            },
            "range": [
                240,
                241
            ]
        },
        {
            "type": "Punctuator",
            "value": "/",
            "loc": {
                "start": {
                    "line": 9,
                    "column": 7
                },
                "end": {
                    "line": 9,
                    "column": 8
                }
            },
            "range": [
                241,
                242
            ]
        },
        {
            "type": "JSXIdentifier",
            "value": "div",
            "loc": {
                "start": {
                    "line": 9,
                    "column": 8
                },
                "end": {
                    "line": 9,
                    "column": 11
                }
            },
            "range": [
                242,
                245
            ]
        },
        {
            "type": "Punctuator",
            "value": ">",
            "loc": {
                "start": {
                    "line": 9,
                    "column": 11
                },
                "end": {
                    "line": 9,
                    "column": 12
                }
            },
            "range": [
                245,
                246
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 10,
                    "column": 4
                },
                "end": {
                    "line": 10,
                    "column": 5
                }
            },
            "range": [
                251,
                252
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 10,
                    "column": 5
                },
                "end": {
                    "line": 10,
                    "column": 6
                }
            },
            "range": [
                252,
                253
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 11,
                    "column": 2
                },
                "end": {
                    "line": 11,
                    "column": 3
                }
            },
            "range": [
                256,
                257
            ]
        },
        {
            "type": "Punctuator",
            "value": "}",
            "loc": {
                "start": {
                    "line": 12,
                    "column": 0
                },
                "end": {
                    "line": 12,
                    "column": 1
                }
            },
            "range": [
                258,
                259
            ]
        },
        {
            "type": "Punctuator",
            "value": ")",
            "loc": {
                "start": {
                    "line": 12,
                    "column": 1
                },
                "end": {
                    "line": 12,
                    "column": 2
                }
            },
            "range": [
                259,
                260
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 12,
                    "column": 2
                },
                "end": {
                    "line": 12,
                    "column": 3
                }
            },
            "range": [
                260,
                261
            ]
        },
        {
            "type": "Identifier",
            "value": "module",
            "loc": {
                "start": {
                    "line": 14,
                    "column": 0
                },
                "end": {
                    "line": 14,
                    "column": 6
                }
            },
            "range": [
                263,
                269
            ]
        },
        {
            "type": "Punctuator",
            "value": ".",
            "loc": {
                "start": {
                    "line": 14,
                    "column": 6
                },
                "end": {
                    "line": 14,
                    "column": 7
                }
            },
            "range": [
                269,
                270
            ]
        },
        {
            "type": "Identifier",
            "value": "exports",
            "loc": {
                "start": {
                    "line": 14,
                    "column": 7
                },
                "end": {
                    "line": 14,
                    "column": 14
                }
            },
            "range": [
                270,
                277
            ]
        },
        {
            "type": "Punctuator",
            "value": "=",
            "loc": {
                "start": {
                    "line": 14,
                    "column": 15
                },
                "end": {
                    "line": 14,
                    "column": 16
                }
            },
            "range": [
                278,
                279
            ]
        },
        {
            "type": "Identifier",
            "value": "MyComponent",
            "loc": {
                "start": {
                    "line": 14,
                    "column": 17
                },
                "end": {
                    "line": 14,
                    "column": 28
                }
            },
            "range": [
                280,
                291
            ]
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 14,
                    "column": 28
                },
                "end": {
                    "line": 14,
                    "column": 29
                }
            },
            "range": [
                291,
                292
            ]
        }
    ]
};