function f() {
    class C {
        // `arguments` in computed keys is allowed (on the other hand, disallowed in field initializers).
        [arguments] = 0
    }
}
