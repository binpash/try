This directory contains C code (GNU dialect, Linux only) that summarizes and commits the changes from `try`, in `try-summary` and `try-commit`, respectively.

You do _not_ need these utilities to use `try`, which has POSIX shell fallback implementations.

Every time `try` starts up, it looks for these executables on its path; if found, it will use them---otherwise it will use the shell fallbacks.

# Development

These are meant to short, simple scripts.

In order to make sure that we keep them parallel, both files are
annotated with `TRYCASE(changed, local)` forms in comments that
identify which case is being handled.

Here `changed` and `local` adhere to `lf` the following grammar:

```
changed ::= f | opaque | whiteout
local ::= f | *
f ::= file | dir | symlink | nonexist
```

The script `../scripts/check_trycase.sh` will check to make sure that all cases are considered (excepting `TRYCASE(opaque, nonexist)`, which should not happen). If new files need to do a case analysis on how changed files and local files relate, annotate each case with `// TRYCASE(cf, lf)` and add a `check_file` call to the `check_trycase.sh` script.
