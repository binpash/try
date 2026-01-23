#!/bin/sh

# Test: Each re-entry should create a unique workdir directory
# This verifies the fix for overlayfs workdir reuse issue

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

# First invocation
"$TRY" -D "$try_sandbox" "touch /tmp/file1.txt" || exit 1

# Count workdir directories (should be 1)
workdir_count=$(find "$try_sandbox" -maxdepth 1 -type d -name "workdir-*" | wc -l)
[ "$workdir_count" -eq 1 ] || exit 2

# Second invocation
"$TRY" -D "$try_sandbox" "touch /tmp/file2.txt" || exit 3

# Count workdir directories (should be 2)
workdir_count=$(find "$try_sandbox" -maxdepth 1 -type d -name "workdir-*" | wc -l)
[ "$workdir_count" -eq 2 ] || exit 4

# Third invocation
"$TRY" -D "$try_sandbox" "touch /tmp/file3.txt" || exit 5

# Count workdir directories (should be 3)
workdir_count=$(find "$try_sandbox" -maxdepth 1 -type d -name "workdir-*" | wc -l)
[ "$workdir_count" -eq 3 ] || exit 6

# Verify all files still exist in upperdir despite multiple workdirs
[ -f "$try_sandbox/upperdir/tmp/file1.txt" ] || exit 7
[ -f "$try_sandbox/upperdir/tmp/file2.txt" ] || exit 8
[ -f "$try_sandbox/upperdir/tmp/file3.txt" ] || exit 9
