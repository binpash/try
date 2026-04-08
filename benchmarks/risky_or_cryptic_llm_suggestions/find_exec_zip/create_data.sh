#!/usr/bin/env bash
set -euo pipefail

prefix=$(realpath "$(dirname "${BASH_SOURCE[0]}")")
cd "$prefix/find_exec_zip"

rm -rf ./data
mkdir -p ./data
for i in {1..10000}; do
    dd if=/dev/urandom of=./data/file_$i.txt bs=1K count=10 status=none
done
