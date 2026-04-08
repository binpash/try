#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

LOCAL_DATA="$SCRIPT_DIR/local_data"
selection="${1:-all}"

restore_find_txt() {
    if [ -d "$LOCAL_DATA/find_txt_data/large_directory" ]; then
        rm -rf "$SCRIPT_DIR/find_txt/find_txt/large_directory"
        mkdir -p "$SCRIPT_DIR/find_txt/find_txt"
        cp -r "$LOCAL_DATA/find_txt_data/large_directory" "$SCRIPT_DIR/find_txt/find_txt/"
    fi
}

restore_find_exec_zip() {
    if [ -d "$LOCAL_DATA/find_exec_zip_data/data" ]; then
        rm -rf "$SCRIPT_DIR/find_exec_zip/find_exec_zip/data"
        mkdir -p "$SCRIPT_DIR/find_exec_zip/find_exec_zip"
        cp -r "$LOCAL_DATA/find_exec_zip_data/data" "$SCRIPT_DIR/find_exec_zip/find_exec_zip/"
    fi
}

restore_find_exec_touch() {
    if [ -d "$LOCAL_DATA/find_exec_zip_data/data" ]; then
        rm -rf "$SCRIPT_DIR/find_exec_touch/find_exec_touch/data"
        mkdir -p "$SCRIPT_DIR/find_exec_touch/find_exec_touch"
        cp -r "$LOCAL_DATA/find_exec_zip_data/data" "$SCRIPT_DIR/find_exec_touch/find_exec_touch/"
    fi
}

restore_grep_log() {
    if [ -f "$LOCAL_DATA/sort_large_file/book.txt" ]; then
        mkdir -p "$SCRIPT_DIR/grep_log/grep_log"
        rm -f "$SCRIPT_DIR/grep_log/grep_log/large_log_file.log"
        rm -f "$SCRIPT_DIR/grep_log/grep_log/filtered_errors.log"
        cp "$LOCAL_DATA/sort_large_file/book.txt" \
           "$SCRIPT_DIR/grep_log/grep_log/large_log_file.log"
    fi
}

restore_sort_large_file() {
    if [ -f "$LOCAL_DATA/sort_large_file/book.txt" ]; then
        mkdir -p "$SCRIPT_DIR/sort_large_file/sort_large_file"
        rm -f "$SCRIPT_DIR/sort_large_file/sort_large_file/book.txt"
        rm -f "$SCRIPT_DIR/sort_large_file/sort_large_file/sortedBook.txt"
        cp "$LOCAL_DATA/sort_large_file/book.txt" \
           "$SCRIPT_DIR/sort_large_file/sort_large_file/book.txt"
    fi
}

case "$selection" in
    all)
        restore_find_txt
        restore_find_exec_zip
        restore_find_exec_touch
        restore_grep_log
        restore_sort_large_file
        ;;
    find_txt)
        restore_find_txt
        ;;
    find_exec_zip)
        restore_find_exec_zip
        ;;
    find_exec_touch)
        restore_find_exec_touch
        ;;
    grep_log)
        restore_grep_log
        ;;
    sort_large_file)
        restore_sort_large_file
        ;;
    *)
        echo "Unknown restore target: $selection" >&2
        exit 1
        ;;
esac
