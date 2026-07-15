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

mkdir visible hidden_dir || exit 1
touch visible/file hidden_file hidden_dir/file || exit 2

"$TRY" -y -i hidden_file -i hidden_dir "test ! -e hidden_file && test ! -e hidden_dir && test -e visible/file" || exit 3

test -e hidden_file || exit 4
test -e hidden_dir/file || exit 5
test -e visible/file || exit 6
