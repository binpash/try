#!/bin/bash

cd "$(realpath "$(dirname "$0")")" || exit 1
URL='https://atlas.cs.brown.edu/data'

IN="inputs"
IN_NAME="input.txt"
size="large"
mkdir -p "$IN"
in_dir="$IN/bio-full"
for arg in "$@"; do
    case "$arg" in
        --small)
            IN_NAME="input_small.txt"
            size="medium"
            in_dir="$IN/bio-small"
            ;;
        --min)
            IN_NAME="input_min.txt"
            in_dir="$IN/bio-min"
            size="min"
            ;;
    esac
done

mkdir -p outputs "$in_dir"
cp $IN_NAME "$in_dir"
cp "./Gene_locs.txt" "$in_dir"
if [[ "$IN_NAME" == "input_min.txt" ]]; then
    if [[ -d min_inputs ]]; then
        cp min_inputs/* "$in_dir/"
    else
        echo "Directory 'min_inputs' not found." >&2
        exit 1
    fi
fi

if [[ ! -f "$IN_NAME" ]]; then
    echo "Input file '$IN_NAME' not found." >&2
    exit 1
fi

if [[ $size == "min" ]]; then
    exit 0
fi

while IFS= read -r s_line; do
    sample=$(echo "$s_line" | cut -d ' ' -f 2)

    out_file="$in_dir/$sample.bam"

    if [[ ! -f "$out_file" ]]; then
        tmp_file="${out_file}.tmp"
        link="${URL}/bio/${size}/${sample}.bam"
        if wget -O "$tmp_file" --no-check-certificate "$link"; then
            mv "$tmp_file" "$out_file"
        else
            echo "Failed to download: $link" >&2
            rm -f "$tmp_file"
        fi
    fi
done < "$IN_NAME"
