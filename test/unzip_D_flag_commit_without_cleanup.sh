#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo ${0%/*})}"
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
cd "$try_workspace" || exit 9

cp "$TRY_TOP/test/resources/file.txt.gz" "$try_workspace/"
try_example_dir="$(mktemp -d)"

"$TRY" -D "$try_example_dir" gunzip file.txt.gz || exit 1
if ! [ -d "$try_example_dir" ]
then
    echo "try_example_dir disappeared with no commit"
    exit 2
fi
"$TRY" commit "$try_example_dir" || exit 3
if ! [ -d "$try_example_dir" ]
then
    echo "try_example_dir disappeared after manual commit"
    exit 4
fi
