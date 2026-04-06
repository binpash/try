async function f() {
    class C {
        // `await` is an identifier reference in field initializers even if it's in async function body.
        // But ES modules disallow `await` as identifier references.
        // Therefore, it's Identifier in script and it's syntax error in module.
        aaa = await
    }
}
