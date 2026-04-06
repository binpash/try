mkdir -p "$OUT"

cat "$IN" | sort | uniq -c | cut -d' ' -f5,11
