#!/bin/bash
# This is the main entry point of the search engine.
cd "$(dirname "$0")" || exit 1
sed -e 's|^\./||' "$INDEX_FILE" >"${OUT}/urls.txt"

while read -r url; do
  [ "$url" = stop ] && exit 0 # stop the engine if it sees the string "stop"


  echo "[engine] crawling $url">/dev/stderr
  ./crawl.sh "$url" >${OUT}/content.txt
  echo "[engine] indexing $url">/dev/stderr
  ./index.sh ${OUT}/content.txt "$url"

  if [ "$(cat "${OUT}/visited.txt" | wc -l)" -ge \
       "$(cat "${OUT}/urls.txt"    | wc -l)" ]; then
    break
  fi
done < "${OUT}/urls.txt"
