#!/usr/bin/env bash
set -euo pipefail

prefix=$(realpath "$(dirname "${BASH_SOURCE[0]}")")
cd "$prefix/find_txt"

# Reset any previous partial dataset before regenerating.
rm -rf large_directory
mkdir -p large_directory

available_kb=$(df -Pk . | awk 'NR==2 {print $4}')
dir_count="${FIND_TXT_DIRS:-}"
files_per_dir="${FIND_TXT_FILES_PER_DIR:-}"

if [ -z "$dir_count" ] || [ -z "$files_per_dir" ]; then
    if [ "$available_kb" -lt 4000000 ]; then
        dir_count="${dir_count:-10}"
        files_per_dir="${files_per_dir:-1000}"
    elif [ "$available_kb" -lt 20000000 ]; then
        dir_count="${dir_count:-20}"
        files_per_dir="${files_per_dir:-2000}"
    else
        dir_count="${dir_count:-100}"
        files_per_dir="${files_per_dir:-10000}"
    fi
fi

echo "[*] Generating find_txt dataset: ${dir_count} directories x ${files_per_dir} files"

for dir in $(seq 1 "$dir_count"); do
    mkdir -p "large_directory/dir_$dir"
    for file in $(seq 1 "$files_per_dir"); do
        echo "This is file $file in directory $dir" > "large_directory/dir_$dir/file_$file.txt"
    done
done
