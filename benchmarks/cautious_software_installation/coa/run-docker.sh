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
cd $prefix/coa

# Run script.sh and handle time output based on the flags
npm install >/dev/null 2>&1 || true

# Run hash_dir.sh and handle output based on the flag
if $print_hash; then
  bash ~/hash_dir.sh
fi
