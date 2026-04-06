#!/bin/bash
# tag: nginx logs

pure_func() {
    logfile=$1

    awk '{print $9}' $logfile | sort | uniq -c | sort -rn
    awk '($9 ~ /404/)' $logfile | awk '{print $7}' | sort | uniq -c | sort -rn
    awk '($9 ~ /502/)' $logfile | awk '{print $7}' | sort | uniq -c | sort -r
    awk -F\" '($2 ~ "/wp-admin/install.php"){print $1}' $logfile | awk '{print $1}' | sort | uniq -c | sort -r
    awk '($9 ~ /404/)' $logfile | awk -F\" '($2 ~ "^GET .*.php")' | awk '{print $7}'
}
export -f pure_func

for log in $INPUT/*; do
    pure_func "$log"
done
