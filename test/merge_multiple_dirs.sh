#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi

    if [ -f "$try_example_dir1" ]
    then
        rm "$try_example_dir1"
    fi

    if [ -f "$try_example_dir2" ]
    then
        rm "$try_example_dir2"
    fi

    if [ -f "$try_example_dir3" ]
    then
        rm "$try_example_dir3"
    fi

    if [ -f "$expected1" ]
    then
       rm "$expected1"
    fi

    if [ -f "$expected2" ]
    then
       rm "$expected2"
    fi
    if [ -f "$expected3" ]
    then
       rm "$expected3"
    fi

    if [ -f "$expected4" ]
    then
       rm "$expected4"
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d -p .)"
cp "$TRY_TOP/test/resources/file.txt.gz" "$try_workspace/"
cd $try_workspace

try_example_dir1="$(mktemp -d)"
try_example_dir2="$(mktemp -d)"
try_example_dir3="$(mktemp -d)"

expected1="$(mktemp)"
expected2="$(mktemp)"
expected3="$(mktemp)"

touch "$expected1"
echo "test2" > $expected2
echo "test3" > $expected3

"$TRY" -D "$try_example_dir1" "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz" || return 1
"$TRY" -D "$try_example_dir2" "echo test2 > file_2.txt" || return 2
"$TRY" -D "$try_example_dir3" "echo test3 > file_3.txt" || return 3
"$TRY" -L "$try_example_dir3:$try_example_dir2:$try_example_dir1" -y "cat file_1.txt > out1; cat file_2.txt > out2; cat file_3.txt > out3"|| return 4

diff -q "$expected1" out1 || return 5
diff -q "$expected2" out2 || return 6
diff -q "$expected3" out3 || return 7

! [ -f out4 ] || return 8
