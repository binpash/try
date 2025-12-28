#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi

    if [ -f "$expected" ]
    then
        rm "$expected"
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || exit 9

expected="$(mktemp)"
cat >"$expected" <<'EOF'
hello world
it's ok
EOF

arg1="hello world"
arg2="it's ok"

"$TRY" printf '%s\n' "$arg1" "$arg2" >out.txt || exit 1

diff -q "$expected" out.txt
