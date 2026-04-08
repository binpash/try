#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

LOCAL_DATA="$SCRIPT_DIR/local_data"
STAGE_ROOT="${LLM_BENCH_SETUP_ROOT:-${TMPDIR:-/tmp}/try-paper/llm-setup}"
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
echo "[*] Using find_txt dataset: ${FIND_TXT_DIRS} directories x ${FIND_TXT_FILES_PER_DIR} files"
echo "[*] Using sort_large_file dataset: ${SORT_LARGE_FILE_LINES} lines"

cleanup() {
    rm -rf "$STAGE_ROOT"
}
trap cleanup EXIT INT TERM

copy_case_static() {
    local src_case=$1
    local dst_case=$2

    rm -rf "$dst_case"
    mkdir -p "$dst_case"

    (
        cd "$src_case"
        tar \
            --exclude='./find_exec_zip/data' \
            --exclude='./find_exec_touch/data' \
            --exclude='./find_txt/large_directory' \
            --exclude='./grep_log/large_log_file.log' \
            --exclude='./grep_log/filtered_errors.log' \
            --exclude='./sort_large_file/book.txt' \
            --exclude='./sort_large_file/sortedBook.txt' \
            -cf - .
    ) | (
        cd "$dst_case"
        tar -xf -
    )
}

###############################################################################
# find_txt
###############################################################################
find_txt_stage="$STAGE_ROOT/find_txt"
copy_case_static "$SCRIPT_DIR/find_txt" "$find_txt_stage"
echo "[*] Running create_data.sh in find_txt..."
cd "$find_txt_stage"
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
find_exec_zip_stage="$STAGE_ROOT/find_exec_zip"
copy_case_static "$SCRIPT_DIR/find_exec_zip" "$find_exec_zip_stage"
echo "[*] Running create_data.sh in find_exec_zip..."
cd "$find_exec_zip_stage"
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
sort_large_file_stage="$STAGE_ROOT/sort_large_file"
copy_case_static "$SCRIPT_DIR/sort_large_file" "$sort_large_file_stage"
echo "[*] Running create_data.sh in sort_large_file..."
cd "$sort_large_file_stage"
chmod +x ./create_data.sh
./create_data.sh

# Save clean copy
if [ -f "sort_large_file/book.txt" ]; then
    echo "[*] Saving clean book.txt to local_data/sort_large_file"
    mkdir -p "$LOCAL_DATA/sort_large_file"
    rm -rf "$LOCAL_DATA/sort_large_file"/*
    cp "sort_large_file/book.txt" "$LOCAL_DATA/sort_large_file/book.txt"
fi

echo "[*] All data generated and clean backups saved to: $LOCAL_DATA"
