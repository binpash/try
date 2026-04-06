#!/bin/sh

mkdir -p "$OUT"

for f in $(find "$IN" -name '*.mp3'); do
    out_file="$OUT/$(basename "$f" .mp3).wav"
    ffmpeg -y -i "$f" -f wav -ab 192000 "$out_file"
done

tar -cf - -C "$OUT" $(ls "$OUT"/*.wav | xargs -n 1 basename) |
    openssl enc -aes-256-cbc -pbkdf2 -iter 20000 -k key > "$OUT/all_wavs.tar.enc"
