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
cp "$TRY_TOP/test/resources/file.txt.gz" "$try_workspace/"
cd "$try_workspace" || return 9

try_example_dir=$(mktemp -d)
"$TRY" -D "$try_example_dir" "touch file_1.txt; echo test >file_2.txt; rm file.txt.gz" || return 1

# KK 2023-06-29 This test is meant to modify the sandbox directory in an illegal way,
#               at the moment, this modification will be caught as illegal by `try`,
#               but it doesn't seem to both overlayfs at all.
# TODO: Extend this with more problematic overlayfs modifications.
touch "$try_example_dir/temproot/etc/foo"
! "$TRY" -D "$try_example_dir" "rm file_1.txt; echo test2 >>file_2.txt; touch file.txt.gz" 2>/dev/null
