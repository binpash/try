#!/bin/bash
# tag: unigrams.sh
# set -e

# Unigrams (simpler version: counts individual words)
IN=${IN:-$BENCHMARK_DIR/inputs/pg}
OUT=${1:-$BENCHMARK_DIR/outputs/4_3_unigrams/}
ENTRIES=${ENTRIES:-1000}
mkdir -p "$OUT"

pure_func() {
    input=$1
    TEMPDIR=$2
    cat > "${TEMPDIR}/${input}.input.words"
    sort "${TEMPDIR}/${input}.input.words" | uniq -c
    rm -rf "${TEMPDIR}"
}
export -f pure_func

for input in $(ls "${IN}" | head -n "${ENTRIES}" | xargs -I arg1 basename arg1)
do
    TEMPDIR=$(mktemp -d)
    cat "$IN/$input" | tr -c 'A-Za-z' '[\n*]' | grep -v "^\s*$" |
        pure_func "$input" "$TEMPDIR" > "${OUT}/${input}.input.unigrams.${mode}.out"
done

echo 'done'
# rm -rf ${OUT}
