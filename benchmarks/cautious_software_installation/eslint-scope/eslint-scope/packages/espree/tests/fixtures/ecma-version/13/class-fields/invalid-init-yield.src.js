function* f() {
    class C {
        // `yield` is an identifier reference in field initializers even if it's in a generator function.
        // But `yield` as identifier references is disallowed in strict mode.
        // And the inside of classes is always strict mode.
        // Therefore this is a syntax error.
        aaa = yield
    }
}
