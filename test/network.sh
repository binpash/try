#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
TRY="$TRY_TOP/try"

# Test if network works normally
# using curl due to #131 (1.1 expands to 1.0.0.1)
"$TRY" curl 1.1 || return 1

# Test if curl fails when network is unshared
# curl exit code 7 means Failed to connect to host.
"$TRY" -x curl 1.1
if [ $? -eq 7 ]
then
    exit 0
else
    exit 1
fi
