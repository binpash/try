mkdir -p "$OUT"

cat "$IN" | sort | uniq -c | grep "error"
