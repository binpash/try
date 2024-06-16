#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi

    # shouldn't fire
    if [ -d "$try_example_dir" ]
    then
        rm -rf "$try_example_dir"
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cp "$TRY_TOP/test/resources/file.txt.gz" "$try_workspace/"
cd "$try_workspace" || exit 9

try_example_dir="non-existent"
! [ -d "$try_example_dir" ] || exit 2
! "$TRY" -D $try_example_dir "touch file_1.txt" 2>/dev/null &&
! "$TRY" summary $try_example_dir 2>/dev/null &&
! "$TRY" commit $try_example_dir 2>/dev/null &&
! "$TRY" explore $try_example_dir 2>/dev/null
