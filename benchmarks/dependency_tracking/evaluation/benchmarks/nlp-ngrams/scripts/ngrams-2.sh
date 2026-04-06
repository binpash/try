#!/bin/bash 
# tag: bigrams.sh
# set -e

# Bigrams (contrary to our version, this uses intermediary files)
IN=${IN:-$BENCHMARK_DIR/inputs/pg}
OUT=${1:-$BENCHMARK_DIR/outputs/4_3/}
ENTRIES=${ENTRIES:-1000}
mkdir -p "$OUT"

pure_func() {
    input=$1
    TEMPDIR=$2
    cat > ${TEMPDIR}/${input}.input.words
    tail +2 ${TEMPDIR}/${input}.input.words > ${TEMPDIR}/${input}.input.nextwords
    paste ${TEMPDIR}/${input}.input.words ${TEMPDIR}/${input}.input.nextwords
    rm -rf ${TEMPDIR}
}
export -f pure_func

for input in $(ls ${IN} | head -n ${ENTRIES} | xargs -I arg1 basename arg1)
do
    TEMPDIR=$(mktemp -d)
    cat $IN/$input |  tr -c 'A-Za-z' '[\n*]' | grep -v "^\s*$" | pure_func $input $TEMPDIR | sort | uniq -c > ${OUT}/${input}.input.bigrams.${mode}.out
done

echo 'done';
# rm -rf ${OUT}
