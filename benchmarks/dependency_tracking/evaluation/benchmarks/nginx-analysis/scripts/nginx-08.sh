#!/bin/bash
# tag: nginx logs

pure_func() {
    logfile=$1

    awk '{print $9}' $logfile | sort | uniq -c | sort -rn
    awk '($9 ~ /404/)' $logfile | awk '{print $7}' | sort | uniq -c | sort -rn
}
export -f pure_func

for log in $INPUT/*; do
    pure_func "$log"
done
