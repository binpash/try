{
    using x = foo();
    using a = foo(), b = bar();
}
for (using x of foo()) {}
async function fn() {
    await using x = foo();
    await using a = foo(), b = bar();
    for (await using x of foo()) {}
}
