#!/bin/sh

# Set the encryption key
key="key"

mkdir -p "$OUT"

for f in $(find "$IN" -name '*.mp3'); do
    out_file="$OUT/$(basename "$f" .mp3).wav"
    ffmpeg -y -i "$f" -f wav -ab 192000 "$out_file"
done

tar -cf - -C "$OUT" $(ls "$OUT"/*.gz | xargs -n 1 basename) |
    gzip |
    openssl enc -aes-256-cbc -pbkdf2 -iter 20000 -k $key > "$OUT/all_wavs.tar.gz.enc"
