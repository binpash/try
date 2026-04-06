#!/bin/bash
# tag: segment-classify-index sequential

cd "$(dirname "$0")/.." || exit 1

IMG_DIR="$IMG_DIR/dpt"
DB_FILE="$OUTPUT_DIR/db.$MODE.txt"
CLASS_FILE="$OUTPUT_DIR/classifications.$MODE.txt"
mkdir -p "$IMG_DIR"

wget "https://atlas-group.cs.brown.edu/data/dpt/dpt.zip" -O images.zip
unzip -o images.zip -d "$IMG_DIR"
rm images.zip
mogrify -resize 1024x1024\> "$IMG_DIR"/*.jpg

for img in "$IMG_DIR"/*.jpg; do
    cat "$img" | python3 scripts/segment.py |
    python3 scripts/classify.py "$img" |
    awk '{print "g:", $5, "c:", $6}'
done | sort > "$DB_FILE"
