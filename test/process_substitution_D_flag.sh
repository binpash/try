#!/bin/sh

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
        rm -rf "$try_sandbox" >/dev/null 2>&1
    fi
}

trap 'cleanup' EXIT

if ! command -v bash >/dev/null 2>&1
then
    exit 0
fi

try_workspace="$(mktemp -d)"
try_sandbox="$(mktemp -d)"
cd "$try_workspace" || exit 9

TRY_SHELL="$(command -v bash)" \
    "$TRY" -D "$try_sandbox" 'diff <(printf "alpha\n") <(printf "alpha\n")' || exit 1
