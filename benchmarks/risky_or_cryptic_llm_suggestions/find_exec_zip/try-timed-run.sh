#!/bin/bash
export EXECUTION_ID="try-llm-zip-timed_$(date +%s%3N)"


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
cd $prefix/find_exec_zip

# Run script.sh and handle time output based on the flags
if $time_only; then
  time_output=$(/usr/bin/time -f "%e" try-timed -y bash script.sh 2>&1 >/dev/null)
  echo "$time_output"
elif $print_time; then
  /usr/bin/time -f "%e" try-timed -y bash script.sh
else
  /usr/bin/time -f "%e" try-timed -y bash script.sh &> /dev/null
fi

# Run hash_dir.sh and handle output based on the flag
if $print_hash; then
  bash ~/hash_dir.sh
fi
