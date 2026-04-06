#!/bin/bash 
# tag: bigrams_appear_twice.sh
# set -e

# Calculate the bigrams (based on 4_3.sh script)
IN=${IN:-$BENCHMARK_DIR/inputs/pg}
OUT=${1:-$BENCHMARK_DIR/outputs/8.2_2/}
ENTRIES=${ENTRIES:-1000}
mkdir -p "$OUT"

pure_func() {
    input=$1
    TEMPDIR=$2
    cat > ${TEMPDIR}/${input}.input.words
    tail +2 ${TEMPDIR}/${input}.input.words > ${TEMPDIR}/${input}.input.nextwords
    paste ${TEMPDIR}/${input}.input.words ${TEMPDIR}/${input}.input.nextwords | sort | uniq -c > ${TEMPDIR}/${input}.input.bigrams
    awk "\$1 == 2 {print \$2, \$3}" ${TEMPDIR}/${input}.input.bigrams
    rm -rf ${TEMPDIR}
}
export -f pure_func

for input in $(ls ${IN} | head -n ${ENTRIES} | xargs -I arg1 basename arg1)
do
    TEMPDIR=$(mktemp -d)
    cat $IN/$input | tr -c 'A-Za-z' '[\n*]' | grep -v "^\s*$" | pure_func $input $TEMPDIR > ${OUT}/${input}.${mode}.out
done

echo 'done';
# rm -rf "$OUT"
