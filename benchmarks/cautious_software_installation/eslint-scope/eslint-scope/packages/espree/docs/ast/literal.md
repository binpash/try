# Literal

A `Literal` node represents a literal value in JavaScript. Literal values are:

* Boolean values - `true` and `false`
* Numeric values such as `1` and `10.0`
* String values such as `"foo"`
* Regular expressions such as `/foo/g`.

Literal AST nodes have the following properties:

* `type` - always `"Literal"`
* `value` - the JavaScript representation of the literal if it's possible to create. For instance, this will be a JavaScript number if the literal represents a number, a regular expression if the literal represents a regular expression and the current engine can properly create the regular expression object, and so on.
* `regex` - only present for regular expression literals and has the following properties:
    * `pattern` - the regular expression pattern.
    * `flags` - any flags applied to the pattern.

**Note:** The `regex` property is a custom property and is not present in the SpiderMonkey Parser API.

Additionally, literal AST nodes have all the standard properties of nodes. Here's a complete example:

```json
{
    "range": [
        10,
        16
    ],
    "loc": {
        "start": {
            "line": 1,
            "column": 10
        },
        "end": {
            "line": 1,
            "column": 16
        }
    },
    "type": "Literal",
    "value": null,
    "regex": {
        "pattern": "foo",
        "flags": "y"
    },
    "raw": "/foo/y"
}
```
