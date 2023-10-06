% TRY(1) try 0.1.0 | Do, or do not. There is no *try*.
% The PaSh Authors

# NAME

try - run a command in an overlay

# SYNOPSIS
| try [-ny] [-i PATTERN] [-D DIR] [-U PATH] [-L LOWER_DIRS] CMD [ARG ...]
| try summary [DIR]
| try commit [DIR]
| try explore
| try -v
| try -h

# DESCRIPTION

*try* lets you run a command inside an overlay without modifying the state of the filesystem.

While using *try* you can choose to commit the result to the filesystem or completely ignore it without any side-effect to the main file system.

## Flags

-n

: Don't prompt for commit. Just return the overlay directory.

-y

: Assume yes to all prompts (implies -n is not used)

-v

: Show version information (and exit)

-h

: Show a usage message (and exit)


## Options

-i *PATTERN*

: Ignore paths that match *PATTERN* on summary and commit. This option can be passed multiple times; the patterns given will be used in as arguments to `-e` in a call to `grep -v`.

-D *DIR*

: Specify *DIR* as the overlay directory (implies -n). The use of -D also implies that *DIR* already exists.

-U *PATH*

: Use the unionfs helper implementation defined in the *PATH* (e.g., mergerfs, unionfs-fuse) instead of the default.
This option is recommended in case OverlayFS fails.

-L *LOWER_DIRS*

: Specify a colon-separated list of directories to be used as lower directories for the overlay, formatted as "dir1:dir2:...:dirn".


## Subcommands

try summary *DIR*

: Show the summary for the overlay in *DIR*

try commit *DIR*

: Commit the overlay in *DIR*

try explore

: Run in interactive mode

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

The general workflow is to *try* a command before committing its results to your workspace.

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

Sometimes, you might want to pre-execute a command and commit its result at a later time. Invoking *try* with the -n flag will return the overlay directory, without committing the result.

```
try -n gunzip file.txt.gz
```

Alternatively, you can specify your own overlay directory as follows (note that *try_dir* already exists):

```
try -D try_dir gunzip file.txt.gz
```

To use multiple lower directories for overlay (by merging them), you can use the `-L` flag followed by a colon-separated list of directories. The directories on the left have higher precedence and can overwrite the directories on the right:

```
try -L /lowerdir1:/lowerdir2:/lowerdir3 gunzip file.txt.gz
```

You can inspect the changes made inside a given overlay directory:

```
try summary try_dir
```

You can also choose to commit the overlay directory contents:

```
try commit try_dir
```

# SEE ALSO

chroot(1), unshare(1)
Alternative tool [checkinstall](http://checkinstall.izto.org/) (unmaintained)

# BUGS

See
[https://github.com/binpash/try/issues](https://github.com/binpash/try/issues).

# LICENSE

Copyright (c) 2023 The PaSh Authors. MIT licensed.
