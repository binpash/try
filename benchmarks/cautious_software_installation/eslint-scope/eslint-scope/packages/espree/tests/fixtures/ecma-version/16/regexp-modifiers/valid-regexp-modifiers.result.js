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
            "column": 13
        }
    },
    "range": [
        0,
        67
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
                    "column": 12
                }
            },
            "range": [
                0,
                12
            ],
            "expression": conditionalRegex({
                "type": "Literal",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 11
                    }
                },
                "range": [
                    0,
                    11
                ],
                "value": null,
                "raw": "/(?i-m:p)?/",
                "regex": {
                    "pattern": "(?i-m:p)?",
                    "flags": ""
                }
            })
        },
        {
            "type": "ExpressionStatement",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 13
                }
            },
            "range": [
                13,
                26
            ],
            "expression": conditionalRegex({
                "type": "Literal",
                "loc": {
                    "start": {
                        "line": 2,
                        "column": 0
                    },
                    "end": {
                        "line": 2,
                        "column": 12
                    }
                },
                "range": [
                    13,
                    25
                ],
                "value": null,
                "raw": "/(?i-m:p)?/u",
                "regex": {
                    "pattern": "(?i-m:p)?",
                    "flags": "u"
                }
            })
        },
        {
            "type": "ExpressionStatement",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 12
                }
            },
            "range": [
                27,
                39
            ],
            "expression": conditionalRegex({
                "type": "Literal",
                "loc": {
                    "start": {
                        "line": 3,
                        "column": 0
                    },
                    "end": {
                        "line": 3,
                        "column": 11
                    }
                },
                "range": [
                    27,
                    38
                ],
                "value": null,
                "raw": "/(?ims:p)?/",
                "regex": {
                    "pattern": "(?ims:p)?",
                    "flags": ""
                }
            })
        },
        {
            "type": "ExpressionStatement",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 13
                }
            },
            "range": [
                40,
                53
            ],
            "expression": conditionalRegex({
                "type": "Literal",
                "loc": {
                    "start": {
                        "line": 4,
                        "column": 0
                    },
                    "end": {
                        "line": 4,
                        "column": 12
                    }
                },
                "range": [
                    40,
                    52
                ],
                "value": null,
                "raw": "/(?ims-:p)?/",
                "regex": {
                    "pattern": "(?ims-:p)?",
                    "flags": ""
                }
            })
        },
        {
            "type": "ExpressionStatement",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 13
                }
            },
            "range": [
                54,
                67
            ],
            "expression": conditionalRegex({
                "type": "Literal",
                "loc": {
                    "start": {
                        "line": 5,
                        "column": 0
                    },
                    "end": {
                        "line": 5,
                        "column": 12
                    }
                },
                "range": [
                    54,
                    66
                ],
                "value": null,
                "raw": "/(?-ims:p)?/",
                "regex": {
                    "pattern": "(?-ims:p)?",
                    "flags": ""
                }
            })
        }
    ],
    "sourceType": "script",
    "tokens": [
        {
            "type": "RegularExpression",
            "value": "/(?i-m:p)?/",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 11
                }
            },
            "range": [
                0,
                11
            ],
            "regex": {
                "flags": "",
                "pattern": "(?i-m:p)?"
            }
        },
        {
            "type": "Punctuator",
            "value": ";",
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
            "type": "RegularExpression",
            "value": "/(?i-m:p)?/u",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 12
                }
            },
            "range": [
                13,
                25
            ],
            "regex": {
                "flags": "u",
                "pattern": "(?i-m:p)?"
            }
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 2,
                    "column": 12
                },
                "end": {
                    "line": 2,
                    "column": 13
                }
            },
            "range": [
                25,
                26
            ]
        },
        {
            "type": "RegularExpression",
            "value": "/(?ims:p)?/",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 11
                }
            },
            "range": [
                27,
                38
            ],
            "regex": {
                "flags": "",
                "pattern": "(?ims:p)?"
            }
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 3,
                    "column": 11
                },
                "end": {
                    "line": 3,
                    "column": 12
                }
            },
            "range": [
                38,
                39
            ]
        },
        {
            "type": "RegularExpression",
            "value": "/(?ims-:p)?/",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 12
                }
            },
            "range": [
                40,
                52
            ],
            "regex": {
                "flags": "",
                "pattern": "(?ims-:p)?"
            }
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 4,
                    "column": 12
                },
                "end": {
                    "line": 4,
                    "column": 13
                }
            },
            "range": [
                52,
                53
            ]
        },
        {
            "type": "RegularExpression",
            "value": "/(?-ims:p)?/",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 12
                }
            },
            "range": [
                54,
                66
            ],
            "regex": {
                "flags": "",
                "pattern": "(?-ims:p)?"
            }
        },
        {
            "type": "Punctuator",
            "value": ";",
            "loc": {
                "start": {
                    "line": 5,
                    "column": 12
                },
                "end": {
                    "line": 5,
                    "column": 13
                }
            },
            "range": [
                66,
                67
            ]
        }
    ]
};
