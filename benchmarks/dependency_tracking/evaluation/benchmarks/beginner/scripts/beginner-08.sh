mkdir -p "$OUT"

cat "$IN" | sort | uniq -c | cut -d' ' -f1-2
