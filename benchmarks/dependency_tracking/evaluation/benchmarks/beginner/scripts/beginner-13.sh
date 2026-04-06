mkdir -p "$OUT"

cat "$IN" | sort | uniq -c | cut -d' ' -f5,11 | sort -k2 | uniq -c | sort -rn | head 10
