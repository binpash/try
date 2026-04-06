#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
BENCHMARK="covid"
INPUT_DIR="${TOP}/evaluation/benchmarks/${BENCHMARK}/inputs"
URL="https://atlas.cs.brown.edu/data"

mkdir -p "$INPUT_DIR"

size=full
for arg in "$@"; do
    case "$arg" in
        --small) size=small ;;
        --min)   size=min ;;
    esac
done

if [ "$size" = "min" ]; then
    cp min_inputs/* "$INPUT_DIR/"
    exit 0
fi

if [ "$size" = "small" ]; then
    if [ -f "$INPUT_DIR/in_small.csv" ]; then
        exit 0
    fi
    curl --insecure "$URL"/covid-mts/in_small.csv.gz | gunzip > "$INPUT_DIR/in_small.csv"
    head -n 5000000 "$INPUT_DIR/in_small.csv" > "$INPUT_DIR/in_small.tmp"
    mv "$INPUT_DIR/in_small.tmp" "$INPUT_DIR/in_small.csv"
    exit 0
fi

if [ -f "$INPUT_DIR/in.csv" ]; then
    exit 0
fi

curl --insecure "${URL}/covid-mts/in_full.csv.gz" | gunzip > "$INPUT_DIR/in.csv"
