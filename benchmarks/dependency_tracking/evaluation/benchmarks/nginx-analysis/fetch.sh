#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
BENCHMARK="nginx-analysis"
INPUT_DIR="${TOP}/evaluation/benchmarks/${BENCHMARK}/inputs"

URL=https://atlas.cs.brown.edu/data
mkdir -p "$INPUT_DIR"

size=full
for arg in "$@"; do
    case "$arg" in
    --small) size=small ;;
    --min) size=min ;;
    esac
done
if [[ "$size" == "min" ]]; then
    if [[ ! -d "$INPUT_DIR/nginx-logs_$size" ]]; then
        mkdir -p "$INPUT_DIR/nginx-logs_$size"
        cp "${INPUT_DIR}/../min_inputs/nginx-logs/"* "$INPUT_DIR/nginx-logs_$size"
    fi
    exit 0
elif [[ "$size" == "small" ]]; then
    if [[ ! -d "$INPUT_DIR/nginx-logs_$size" ]]; then
        zip_dst="$INPUT_DIR/nginx.zip"
        wget --no-check-certificate $URL/nginx.zip -O "$zip_dst"
        unzip "$zip_dst" -d "$INPUT_DIR"
        mv "$INPUT_DIR/nginx-logs" "$INPUT_DIR/nginx-logs_$size"
        rm "$zip_dst"
        input_dir="$INPUT_DIR/nginx-logs_$size"
        for log in "$input_dir"/*; do
            if [[ "$log" != "$input_dir/log0" ]]; then
                cat "$log" >> "$input_dir/log0"
                rm "$log"
            fi
        done
        for i in {1..2}; do
            cp "$input_dir/log0" "$input_dir/dup"
            cat "$input_dir/dup" >> "$input_dir/log0"
            rm "$input_dir/dup"
        done
    fi
    exit 0
else
    if [[ ! -d "$INPUT_DIR/nginx-logs_$size" ]]; then
        zip_dst="$INPUT_DIR/nginx.zip"
        wget --no-check-certificate $URL/nginx.zip -O "$zip_dst"
        unzip "$zip_dst" -d "$INPUT_DIR"
        mv "$INPUT_DIR/nginx-logs" "$INPUT_DIR/nginx-logs_$size"
        rm "$zip_dst"

        zip_dst="$INPUT_DIR/nginx_large.zip"
        wget --no-check-certificate "$URL"/log-analysis/web-server-access-logs.zip -O "$zip_dst"
        unzip "$zip_dst" -d "$INPUT_DIR"
        mv "$INPUT_DIR/access.log" "$INPUT_DIR/nginx-logs_$size/access.log"
        rm "$zip_dst"
    fi
fi
