#!/bin/bash

cd "$(dirname "$0")" || exit 1
TOP=$(git rev-parse --show-toplevel)
eval_dir="$TOP/web-search"
scripts_dir="$eval_dir/scripts"
in="$TOP/web-search/inputs"
out="$TOP/web-search/outputs"
INDEX="$out/global-index.txt"
PROCESS="$scripts_dir/c/process.sh"
STEM="$scripts_dir/c/stem.js"

# Provided an appropriate index, the query could be implemented using grep
# along  with appropriate processing and stemming of the input strings.

stems=$(
  printf '%s\n' "$@" | "$PROCESS" | "$STEM" | tr '\r\n' '  '
)

grep "^$stems\b" "$INDEX"