This directory contains C code (GNU dialect, Linux only) that summarizes and commits the changes from `try`, in `try-summary` and `try-commit`, respectively.

You do _not_ need these utilities to use `try`, which has POSIX shell fallback implementations.

Every time `try` starts up, it looks for these executables on its path; if found, it will use them---otherwise it will use the shell fallbacks.

# Development

These are meant to short, simple scripts.

In order to make sure that we keep them parallel, both files are
annotated with `TRYCASE(changed, local)` forms in comments that
identify which case is being handled.

Here `changed` and `local` adhere to the following grammar:

```
f ::= file | dir | nonexist | opaque | whiteout | symlink | * | !f
```
