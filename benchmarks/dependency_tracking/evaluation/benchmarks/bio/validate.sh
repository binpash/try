#!/bin/bash

# Exit immediately if a command exits with a non-zero status
# set -e

cd "$(realpath "$(dirname "$0")")" || exit 1

hash_folder="hashes/full"
directory="outputs"
tseq_output="outputs/teraseq"

generate=false
for arg in "$@"; do
    if [[ "$arg" == "--generate" ]]; then
        generate=true
        continue
    fi
    case "$arg" in
    --min)  hash_folder="hashes/min" 
            size=min
            ;;
    --small) hash_folder="hashes/small" ;;
    esac
done

mkdir -p "$hash_folder"

if $generate; then
    for file in "$directory"/*.bam; do
        filename=$(basename "$file" .bam)
        hash=$(shasum -a 256 "$file" | awk '{ print $1 }')
        echo "$hash" > "$hash_folder/$filename.hash"
        echo "$hash_folder/$filename.hash $hash"
    done

    find "$tseq_output" -type f | sort | xargs md5sum > "$hash_folder/tseq_output.hashes"
    cat "$hash_folder/tseq_output.hashes"

    exit 0
fi

# Loop through all .bam files in the current directory
for file in "$directory"/*.bam; do
    # Extract the filename without the directory path and extension
    filename=$(basename "$file" .bam)

    if [ ! -f "$hash_folder/$filename.hash" ]; then
        echo "Error: Hash file for $filename does not exist in $hash_folder."
        echo "Please generate the hash files first using --generate option."
    fi

    # Compare the hash with the hash in the hashes directory
    current_hash=$(shasum -a 256 "$file" | awk '{ print $1 }')
    stored_hash=$(cat "$hash_folder/$filename.hash")

    if [ "$current_hash" = "$stored_hash" ]; then
        match=0
    else
        match=1
    fi

    # Print the filename and match
    echo "$hash_folder/$filename $match"
done

if [[ "$size" == "min" ]]; then
    exit 0
fi

mismatch=0
tmpfile=$(mktemp)
find "$tseq_output" -type f | sort | xargs md5sum > "$tmpfile"
if ! diff -q "$hash_folder/tseq_output.hashes" "$tmpfile" > /dev/null; then
    diff -u "$hash_folder/tseq_output.hashes" "$tmpfile"
    mismatch=1
fi

echo "teraseq $mismatch"
