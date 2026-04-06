class Outer {
    Inner = class {
        f(x, y) {
            // OK even if the private fields are defined after use.
            x.#a + y.#b
        }
        #b;
    }
    #a;
}
