#!/bin/sh

mkdir -p "$OUT"

for img in $(find "$IN" -type f -iname "*.jpg"); do
    title=$(llm --no-log -m "gpt-4o-mini" "Your only output should be a **single** small title for this image:" -a "$img" -o seed 0 -o temperature 0 < /dev/null)

    base=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/ /_/g; s/[^a-z0-9_-]//g')
    filename="${base}.jpg"

    cp "$img" "$OUT/$filename"
done
