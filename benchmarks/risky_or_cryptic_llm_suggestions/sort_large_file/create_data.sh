#!/usr/bin/env bash
set -euo pipefail

prefix=$(realpath "$(dirname "${BASH_SOURCE[0]}")")
cd "$prefix/sort_large_file"

rm -f book.txt sortedBook.txt
available_kb=$(df -Pk . | awk 'NR==2 {print $4}')
line_count="${SORT_LARGE_FILE_LINES:-}"

if [ -z "$line_count" ]; then
    if [ "$available_kb" -lt 4000000 ]; then
        line_count=1000000
    elif [ "$available_kb" -lt 20000000 ]; then
        line_count=2000000
    else
        line_count=10000000
    fi
fi

echo "[*] Generating sort_large_file dataset: ${line_count} lines"
set +o pipefail
tr -dc 'a-zA-Z' </dev/urandom | fold -w 8 | head -n "$line_count" > book.txt
set -o pipefail
