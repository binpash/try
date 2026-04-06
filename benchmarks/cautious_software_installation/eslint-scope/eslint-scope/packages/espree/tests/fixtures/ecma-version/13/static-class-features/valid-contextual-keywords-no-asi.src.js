class C {
    // Line breaks don't make fields by ASI.
    static
    get(){}

    static
    set(x){}

    static
    async(){}

    static
    get
    staticGetter(){}

    static
    set
    staticGetter(x){}

    static
    *
    staticGenerator(){}

    static
    async staticAsyncMethod(){}

    static
    async*
    staticAsyncGenerator(){}
}
