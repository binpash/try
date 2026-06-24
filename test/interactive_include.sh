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

editor="$try_workspace/editor.sh"
cat >"$editor" <<'EOF'
#!/bin/sh

tmp="$1.tmp"
grep -v '/skip.txt (added)$' "$1" >"$tmp"
mv "$tmp" "$1"
EOF
chmod +x "$editor"

printf 'i\n' | EDITOR="$editor" "$TRY" "echo keep > keep.txt; echo skip > skip.txt" >/dev/null || exit 1

[ -f keep.txt ] || exit 2
[ "$(cat keep.txt)" = "keep" ] || exit 3
! [ -e skip.txt ] || exit 4
