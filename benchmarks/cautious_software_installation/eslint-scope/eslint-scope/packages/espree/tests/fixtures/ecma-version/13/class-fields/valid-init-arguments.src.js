function f() {
    class C {
        // Field initializers disallow `arguments` reference, but it's OK in function expression body.
        aaa = function() {
            arguments
        }
    }
}
