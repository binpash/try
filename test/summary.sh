#!/bin/sh

TRY_TOP="${TRY_TOP-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
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

# Set up expected output
touch expected1.txt
echo 'test' >expected2.txt

echo 'fail' >file_2.txt
touch target

try_example_dir=$(mktemp -d)
"$TRY" -D "$try_example_dir" "touch file_1.txt; echo test >file_2.txt; rm file.txt.gz; rm target; mkdir target; mkdir -p new_dir/nested" || exit 1
"$TRY" summary "$try_example_dir" >summary.out || exit 2

cat summary.out

# Check that the summary correctly identifies every change
grep -qx -e "$PWD/file_1.txt (added)"           summary.out || exit 3
grep -qx -e "$PWD/file_2.txt (modified)"        summary.out || exit 4
grep -qx -e "$PWD/file.txt.gz (deleted)"        summary.out || exit 5
grep -qx -e "$PWD/target (replaced with dir)"   summary.out || exit 6
grep -qx -e "$PWD/new_dir (created dir)"        summary.out || exit 7
grep -qx -e "$PWD/new_dir/nested (created dir)" summary.out || exit 8
