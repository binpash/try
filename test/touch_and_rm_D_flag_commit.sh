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

    if [ -f "$expected1" ]
    then
        rm "$expected1"
    fi

    if [ -f "$expected2" ]
    then
       rm "$expected2"
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cp "$TRY_TOP/test/resources/file.txt.gz" "$try_workspace/"
cd "$try_workspace" || exit 9

expected1="$(mktemp)"
expected2="$(mktemp)"
touch "$expected1"
echo 'test' >"$expected2"

try_example_dir="$(mktemp -d)"
"$TRY" -D "$try_example_dir" "touch file_1.txt; echo test >file_2.txt; rm file.txt.gz" || exit 1
"$TRY" commit "$try_example_dir" || exit 2

diff -q "$expected1" file_1.txt || exit 3
diff -q "$expected2" file_2.txt || exit 4
! [ -f file.txt.gz ] || exit 5
