// For compatibility, syntax that looks like `using` but is not `using`.
{ using [a, b] = arr; } // { using[(a, b)] = arr; }
{ using
    x = foo(); } // { using; x = foo(); }
async function fn() {
    { await using
        x = foo(); } // await using; x = foo();
}

// `using` identifiers.
for (using of foo()) {}
using = 5;
