mkdir -p "$OUT"

cat "$IN" | sort | uniq -c | grep -i "error" | wc -l
