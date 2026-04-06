/**
 * @fileoverview A function for working regex flags in tests.
 * @author Mike Reinstein
 */

/**
 * Given an AST node representing a regular expression, this function
 * determines whether or not to create a RegExp object to use in the
 * value property of the node. This is because not all Node.js versions
 * support all RegExp flags, in which case the value property should be
 * null.
 * @param {ASTNode} literalNode The node to work on.
 * @returns {ASTNode} The node that was passed in.
 */
export default function(literalNode) {
    if (literalNode.regex) {
        try {
            literalNode.value = new RegExp(literalNode.regex.pattern, literalNode.regex.flags);
        } catch {
            literalNode.value = null;
        }
    }
    return literalNode;
}

/*
Example usage:

conditionalRegex({
    "type": "Literal",
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
    "range": [
        10,
        16
    ],
    "value": null,
    "raw": "/foo/y",
    "regex": {
        "pattern": "foo",
        "flags": "y"
    }
})

*/
