#!/bin/bash
set -euo pipefail

# Function to display usage information
usage() {
  echo "Usage: $0 [--time] [--hash] [--both] [--time-only]"
  exit 1
}

# Initialize flags
print_time=false
print_hash=false
time_only=false

# Parse the input flags
for arg in "$@"; do
  case $arg in
    --time)
      print_time=true
      ;;
    --hash)
      print_hash=true
      ;;
    --both)
      print_time=true
      print_hash=true
      ;;
    --time-only)
      time_only=true
      ;;
    *)
      usage
      ;;
  esac
done

prefix=$(realpath $(dirname "${BASH_SOURCE[0]}"))
cd $prefix/coa
export HOME="/tmp/try-npm-coa-home"
export npm_config_cache="$HOME/.npm"
mkdir -p "$npm_config_cache"

# Run script.sh and handle time output based on the flags
if $time_only; then
  time_output=$({ /usr/bin/time -f "%e" try -y npm install >/dev/null; } 2>&1 || true)
  echo "$(echo $time_output | awk 'END{print $NF}')"
elif $print_time; then
  /usr/bin/time -f "%e" try -y npm install || true
else
  /usr/bin/time -f "%e" try -y npm install &> /dev/null || true
fi

# Run hash_dir.sh and handle output based on the flag
if $print_hash; then
  bash "$prefix/../hash_dir.sh"
fi
