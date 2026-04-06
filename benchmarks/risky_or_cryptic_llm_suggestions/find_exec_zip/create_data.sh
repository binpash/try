#!/bin/bash

prefix=$(realpath $(dirname "${BASH_SOURCE[0]}"))
cd "$prefix/find_exec_zip"

# Create the data directory and generate 10,000 random files
mkdir -p ./data && for i in {1..10000}; do dd if=/dev/urandom of=./data/file_$i.txt bs=1K count=10; done