#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo ${0%/*})}"
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
echo 'no sandbox' >expected.out

# SANDBOX_DIR should not be set in the final execution env
"$TRY" -y -- "echo \${SANDBOX_DIR-no sandbox}" >got.out 2>/dev/null || exit 1

diff -q expected.out got.out
