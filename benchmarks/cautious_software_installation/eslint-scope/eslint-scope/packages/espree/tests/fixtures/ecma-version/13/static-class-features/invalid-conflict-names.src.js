class C {
    // getter/setter pair conflicts if `static` attributes are different.
    // (static members and instance members are on the same namespace about naming conflicts.)
    get #a() {}
    static set #a(x) {}
}
