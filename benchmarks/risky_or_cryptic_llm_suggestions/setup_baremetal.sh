#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

LOCAL_DATA="$SCRIPT_DIR/local_data"

mkdir -p "$LOCAL_DATA"

echo "[*] Generating fresh data for all benchmarks..."

###############################################################################
# find_txt
###############################################################################
echo "[*] Running create_data.sh in find_txt..."
cd "$SCRIPT_DIR/find_txt"
chmod +x ./create_data.sh
./create_data.sh

# Save clean copy
if [ -d "find_txt/data" ]; then
    echo "[*] Saving clean data to local_data/find_txt_data"
    mkdir -p "$LOCAL_DATA/find_txt_data"
    rm -rf "$LOCAL_DATA/find_txt_data"/*
    cp -r "find_txt/data" "$LOCAL_DATA/find_txt_data/"
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

# find_exec_touch
echo "[*] Copying clean exec_zip data → find_exec_touch..."
rm -rf "find_exec_touch/find_exec_touch/data"
mkdir -p "find_exec_touch/find_exec_touch/data"
cp -r "$LOCAL_DATA/find_exec_zip_data/data/" \
      "find_exec_touch/find_exec_touch/"

# grep_log
echo "[*] Copying clean book.txt → grep_log/large_log_file.log..."
mkdir -p "grep_log/grep_log"
cp "$LOCAL_DATA/sort_large_file/book.txt" \
   "grep_log/grep_log/large_log_file.log"

echo "[*] All data generated and clean backups saved to: $LOCAL_DATA"