#!/bin/bash

prefix=$(realpath $(dirname "${BASH_SOURCE[0]}"))
cd "$prefix/find_txt"

# Create a base directory
mkdir -p large_directory

# Generate a nested directory structure with many .txt files
for dir in {1..100}; do
    mkdir -p "large_directory/dir_$dir"
    for file in {1..10000}; do
        echo "This is file $file in directory $dir" > "large_directory/dir_$dir/file_$file.txt"
    done
done