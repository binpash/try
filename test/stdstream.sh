#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cmdfile="$(mktemp)"

cat > "$cmdfile" <<'EOF'
read x < /dev/stdin
echo $((x * 2)) > /dev/stdout
echo $((x * 3)) > /dev/stderr

EOF

chmod +x "$cmdfile"

# test stdout
result=$(echo 5 | "$TRY" "$cmdfile" 2>/dev/null)
expected=$(echo 5 | sh "$cmdfile" 2>/dev/null)

[ "$result" = "$expected" ] || exit 1

# test stdout + stderr
result=$(echo 5 | "$TRY" "$cmdfile" 2>&1)

# using grep because stdout also includes try err/warns
echo $result | grep 15 > /dev/null
