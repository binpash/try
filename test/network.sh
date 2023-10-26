#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
TRY="$TRY_TOP/try"

# Test if network works normally
"$TRY" curl 1.1 || return 1

# Test if ping fails when network is unshared
# curl exit code 7 means Failed to connect to host.
"$TRY" -x curl 1.1
if [ $? -eq 7 ]; then
    return 0;
else
    return 1;
fi
