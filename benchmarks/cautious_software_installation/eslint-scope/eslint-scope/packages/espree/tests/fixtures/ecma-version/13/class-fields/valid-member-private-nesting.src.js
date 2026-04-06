class Outer {
    // Inner classes can access the private fields of outer classes.
    #a;
    Inner = class {
        #b;
        f(x, y) {
            x.#a + y.#b
        }
    }
}
