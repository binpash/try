#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

LOCAL_DATA="$SCRIPT_DIR/local_data"
available_kb=$(df -Pk "$SCRIPT_DIR" | awk 'NR==2 {print $4}')

if [ "$available_kb" -lt 4000000 ]; then
    export FIND_TXT_DIRS="${FIND_TXT_DIRS:-10}"
    export FIND_TXT_FILES_PER_DIR="${FIND_TXT_FILES_PER_DIR:-1000}"
    export SORT_LARGE_FILE_LINES="${SORT_LARGE_FILE_LINES:-1000000}"
elif [ "$available_kb" -lt 20000000 ]; then
    export FIND_TXT_DIRS="${FIND_TXT_DIRS:-20}"
    export FIND_TXT_FILES_PER_DIR="${FIND_TXT_FILES_PER_DIR:-2000}"
    export SORT_LARGE_FILE_LINES="${SORT_LARGE_FILE_LINES:-2000000}"
else
    export FIND_TXT_DIRS="${FIND_TXT_DIRS:-100}"
    export FIND_TXT_FILES_PER_DIR="${FIND_TXT_FILES_PER_DIR:-10000}"
    export SORT_LARGE_FILE_LINES="${SORT_LARGE_FILE_LINES:-10000000}"
fi

mkdir -p "$LOCAL_DATA"

echo "[*] Generating fresh data for all benchmarks..."
/bin/bash "$SCRIPT_DIR/clean_local_files.sh" all
echo "[*] Using find_txt dataset: ${FIND_TXT_DIRS} directories x ${FIND_TXT_FILES_PER_DIR} files"
echo "[*] Using sort_large_file dataset: ${SORT_LARGE_FILE_LINES} lines"

###############################################################################
# find_txt
###############################################################################
echo "[*] Running create_data.sh in find_txt..."
cd "$SCRIPT_DIR/find_txt"
chmod +x ./create_data.sh
./create_data.sh

# Save clean copy
if [ -d "find_txt/large_directory" ]; then
    echo "[*] Saving clean data to local_data/find_txt_data"
    mkdir -p "$LOCAL_DATA/find_txt_data"
    rm -rf "$LOCAL_DATA/find_txt_data"/*
    cp -r "find_txt/large_directory" "$LOCAL_DATA/find_txt_data/"
fi

###############################################################################
# find_exec_zip
###############################################################################
echo "[*] Running create_data.sh in find_exec_zip..."
cd "$SCRIPT_DIR/find_exec_zip"
chmod +x ./create_data.sh
./create_data.sh

# Save clean copy
if [ -d "find_exec_zip/data" ]; then
    echo "[*] Saving clean data to local_data/find_exec_zip_data"
    mkdir -p "$LOCAL_DATA/find_exec_zip_data"
    rm -rf "$LOCAL_DATA/find_exec_zip_data"/*
    cp -r "find_exec_zip/data" "$LOCAL_DATA/find_exec_zip_data/"
fi

###############################################################################
# sort_large_file
###############################################################################
echo "[*] Running create_data.sh in sort_large_file..."
cd "$SCRIPT_DIR/sort_large_file"
chmod +x ./create_data.sh
./create_data.sh

# Save clean copy
if [ -f "sort_large_file/book.txt" ]; then
    echo "[*] Saving clean book.txt to local_data/sort_large_file"
    mkdir -p "$LOCAL_DATA/sort_large_file"
    rm -rf "$LOCAL_DATA/sort_large_file"/*
    cp "sort_large_file/book.txt" "$LOCAL_DATA/sort_large_file/book.txt"
fi

###############################################################################
# Restore working copies for experiments
###############################################################################
cd "$SCRIPT_DIR"
echo "[*] Restoring clean data copies into experiment directories..."
/bin/bash "$SCRIPT_DIR/restore_clean_data.sh" all

echo "[*] All data generated and clean backups saved to: $LOCAL_DATA"
