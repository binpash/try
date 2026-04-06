#!/bin/bash

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
cd $prefix/grep_log

# Run script.sh and handle time output based on the flags
if $time_only; then
  time_output=$(/usr/bin/time -f "%e" try -y bash script.sh 2>&1 | grep -E '^[0-9]+\.[0-9]+$' | head -1)
  echo "$time_output"
elif $print_time; then
  /usr/bin/time -f "%e" try -y bash script.sh
else
  /usr/bin/time -f "%e" try -y bash script.sh &> /dev/null
fi

# Run hash_dir.sh and handle output based on the flag
if $print_hash; then
  bash ~/hash_dir.sh
fi