#!/bin/bash
cd "$(dirname "$0")/.." || exit 1

input="$input_file"

awk -F '\t' '{print $6}' "$input" | sort -u |
while IFS= read -r city; do
    safe=$(printf '%s' "$city" | tr ' /' '__') 
    tmp_dir="$plot_dir/tmp/$safe"
    mkdir -p "$plot_dir/$safe" "$tmp_dir"

    formatted="$tmp_dir/formatted.txt"
    processed="$tmp_dir/processed.txt"
    cat "$input" |
        grep "$city" |
        grep -v "\-99" |
        awk '{ printf "%02d-%02d %s %s\n", $1, $2, $3, $4 }' |
        sort -n >$formatted
done