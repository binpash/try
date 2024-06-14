#!/bin/sh

# needs-try-utils

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
cd "$try_workspace" || exit 99

! [ -e f ] || exit 1
sandbox=$("$TRY" -n "echo hi>f")
# shellcheck disable=SC2181
[ "$?" = 0 ] || exit 2
[ -d "$sandbox" ] || exit 3
[ -d "$sandbox/upperdir" ] || exit 4
[ -f "$sandbox/upperdir/$try_workspace/f" ] || exit 5
[ "$(cat "$sandbox/upperdir/$try_workspace/f")" = "hi" ] || exit 6
try-summary "$sandbox" | grep -q "$try_workspace/f (added)" || exit 7
! [ -e f ] || exit 8
try-commit -c "$sandbox" || exit 9
[ -f f ] || exit 10
[ "$(cat f)" = "hi" ] || exit 11
[ -f "$sandbox/upperdir/$try_workspace/f" ] || exit 12
[ "$(cat "$sandbox/upperdir/$try_workspace/f")" = "hi" ] || exit 13
