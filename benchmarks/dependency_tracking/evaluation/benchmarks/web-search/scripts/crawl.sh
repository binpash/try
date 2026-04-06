#!/bin/bash

echo "$1" >>${OUT}/visited.txt

# curl -skL "$1" |
#   tee >(c/getURLs.js "$1" | grep -vxf ${OUT}/visited.txt >>${OUT}/urls.txt) |
#   c/getText.js

pipe=$(mktemp -u)
mkfifo "$pipe"

(c/getURLs.js "$WIKI/$1" | grep -vxf "$OUT/visited.txt" >>"$OUT/urls.txt") <"$pipe" & # background reader
bg_pid=$!

cat "$WIKI/$1" |
  tee "$pipe" |
  c/getText.js

wait "$bg_pid"
rm -f "$pipe"