input_dir="$IN"
output_dir="$OUT"
input_file=$(find "$input_dir" -type f | head -n 1)
freq_out="$output_dir/freq.$mode.txt"

# Sort by frequency
tr -sc 'A-Za-z' '\012' < "$input_file" |
    sort | 
    uniq -c | 
    sort -nr > "$freq_out"
