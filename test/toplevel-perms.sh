#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
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

    if [ -f "$target" ]
    then
        rm "$target"
    fi

    if [ -f "$cmd" ]
    then
        rm "$cmd"
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || return 9
touch test

cmd="$(mktemp)"
echo "find / -maxdepth 1 -print0 | xargs -0 ls -ld | awk '{print \$1, \$3, \$4, \$9, \$10, \$11}' | grep -v 'proc' | grep -v 'swap'" > $cmd

# Set up expected output
expected="$(mktemp)"
sh $cmd >"$expected"

# Set up target output
target="$(mktemp)"

"$TRY" "sh $cmd" > "$target" || return 1
#diff -q "$expected" "$target"
diff "$expected" "$target"
