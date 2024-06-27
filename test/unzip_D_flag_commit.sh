#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
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

    if [ -f "$expected" ]
    then
        rm "$expected"
    fi
}

trap 'cleanup' EXIT

try_workspace=$(mktemp -d)
cd "$try_workspace" || exit 9

# Set up expected output
expected="$(mktemp)"
echo 'Hello World!' >"$expected"
cp "$TRY_TOP/test/resources/file.txt.gz" "$try_workspace/"

try_example_dir="$(mktemp -d)"
"$TRY" -D "$try_example_dir" gunzip file.txt.gz || exit 1
"$TRY" commit "$try_example_dir" || exit 2
diff -q "$expected" file.txt || exit 3
