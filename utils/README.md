This directory contains C code (GNU dialect, Linux only) that summarizes and commits the changes from `try`, in `try-summary` and `try-commit`, respectively.

You do _not_ need these utilities to use `try`, which has POSIX shell fallback implementations.

Every time `try` starts up, it looks for these executables on its path; if found, it will use them---otherwise it will use the shell fallbacks.

# Development

These are meant to short, simple scripts.

In order to make sure that we keep them parallel, both files are annotated with `TRYCASE(changed, local)` forms in comments that identify which case is being handled.

Here `changed` and `local` adhere to `lf` the following grammar:

```
changed ::= f | opaque | whiteout
local ::= f | *
f ::= file | dir | symlink | nonexist
```

The script `../scripts/check_trycase.sh` will check to make sure that all cases are considered (excepting `TRYCASE(opaque, nonexist)`, which should not happen). If new files need to do a case analysis on how changed files and local files relate, annotate each case with `// TRYCASE(cf, lf)` and add a `check_file` call to the `check_trycase.sh` script.

## Assumptions

We rely on `user.overlay.opaque` to be set for opaque directories, which we can assume will happen because `try` sets `-o userxattr` when it mounts the overlay.

We do not handle [redirect directories](https://docs.kernel.org/filesystems/overlayfs.html#redirect-dir), instead relying on `cp`/`mv` to do the copying.

We have not seen `user.overlay.whiteout` in practice---perhaps it only gets made when you can't `mknod` a `(0,0)` character device on the upperdir filesystem?
