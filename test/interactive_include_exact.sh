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

# Drop keep.bak and aXc; keep everything else, including names that are not
# valid as plain regexes and a new directory with a file in it.
editor="$try_workspace/editor.sh"
cat >"$editor" <<'EOF2'
#!/bin/sh

tmp="$1.tmp"
grep -v -e '/keep\.bak (added)$' -e '/aXc (added)$' "$1" >"$tmp"
mv "$tmp" "$1"
EOF2
chmod +x "$editor"

printf 'i\n' | EDITOR="$editor" "$TRY" "echo keep > keep; echo bak > keep.bak; echo dot > a.c; echo x > aXc; echo br > 'x[1].txt'; mkdir newdir; echo in > newdir/inner" >/dev/null || exit 1

[ "$(cat keep)" = "keep" ] || exit 2
[ "$(cat a.c)" = "dot" ] || exit 3
[ "$(cat 'x[1].txt')" = "br" ] || exit 4
[ "$(cat newdir/inner)" = "in" ] || exit 5
! [ -e keep.bak ] || exit 6
! [ -e aXc ] || exit 7
