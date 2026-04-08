#!/usr/bin/env bash
set -euo pipefail

prefix=$(realpath "$(dirname "${BASH_SOURCE[0]}")/..")

available_kb=$(df -Pk "$prefix" | awk 'NR==2 {print $4}')
dir_count="${FIND_TXT_DIRS:-}"
files_per_dir="${FIND_TXT_FILES_PER_DIR:-}"
sort_large_file_lines="${SORT_LARGE_FILE_LINES:-}"

if [ -z "$dir_count" ] || [ -z "$files_per_dir" ] || [ -z "$sort_large_file_lines" ]; then
    if [ "$available_kb" -lt 4000000 ]; then
        dir_count="${dir_count:-10}"
        files_per_dir="${files_per_dir:-1000}"
        sort_large_file_lines="${sort_large_file_lines:-1000000}"
    elif [ "$available_kb" -lt 20000000 ]; then
        dir_count="${dir_count:-20}"
        files_per_dir="${files_per_dir:-2000}"
        sort_large_file_lines="${sort_large_file_lines:-2000000}"
    else
        dir_count="${dir_count:-100}"
        files_per_dir="${files_per_dir:-10000}"
        sort_large_file_lines="${sort_large_file_lines:-10000000}"
    fi
fi

echo "[*] Building LLM benchmark image with find_txt dataset: ${dir_count} directories x ${files_per_dir} files"
echo "[*] Building LLM benchmark image with sort_large_file dataset: ${sort_large_file_lines} lines"

cd "$prefix"
docker build . \
    --build-arg FIND_TXT_DIRS="$dir_count" \
    --build-arg FIND_TXT_FILES_PER_DIR="$files_per_dir" \
    --build-arg SORT_LARGE_FILE_LINES="$sort_large_file_lines" \
    -t try_llm_benchmarks
