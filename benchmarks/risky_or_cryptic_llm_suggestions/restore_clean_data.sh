#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

LOCAL_DATA="$SCRIPT_DIR/local_data"


###############################################################################
# Restore find_txt (if needed)
###############################################################################
if [ -d "$LOCAL_DATA/find_txt_data/data" ]; then
    rm -rf "$SCRIPT_DIR/find_txt/find_txt/data"
    mkdir -p "$SCRIPT_DIR/find_txt/find_txt/data"
    cp -r "$LOCAL_DATA/find_txt_data/data/" "$SCRIPT_DIR/find_txt/find_txt/"
fi

###############################################################################
# Restore find_exec_zip (if needed)
###############################################################################
if [ -d "$LOCAL_DATA/find_exec_zip_data/data" ]; then
    rm -rf "$SCRIPT_DIR/find_exec_zip/find_exec_zip/data"
    mkdir -p "$SCRIPT_DIR/find_exec_zip/find_exec_zip/data"
    cp -r "$LOCAL_DATA/find_exec_zip_data/data/" "$SCRIPT_DIR/find_exec_zip/find_exec_zip/"
fi

###############################################################################
# Restore find_exec_touch
###############################################################################
if [ -d "$LOCAL_DATA/find_exec_zip_data/data" ]; then
    rm -rf "$SCRIPT_DIR/find_exec_touch/find_exec_touch/data"
    mkdir -p "$SCRIPT_DIR/find_exec_touch/find_exec_touch/data"
    cp -r "$LOCAL_DATA/find_exec_zip_data/data/" "$SCRIPT_DIR/find_exec_touch/find_exec_touch/"
fi

###############################################################################
# Restore grep_log
###############################################################################
if [ -f "$LOCAL_DATA/sort_large_file/book.txt" ]; then
    rm -f "$SCRIPT_DIR/grep_log/grep_log/filtered_errors.log"
    mkdir -p "$SCRIPT_DIR/grep_log/grep_log"
    cp "$LOCAL_DATA/sort_large_file/book.txt" \
       "$SCRIPT_DIR/grep_log/grep_log/large_log_file.log"
fi

###############################################################################
# Restore sort_large_file
###############################################################################
if [ -f "$LOCAL_DATA/sort_large_file/book.txt" ]; then
    rm -f "$SCRIPT_DIR/sort_large_file/sort_large_file/sortedBook.txt"
    mkdir -p "$SCRIPT_DIR/sort_large_file/sort_large_file"
    cp "$LOCAL_DATA/sort_large_file/book.txt" \
       "$SCRIPT_DIR/sort_large_file/sort_large_file/book.txt"
fi