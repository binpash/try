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
cp "$TRY_TOP/test/resources/file.txt.gz" "$try_workspace/"
cd "$try_workspace" || exit 9

# Set up expected output
expected="$(mktemp)"
echo 'TesT' >"$expected"

"$TRY" 'echo test | tr t T' >out.txt || exit 1

diff -q "$expected" out.txt
