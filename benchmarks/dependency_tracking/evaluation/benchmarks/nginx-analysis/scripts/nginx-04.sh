#!/bin/bash
# tag: nginx logs

pure_func() {
    tempfile=$1

    tee $tempfile | cut -d "\"" -f3 | cut -d ' ' -f2 | sort | uniq -c | sort -rn

    rm $tempfile
}
export -f pure_func

for log in $INPUT/*; do
    tempfile=$(mktemp)
    cat $log | pure_func $tempfile
done
