# Tokens

TODO




## Regular Expression Tokens

Regular expression tokens have a custom `regex` property that contains two subproperties: `pattern` and `flags`.


```json
{
    "type": "RegularExpression",
    "value": "/[x-z]/i",
    "regex": {
        "pattern": "[x-z]",
        "flags": "i"
    },
    "range": [
        8,
        16
    ]
}
```
