#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
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
cd "$try_workspace" || return 9

# Set up expected output
touch expected.bar

# Ignore changes to foo
"$TRY" -y -i foo1 -i foo2 "touch foo1.txt; touch foo2.txt; touch bar.txt" || return 1

diff -q expected.bar bar.txt || return 2
! [ -f foo1.txt ] || return 3
! [ -f foo2.txt ] || return 4
