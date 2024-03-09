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

    if [ -f "$target" ]
    then
        rm "$target"
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || return 9
touch test

# Set up expected output
expected="$(mktemp)"
ls -l >"$expected"

# Set up target output
target="$(mktemp)"

sudo "$TRY" ls -l | tee "$target" || return 1
diff -q "$expected" "$target"
