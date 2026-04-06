#!/bin/bash

# Function to display usage information
usage() {
  echo "Usage: $0 [--hash]"
  exit 1
}

# Initialize flags
print_hash=false

# Parse the input flags
for arg in "$@"; do
  case $arg in
    --hash)
      print_hash=true
      ;;
  esac
done

prefix=$(realpath $(dirname "${BASH_SOURCE[0]}"))
cd $prefix/find_txt

bash script.sh 2>&1 >/dev/null

# Run hash_dir.sh and handle output based on the flag
if $print_hash; then
  bash ~/hash_dir.sh
fi