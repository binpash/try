#!/bin/sh

# needs-try-utils

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

badname="$(printf "this\\nsucks")"
touch "$badname" || exit 1
[ -f "$badname" ] || exit 2
# shellcheck disable=SC2016
"$TRY" -y 'rm "$(printf "this\nsucks")"' || exit 3
! [ -f "$badname" ] || exit 4
