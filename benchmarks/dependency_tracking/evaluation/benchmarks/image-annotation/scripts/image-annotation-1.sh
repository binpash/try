#!/bin/sh

mkdir -p "$OUT"

for img in $(find "$IN" -type f -iname "*.jpg"); do
    title=$(llm --no-log -m "gpt-4o-mini" "Your only output should be a **single** small title for this image:" -a "$img" -o seed 0 -o temperature 0 < /dev/null)

    filename="${title}.${mode}.jpg"

    cp "$img" "$OUT/$filename"
done
