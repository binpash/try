#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "[*] Cleaning generated data..."

###############################################################################
# find_txt cleanup
###############################################################################
if [ -d "find_txt/find_txt/data" ]; then
    echo "[*] Removing find_txt data directory..."
    rm -rf "find_txt/find_txt/large_directory"
fi

###############################################################################
# find_exec_zip cleanup
###############################################################################
if [ -d "find_exec_zip/find_exec_zip/data" ]; then
    echo "[*] Removing find_exec_zip data directory..."
    rm -rf "find_exec_zip/find_exec_zip/data"
fi

###############################################################################
# sort_large_file cleanup
###############################################################################
if [ -f "sort_large_file/sort_large_file/book.txt" ]; then
    echo "[*] Removing generated book.txt..."
    rm -f "sort_large_file/sort_large_file/book.txt"
    rm -f "sort_large_file/sort_large_file/sortedBook.txt"
fi

###############################################################################
# find_exec_touch cleanup (copied data)
###############################################################################
if [ -d "find_exec_touch/find_exec_touch/data" ]; then
    echo "[*] Removing copied data in find_exec_touch..."
    rm -rf "find_exec_touch/find_exec_touch/data"
fi

###############################################################################
# grep_log cleanup
###############################################################################
if [ -f "grep_log/grep_log/large_log_file.log" ]; then
    echo "[*] Removing generated large_log_file.log..."
    rm -f "grep_log/grep_log/large_log_file.log"
    rm -f "grep_log/grep_log/filtered_errors.log"
fi

echo "[*] Cleanup complete."