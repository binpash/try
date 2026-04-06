#!/bin/bash

# cd "$(dirname "$0")" || exit 1
# TOP=$(git rev-parse --show-toplevel)
# eval_dir="$TOP/web-search"
# scripts_dir="$eval_dir/scripts"

# in="$eval_dir/inputs"
# out="$eval_dir/outputs"
# export IN=${in}
# export OUT=${out}

# INDEX="$out/global-index.txt"
# QUERY_SH="$scripts_dir/query.sh"

# mapfile -t TERMS < <(
#   awk '{print $1}' "$INDEX" |
#     awk 'length($0) > 2' |
#     awk '!seen[$0]++' |
#     shuf |
#     head -n 5
# )

# status=0
# for term in "${TERMS[@]}"; do
#   if ! "$QUERY_SH" "$term" >/dev/null; then
#     status=1
#     break
#   fi
# done

# echo "web-search $status"
# exit $status