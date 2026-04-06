#!/bin/sh

mkdir -p "$OUT"

for f in $(find "$IN" -name '*.mp3'); do
    out_file="$OUT/$(basename "$f" .mp3).wav"
    ffmpeg -y -i "$f" -f wav -ab 192000 "$out_file"
    tar -cf "$OUT/$(basename "$f" .mp3).tar" -C "$OUT" "$(basename "$out_file")"
done
