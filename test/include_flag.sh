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

# Set up expected output
touch expected.foo1 expected.foo2

# Include only changes to foo
"$TRY" -y -I foo1 -I foo2 "touch foo1.txt; touch foo2.txt; touch bar.txt" || exit 1

diff -q expected.foo1 foo1.txt || exit 2
diff -q expected.foo2 foo2.txt || exit 3
! [ -f bar.txt ] || exit 4
