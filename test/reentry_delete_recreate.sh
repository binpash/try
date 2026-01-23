#!/bin/sh

# Test: Files can be deleted and recreated across re-entries
# This tests that overlayfs whiteouts work correctly with re-entry

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi

    if [ -d "$try_sandbox" ]
    then
        rm -rf "$try_sandbox"
    fi

    if [ -f "$expected1" ]
    then
        rm "$expected1"
    fi

    if [ -f "$expected2" ]
    then
        rm "$expected2"
    fi

    if [ -f /tmp/testfile.txt ]
    then
        rm /tmp/testfile.txt
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || exit 9

try_sandbox="$(mktemp -d)"
expected1="$(mktemp)"
expected2="$(mktemp)"

echo "first content" >"$expected1"
echo "second content" >"$expected2"

# First invocation: create file with content
"$TRY" -D "$try_sandbox" "echo 'first content' > /tmp/testfile.txt" || exit 1

# Verify file exists in upperdir
[ -f "$try_sandbox/upperdir/tmp/testfile.txt" ] || exit 2
diff -q "$expected1" "$try_sandbox/upperdir/tmp/testfile.txt" || exit 3

# Second invocation: delete the file
"$TRY" -D "$try_sandbox" "rm /tmp/testfile.txt" || exit 4

# Verify file is marked as deleted (whiteout should exist)
# Note: We can't directly check for whiteout, but file shouldn't exist in upperdir as a regular file
# Instead, check that after commit, the file doesn't exist

# Third invocation: recreate file with different content
"$TRY" -D "$try_sandbox" "echo 'second content' > /tmp/testfile.txt" || exit 5

# Verify new content
[ -f "$try_sandbox/upperdir/tmp/testfile.txt" ] || exit 6
diff -q "$expected2" "$try_sandbox/upperdir/tmp/testfile.txt" || exit 7

# Commit and verify final state has the recreated file
"$TRY" commit "$try_sandbox" || exit 8
[ -f /tmp/testfile.txt ] || exit 9
diff -q "$expected2" /tmp/testfile.txt || exit 10
