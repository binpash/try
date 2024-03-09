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
echo "find / -maxdepth 1 -type d -print0 | xargs -0 ls -ld | awk '{print substr(\$1, 1, 10), \$9, \$10, \$11}' | grep -v '/proc' " > "$cmd"

# Set up expected output
expected="$(mktemp)"
sh "$cmd" >"$expected"

# Set up target output
target="$(mktemp)"

# shellcheck disable=SC2024 # sudo won't be used in > $target redirection
sudo "$TRY" "sh $cmd" > "$target" || return 1
diff "$expected" "$target"
