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


    START_YEAR=$(head -n1 "$formatted" | cut -d' ' -f2)
    END_YEAR=$(  tail -n1 "$formatted" | cut -d' ' -f2)

    for year in $(seq "$START_YEAR" "$END_YEAR"); do
        yr_txt="$tmp_dir/$year.txt"
        max_y="$tmp_dir/max_$year.txt"
        min_y="$tmp_dir/min_$year.txt"
        j1="$tmp_dir/j1_$year.txt"
        j2="$tmp_dir/j2_$year.txt"

        grep " $year" "$formatted" | cut -d' ' -f1,3 > "$yr_txt"

        cut -d' ' -f1,3 "$processed" | comm -12 "$yr_txt" - > "$max_y"
        cut -d' ' -f1,2 "$processed" | comm -12 "$yr_txt" - > "$min_y"

        join -a1 -a2 -e "-99" -o "0,1.2,2.2"  "$yr_txt" "$min_y"  > "$j1"
        join -a1 -a2 -e "-99" -o "0,1.2,1.3,2.2" "$j1" "$max_y"   > "$j2"

        join -1 1 -2 1 -e "NA" "$processed" "$j2" \
            | grep -v 'NA' | sed 's/-99/NaN/g' \
            | python3 "$scripts_dir/plot.py" "$year" "$city" \
            > "$plot_dir/$safe/$year.png"

        rm -f "$yr_txt" "$max_y" "$min_y" "$j1" "$j2"
    done
done