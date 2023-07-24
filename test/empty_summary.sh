#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi

    if [ -d "$try_example_dir" ]
    then
        rm -rf "$try_example_dir"
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || return 9

try_example_dir="$(mktemp -d)"
"$TRY" -D "$try_example_dir" -- echo hi >/dev/null || return 1
"$TRY" summary "$try_example_dir" >summary.out

# an empty summary returns exit status 1
[ "$?" -eq 1 ] || return 2

# We want to return true if the following line is not found!
! grep -q -e "Changes detected in the following files:" summary.out
