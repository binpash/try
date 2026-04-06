#!/bin/bash
# tag: uppercase_by_type
# set -e

IN=${IN:-$BENCHMARK_DIR/inputs/pg}
OUT=${1:-$BENCHMARK_DIR/outputs/6_1_2/}
ENTRIES=${ENTRIES:-1000}
mkdir -p "$OUT"

for input in $(ls ${IN} | head -n ${ENTRIES} | xargs -I arg1 basename arg1)
do
    cat $IN/$input | tr -c 'A-Za-z' '[\n*]' | grep -v "^\s*$" | sort -u | grep -c '^[A-Z]' > ${OUT}/${input}.${mode}.out
done

echo 'done';
# rm -rf ${OUT}
