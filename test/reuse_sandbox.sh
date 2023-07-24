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
cd "$try_workspace" || return 9

expected1="$(mktemp)"
expected2="$(mktemp)"
echo test >"$expected1"
echo test2 >>"$expected1"
touch "$expected2"

try_example_dir="$(mktemp -d)"
"$TRY" -D "$try_example_dir" "touch file_1.txt; echo test >file_2.txt; rm file.txt.gz" || return 1
"$TRY" -D "$try_example_dir" "rm file_1.txt; echo test2 >>file_2.txt; touch file.txt.gz" || return 2
"$TRY" commit "$try_example_dir" || return 3

! [ -f file_1.txt ] || return 4
diff -q "$expected1" file_2.txt || return 5
diff -q "$expected2" file.txt.gz || return 6
