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

badname="$(printf "this\\nsucks")"
touch "$badname" || return 1
[ -f "$badname" ] || return 2
# shellcheck disable=SC2016
"$TRY" -y 'rm "$(printf "this\nsucks")"' || return 3
! [ -f "$badname" ] || return 4
