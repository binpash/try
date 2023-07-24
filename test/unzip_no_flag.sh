#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi

    if [ -f "$expected" ]
    then
        rm "$expected"
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || return 9

# Set up expected output
expected="$(mktemp)"
echo 'Hello World!' >"$expected"

cp "$TRY_TOP/test/resources/file.txt.gz" "$try_workspace/"

"$TRY" -y gunzip file.txt.gz || return 1
diff -q "$expected" file.txt
