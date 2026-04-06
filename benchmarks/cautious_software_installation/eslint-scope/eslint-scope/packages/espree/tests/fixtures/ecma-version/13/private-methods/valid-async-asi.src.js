class C {
    // Line breaks preceded by `async` create fields by ASI.
    async
    #method() {}
    
    async
    * #generator() {}
}
