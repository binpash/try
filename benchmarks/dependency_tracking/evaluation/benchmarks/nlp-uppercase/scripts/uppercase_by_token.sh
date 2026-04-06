#!/bin/bash
# tag: uppercase_by_token
# set -e

IN=${IN:-$BENCHMARK_DIR/inputs/pg}
OUT=${1:-$BENCHMARK_DIR/outputs/6_1_1/}
ENTRIES=${ENTRIES:-1000}
mkdir -p "$OUT"

for input in $(ls ${IN} | head -n ${ENTRIES} | xargs -I arg1 basename arg1)
do
    cat $IN/$input |  tr -c 'A-Za-z' '[\n*]' | grep -v "^\s*$" | grep -c '^[A-Z]' > ${OUT}/${input}.${mode}.out
done

echo 'done';
# rm -rf ${OUT}
