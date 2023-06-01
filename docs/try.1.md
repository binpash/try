% TRY(1) Version 0.1 | Do, or do not. There is no *try*.
% Michael Greenberg

# NAME

try - run a command in an overlay

# SYNOPSIS
| try [-n] [-D DIR] CMD [ARG ...]
| try summary [DIR]
| try commit [DIR]
| try -v
| try -h

# DESCRIPTION

*try* lets you run a command inside an overlay without modifying the state of the filesystem.

While using *try* you can choose to commit the result to the filesystem or completely ignore it without any side-effect to the main file system.

## Flags

-n

: Don't prompt for commit. Just return the overlay directory.

-v

: Show version information (and exit)
  
-h

: Show a usage message (and exit)


## Options

-D *DIR*

: Specifies DIR as the overlay directory (implies -n). The use of -D also implies that *DIR* already exists.

## Subcommands

try summary *DIR*   

: Show the summary for the overlay in DIR

try commit *DIR*

: Commit the overlay in DIR

## Arguments
 
*CMD*

: Specifies the command to execute inside the overlay

*ARG*

: The arguments of *CMD*

# EXIT STATUS

0

: Command ran successfully

1

: Consistency error/failure

2

: Input error

# EXAMPLES

The general workflow is to *try* a command before commiting its results to your workspace. 

To uncompress a gzip file, you can invoke *try* as follows

```
try gunzip file.txt.gz
```

By default, *try* will ask you to commit the changes made at the end of its execution.

```
Changes detected in the following files:

/tmp/tmp.0caZdxnHuR/upperdir/home/me/file.txt
/tmp/tmp.0caZdxnHuR/upperdir/home/me/file.txt.gz

Commit these changes? [y/N] y
```

Sometimes, you might want to pre-execute a command and commit its result at a later time. Invoking *try* with the -n flag will return the overlay directory, wothout committing the result.

```
try -n gunzip file.txt.gz
```

Alternatively, you can specify your own overlay directory as follows (note that *try_dir* already exists):

```
try -D try_dir gunzip file.txt.gz
```

You can inspect the changhes made inside a given overlay directory:

```
try summary try_dir
```

You can also choose to commit the overlay directory contents:

```
try commit try_dir
```

# SEE ALSO

chroot(1), unshare(1)

# BUGS

See
[https://github.com/binpash/try/issues](https://github.com/binpash/try/issues).

# LICENSE

Copyright (c) 2023 The PaSh Authors. MIT licensed.
