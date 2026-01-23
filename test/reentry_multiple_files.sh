#!/bin/sh

# Test: Multiple consecutive try commands with -D should accumulate file changes
# This tests that each invocation sees changes from previous invocations

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
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || exit 9

try_sandbox="$(mktemp -d)"

# First invocation: create file1.txt
"$TRY" -D "$try_sandbox" "touch /tmp/file1.txt" || exit 1

# Second invocation: create file2.txt
"$TRY" -D "$try_sandbox" "touch /tmp/file2.txt" || exit 2

# Third invocation: create file3.txt
"$TRY" -D "$try_sandbox" "touch /tmp/file3.txt" || exit 3

# Verify all three files exist in the upperdir
[ -f "$try_sandbox/upperdir/tmp/file1.txt" ] || exit 4
[ -f "$try_sandbox/upperdir/tmp/file2.txt" ] || exit 5
[ -f "$try_sandbox/upperdir/tmp/file3.txt" ] || exit 6

# Commit and verify all files are present
"$TRY" commit "$try_sandbox" || exit 7

[ -f /tmp/file1.txt ] || exit 8
[ -f /tmp/file2.txt ] || exit 9
[ -f /tmp/file3.txt ] || exit 10

# Cleanup committed files
rm -f /tmp/file1.txt /tmp/file2.txt /tmp/file3.txt
