% TRY(1) try 0.2.0 | Do, or do not. There is no *try*.
% The PaSh Authors

# NAME

try - run a command in an overlay

# SYNOPSIS
| try [-enNvyhxt] [-i PATTERN] [-I PATHS] [-D DIR] [-U PATH] [-L LOWER_DIRS] [-E PATHS] [-t FILE] CMD [ARG ...]
| try --help
| try -s DIR [-h] [-i PATTERN] [-I PATHS]
| try summary DIR
| try commit DIR
| try explore [DIR]
| try diff DIR
| try --diff DIR
| try -v

# DESCRIPTION

*try* lets you run a command inside an overlay without modifying the state of the filesystem.

While using *try* you can choose to commit the result to the filesystem or completely ignore it without any side-effect to the main file system.

You can also choose your own shell when running *try*. *try* will run your command within your login shell by default; you can override this by setting the *TRY_SHELL* variable to the absolute path of a shell to use

## Flags

-e

: Inspect the effect list and apply only the retained lines.

-n

: Don't commit or prompt for commit. Just return the overlay directory. Overrides -y.

-N

: Alias for -n.

-y

: Assume yes to all prompts. Overrides -n.

-v

: Show version information (and exit).

--help

: Show a usage message (and exit).

-h

: Print the human-readable summary instead of raw effect codes.

-x

: Prevent network access (by unsharing the network namespace).


## Options

-i *PATTERN*

: Ignore paths that match *PATTERN* on summary and commit. This option can be passed multiple times.

-I *PATHS*

: Keep only effects for the listed paths. *PATHS* is a colon-separated list, for example `foo.txt:bar:baz/qux`.

-D *DIR*

: Specify *DIR* as the overlay directory (implies -n). *DIR* must already exist.

-U *PATH*

: Use the unionfs helper implementation defined in the *PATH* (e.g., mergerfs, unionfs-fuse) instead of the default.
This option is recommended in case OverlayFS fails.

-t *FILE*

: Create a filesystem trace and write it to *FILE* when effects are committed.

-L *LOWER_DIRS*

: Specify a colon-separated list of directories to be used as lower directories for the overlay, formatted as "dir1:dir2:...:dirn" (implies -n).

-E *PATHS*

: Hide the listed paths from the invoked command. *PATHS* is a colon-separated list.

-s *DIR*

: Show the summary for the overlay in *DIR*. This is equivalent to `try summary DIR`.

## Subcommands

try summary *DIR*

: Show the summary for the overlay in *DIR*.

try commit *DIR*

: Commit the overlay in *DIR*.

try explore [*DIR*]

: Start a shell inside the overlay in *DIR*. If *DIR* is omitted, *try* creates a fresh overlay first.

try diff *DIR*

: Show the raw effect delta for the overlay in *DIR*.

try --diff *DIR*

: Alias for `try diff DIR`.

## Arguments

*CMD*

: Specifies the command to execute inside the overlay.

*ARG*

: The arguments of *CMD*.

# EXIT STATUS

0

: Command ran successfully.

1

: Consistency error/failure.

2

: Input or other internal error.

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

To review and selectively apply only some effects, you can invoke *try* with `-e`:

```
try -e sh -c 'echo keep > keep.txt; echo drop > drop.txt'
```

You can inspect the changes made inside a given overlay directory:

```
try summary try_dir
```

You can also choose to commit the overlay directory contents:

```
try commit try_dir
```

You can inspect the raw effect delta for a saved overlay:

```
try diff try_dir
```

# SEE ALSO

checkinstall(1), chroot(1), unshare(1), mount_namespaces(7), namespaces(7), mount(8)

# BUGS

See
[https://github.com/binpash/try/issues](https://github.com/binpash/try/issues).

# LICENSE

Copyright (c) 2023 The PaSh Authors. MIT licensed.
