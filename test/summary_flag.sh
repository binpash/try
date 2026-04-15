#!/bin/sh

TRY_TOP="${TRY_TOP-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "${try_workspace-}" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi

    if [ -d "${try_example_dir-}" ]
    then
        rm -rf "$try_example_dir"
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || exit 9

echo 'fail' >file_2.txt
touch target

try_example_dir=$(mktemp -d)
"$TRY" -D "$try_example_dir" "touch file_1.txt; echo test >file_2.txt; rm target; mkdir target; mkdir -p new_dir/nested" || exit 1

"$TRY" -h summary "$try_example_dir" >summary_subcommand.out || exit 2
"$TRY" -h -s "$try_example_dir" >summary_flag.out || exit 3

diff -u summary_subcommand.out summary_flag.out || exit 4
