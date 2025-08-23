#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || exit 9

echo hi >expected.out

cat >explore.exp <<EOF
#!/usr/bin/env expect

set timeout 3

spawn "$TRY" explore
expect {
    # Ignore the warnings
    "Warning*" {
        exp_continue
    }
    # When we get the prompt, send the command
    "#*" {
        send -- "echo hi>test.txt\r"
    }
  }
expect "#"
# Send exit
send \x04

# Ignore all output and just send a y at the end
expect ""
expect "Commit*"
send -- "y\r"
expect eof
EOF

# Debug using the -d flag
expect explore.exp >/dev/null || exit 1

diff -q expected.out test.txt
