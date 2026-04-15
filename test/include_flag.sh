#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -n "${try_workspace-}" ] && [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi

    if [ -n "${sandbox_dir-}" ] && [ -d "$sandbox_dir" ]
    then
        rm -rf "$sandbox_dir" >/dev/null 2>&1
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || exit 9

sandbox_dir=$("$TRY" -n 'touch keep.txt drop.txt; mkdir -p keepdir/sub; touch keepdir/sub/file.txt') || exit 1

summary_output=$("$TRY" -I 'keep.txt:keepdir' diff "$sandbox_dir") || exit 2

printf '%s\n' "$summary_output" | grep -F -q " $try_workspace/keep.txt" || exit 3
printf '%s\n' "$summary_output" | grep -F -q " $try_workspace/keepdir" || exit 4
printf '%s\n' "$summary_output" | grep -q 'drop.txt' && exit 5

"$TRY" -I 'keep.txt:keepdir' commit "$sandbox_dir" || exit 6

[ -f keep.txt ] || exit 7
[ -f keepdir/sub/file.txt ] || exit 8
! [ -e drop.txt ] || exit 10
