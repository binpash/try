class C {
    // Line breaks preceded by `async` create fields by ASI.
    static
    async
    #method() {}
    
    static
    async
    * #generator() {}
    
    static
    async
    method() {}
    
    static
    async
    * generator() {}
}
