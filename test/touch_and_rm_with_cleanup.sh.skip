#!/bin/sh

TRY_TOP=${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}
TRY="$TRY_TOP/try"
RESOURCE_DIR="$TRY_TOP/test/resources"

cleanup() {
    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace"
    fi

    if [ -d "$try_example_dir" ]
    then
        rm -rf "$try_example_dir"
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"

cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
cd "$try_workspace/"

: ${TMPDIR=/tmp}

orig_tmp=$(ls "$TMPDIR")
"$try" -y -- "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz" || return 1
new_tmp=$(ls "$TMPDIR")

if ! diff -q <(echo "$orig_tmp") <(echo "$new_tmp")
then
    echo "temporary directory was not cleaned up; diff:"
    diff --color -u <(echo "$orig_tmp") <(echo "$new_tmp")
    return 1
fi
