#!/bin/bash
cd "$(dirname "$0")/.." || exit 1

input="$input_file"

awk -F '\t' '{print $6}' "$input" | sort -u |
while IFS= read -r city; do
    safe=$(printf '%s' "$city" | tr ' /' '__') 
    tmp_dir="$plot_dir/tmp/$safe"
    mkdir -p "$plot_dir/$safe" "$tmp_dir"

    formatted="$tmp_dir/formatted.txt"
    processed="$tmp_dir/processed.txt"
    cat "$input" |
        grep "$city" |
        grep -v "\-99" |
        awk '{ printf "%02d-%02d %s %s\n", $1, $2, $3, $4 }' |
        sort -n >$formatted

    cat "$formatted" |
        awk '{
        key = sprintf("%s", $1);
        count[key]++;
        sum[key] += $3;
        sum_sq[key] += $3 * $3;
        if (!(key in max) || $3 > max[key]) max[key] = $3;
        if (!(key in min) || $3 < min[key]) min[key] = $3;
    } 
    END {
        for (key in max) {
            mean = sum[key] / count[key];
            variance = (sum_sq[key] / count[key]) - (mean * mean);
            stddev = (variance > 0) ? sqrt(variance) : 0;
            confidence_delta = 1.96 * stddev / sqrt(count[key]);
            normal_range_low = mean - confidence_delta;
            normal_range_high = mean + confidence_delta;
            printf "%s %s %s %.2f %.2f\n", key, min[key], max[key], normal_range_low, normal_range_high;
        }
    }' | sort -n >"$processed"
done