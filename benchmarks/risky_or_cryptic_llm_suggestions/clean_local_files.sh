#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

selection="${1:-all}"

cleanup_find_txt() {
    if [ -d "find_txt/find_txt/large_directory" ]; then
        echo "[*] Removing find_txt large_directory..."
        rm -rf "find_txt/find_txt/large_directory"
    fi
}

cleanup_find_exec_zip() {
    if [ -d "find_exec_zip/find_exec_zip/data" ]; then
        echo "[*] Removing find_exec_zip data directory..."
        rm -rf "find_exec_zip/find_exec_zip/data"
    fi
}

cleanup_sort_large_file() {
    if [ -f "sort_large_file/sort_large_file/book.txt" ] || [ -f "sort_large_file/sort_large_file/sortedBook.txt" ]; then
        echo "[*] Removing sort_large_file generated files..."
        rm -f "sort_large_file/sort_large_file/book.txt"
        rm -f "sort_large_file/sort_large_file/sortedBook.txt"
    fi
}

cleanup_find_exec_touch() {
    if [ -d "find_exec_touch/find_exec_touch/data" ]; then
        echo "[*] Removing copied data in find_exec_touch..."
        rm -rf "find_exec_touch/find_exec_touch/data"
    fi
}

cleanup_grep_log() {
    if [ -f "grep_log/grep_log/large_log_file.log" ] || [ -f "grep_log/grep_log/filtered_errors.log" ]; then
        echo "[*] Removing grep_log generated files..."
        rm -f "grep_log/grep_log/large_log_file.log"
        rm -f "grep_log/grep_log/filtered_errors.log"
    fi
}

cleanup_tmp_results() {
    if [ -d "tmp_results" ]; then
        echo "[*] Removing tmp_results..."
        rm -rf "tmp_results"
    fi
}

echo "[*] Cleaning generated data for: $selection"

case "$selection" in
    all)
        cleanup_find_txt
        cleanup_find_exec_zip
        cleanup_sort_large_file
        cleanup_find_exec_touch
        cleanup_grep_log
        cleanup_tmp_results
        ;;
    find_txt)
        cleanup_find_txt
        ;;
    find_exec_zip)
        cleanup_find_exec_zip
        ;;
    find_exec_touch)
        cleanup_find_exec_touch
        ;;
    sort_large_file)
        cleanup_sort_large_file
        ;;
    grep_log)
        cleanup_grep_log
        ;;
    tmp_results)
        cleanup_tmp_results
        ;;
    *)
        echo "Unknown cleanup target: $selection" >&2
        exit 1
        ;;
esac

echo "[*] Cleanup complete."
