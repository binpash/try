#!/bin/sh

# Test: Multiple consecutive try commands should see and modify files from previous invocations
# This tests that file content modifications accumulate across re-entries

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

    if [ -f "$expected" ]
    then
        rm "$expected"
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
expected="$(mktemp)"

# Create expected output with three lines
cat >"$expected" <<EOF
line1
line2
line3
EOF

# First invocation: create file with line1
"$TRY" -D "$try_sandbox" "echo 'line1' > /tmp/testfile.txt" || exit 1

# Second invocation: append line2
"$TRY" -D "$try_sandbox" "echo 'line2' >> /tmp/testfile.txt" || exit 2

# Third invocation: append line3
"$TRY" -D "$try_sandbox" "echo 'line3' >> /tmp/testfile.txt" || exit 3

# Verify the file has all three lines in upperdir
diff -q "$expected" "$try_sandbox/upperdir/tmp/testfile.txt" || exit 4

# Commit and verify
"$TRY" commit "$try_sandbox" || exit 5
diff -q "$expected" /tmp/testfile.txt || exit 6
