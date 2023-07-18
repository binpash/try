The [POSIX
shell](https://pubs.opengroup.org/onlinepubs/9699919799/idx/shell.html)
is a tricky programming language. Here are the style guidelines for
`try`.

# Indentation and whitespace

Indent four spaces. Do not use tabs. Blank lines should have no
whitespace; there should be no trailing whitespace on lines. Try to
avoid line continuations.

Align the commands of a case:

```sh
case "$1" in
    (summary) : ${SANDBOX_DIR=$2}
              summary;;
    (commit)  : ${SANDBOX_DIR=$2}
              commit;;
    (explore) : ${SANDBOX_DIR=$2}
              try "$SHELL";;
    (--)      shift
              try "$@";;
    (*)       try "$@";;
esac
```

# Write POSIX code

Do not use:

  - `<(command substitutions)`
  - `(( static arithmetic expression ))`
  - `[[ static test expressions ]]`
  - `array=(assignment)` or `${array[access]}`
  - the `function` keyword
  - `brace{expansion,}`
  - `${param:offset}`, `${!matching}`, `${pattern/substi/tution}`
  - `source` (it's called `.`)

Do not use `LOCAL_ASSIGNMENT=foo f` when `f` could be a function.

Write:

```sh
VAR_NAME=value
export VAR_NAME
```

# Quoting

It is better to be safe than sorry.

# Variables

Use alphabetical names with underscores for word separations.

Variables which live past their scope should be `CAPITALIZED_LIKE_THIS`. Local
variables should be `lowercase_like_this`. The `local` keyword is unspecified in
POSIX and should not be used.

Do not use braces for variable references: every POSIX shell will
correctly parse `"$SANDBOX_DIR/workdir"` with `SANDBOX_DIR` as the
variable name. You only need braces when sticking on valid variable
name characters, like in `${SANDBOX_DIR}2`.

# Command substitutions

Always use `$(...)`; never use backticks.

# Function definitions

Function names are `in_lowercase_please`. Put a function header above
function definitions. (Exception: generated scripts can be terser, but
should still include important comments.) Always use braces in a
function definition, starting on the same line after a space. Unless
you are using `$@`, rename positional parameters. Avoid obscure
calling conventions: either use `$@` or name your parameters.

```sh
################################################################################
# Summarize an overlay
################################################################################

summary() {
    ...
}
```

# Commands

Redirections go at the end of commands. There should be no spaces
anywhere in a redirect: write `2>/dev/null`, not `2> /dev/null`.

Prefer `echo` when possible (but only use POSIX flags).

Call it `[`, not `test`. Prefer `&&` and `||` over `-a` and `-o` when
using `[`, but definitely use them for `find`.

Use `[ "..." ]` to test whether `...` is empty or not; there is no
reason to use `-n`. Do not forget quotes, though!

When using `case`, put the `;;` on the last command (not its own
line). Do not omit the `;;` on the last case. Use both parentheses for
each case, even though the left-hand one is optional.

## Semicolons

Avoid semicolons in control flow. Write:

```sh
if [ ... ]
then
    ...
fi
```

The shell is terse enough without any effort on your part. Don't write
`c1; c2`; write:

```sh
c1
c2
```
