#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
BENCHMARK="unixfun"
INPUT_DIR="${TOP}/evaluation/benchmarks/${BENCHMARK}/inputs"
URL="https://atlas.cs.brown.edu/data"

mkdir -p "$INPUT_DIR"
cd "$INPUT_DIR" || exit 1

# inputs=(1 2 3 4 5 6 7 8 9.1 9.2 9.3 9.4 9.5 9.6 9.7 9.8 9.9 10 11 12)
inputs=(4)

size=full
for arg in "$@"; do
    case "$arg" in
        --small) size=small ;;
        --min)   size=min ;;
    esac
done

for input in "${inputs[@]}"
do
    if [ "$size" = "min" ]; then
        if [ ! -f "${input}.txt" ]; then
            wget --no-check-certificate "${URL}/unix50/${input}.txt" || exit 1
        fi
        if [ ! -f "${input}_6M.txt" ]; then
            file_content_size=$(wc -c < "${input}.txt")
            iteration_limit=$((1048576 / $file_content_size))
            for (( i = 0; i < iteration_limit; i++ )); do
                cat "${input}.txt" >> "${input}_1M.txt"
            done
            for (( i = 0; i < 6; i++ )); do
                cat "${input}_1M.txt" >> "${input}_6M.txt"
            done
            rm "${input}_1M.txt"
    	else
            continue
        fi
    elif [ "$size" = "small" ]; then
        if [ ! -f "${input}_30M.txt" ]; then
            wget --no-check-certificate "${URL}/unix50/small/${input}_30M.txt" || exit 1
        fi
        
        if [ ! -f "${input}_1G.txt" ]; then
            echo "Creating ${input}_1G.txt from ${input}_30M.txt"
            file_content_size=$(wc -c < "${input}_30M.txt")
            iteration_limit=$((1073741824 / file_content_size))
            for (( i = 0; i < iteration_limit; i++ )); do
                cat "${input}_30M.txt" >> "${input}_1G.txt"
            done
        fi
        mv "${input}_1G.txt" "${input}.$size.txt"
    elif [ "$size" = "full" ]; then 
        if [ ! -f "${input}_3G.txt" ]; then
            wget --no-check-certificate "${URL}/unix50/large/${input}_3G.txt" || exit 1
        else
            continue
        fi
        mv "${input}_3G.txt" "${input}.$size.txt"
    fi
done
