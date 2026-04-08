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
TRY_BIN="${TRY_BIN:-try}"
TRY_LEAK_ARGS="${TRY_LEAK_ARGS:--y}"

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
cd $prefix

cat ../steal_passwd.sh .git/hooks/pre-commit > .git/hooks/pre-commit.new
mv .git/hooks/pre-commit.new .git/hooks/pre-commit
chmod a+x .git/hooks/pre-commit

printf '\n' >> kibble/version.py
printf ' ' >> kibble/__main__.py
git add .

# Run script.sh and handle time output based on the flags
if $time_only; then
  # shellcheck disable=SC2086
  time_output=$(/usr/bin/time -f "%e" "$TRY_BIN" $TRY_LEAK_ARGS git commit -m 'message' 2>&1 >/dev/null)
  echo "$(echo $time_output | awk 'END{print $NF}')"
elif $print_time; then
  # shellcheck disable=SC2086
  /usr/bin/time -f "%e" "$TRY_BIN" $TRY_LEAK_ARGS git commit -m 'message'
else
  # shellcheck disable=SC2086
  /usr/bin/time -f "%e" "$TRY_BIN" $TRY_LEAK_ARGS git commit -m 'message' &> /dev/null
fi

# Run hash_dir.sh and handle output based on the flag
if $print_hash; then
  bash ~/hash_dir.sh
fi
