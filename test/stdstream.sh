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

try_stdout=$(mktemp)
try_stderr=$(mktemp)
sh_stdout=$(mktemp)
sh_stderr=$(mktemp)

# test stdout
echo 5 | "$TRY" "$cmdfile" >"$try_stdout" 2>"$try_stderr"
echo 5 | sh "$cmdfile" >"$sh_stdout" 2>"$sh_stderr"

diff "$try_stdout" "$sh_stdout" || exit 1

# using grep because there's try errors printed
grep -q 15 "$try_stderr"
grep -q 15 "$sh_stderr"

rm "$try_stdout" "$try_stderr" "$sh_stdout" "$sh_stderr"
