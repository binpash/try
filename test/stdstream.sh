#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cmdfile="$(mktemp)"

cat > "$cmdfile" <<EOF
file /dev/stdin
file /dev/stdout
file /dev/stderr
EOF

chmod +x "$cmdfile"

result=$("$TRY" "$cmdfile")
expected=$(sh "$cmdfile")

[ "$result" = "$expected" ] || exit 1
