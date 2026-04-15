#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -n "${try_workspace-}" ] && [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || exit 9

"$TRY" --help >help.out 2>help.err || exit 1

grep -q '^Usage:' help.err || exit 2
grep -q -- '--help' help.err || exit 3
! [ -s help.out ] || exit 4
