% TRY(1) Version 0.1 | Do, or do not. There is no *try*.
% Michael Greenberg

# NAME

try - run a command in an overlay

# SYNOPSIS
| try [-nvh] [-D DIR] CMD [ARG ...]


# DESCRIPTION

*try* lets you run a command inside an overlay without modifying the state of the filesystem.

While using *try* you can choose to commit the result to the filesystem or completely ignore it without any side-effect to the main file system.

## Flags

-n

: Don't prompt for commit

-v

: Show version information (and exit)
  
-h

: Show a usage message (and exit)


## Options

-D *DIR*

: Sets DIR as the working directory (implies -n)

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

TODO

# SEE ALSO

chroot(1), unshare(1)

# BUGS

See
[https://github.com/binpash/try/issues](https://github.com/binpash/try/issues).

# LICENSE

Copyright (c) 2020 The PaSh Authors. MIT licensed.
