input_dir="$IN"
output_dir="$OUT"
input_file="$OUT/all.$mode.txt"
find "$input_dir" -type f -exec cat {} + > "$input_file"
freq_out="$output_dir/freq.$mode.txt"
alpha_out="$output_dir/alpha.$mode.txt"

# Sort by frequency
tr -sc 'A-Za-z' '\012' < "$input_file" |
    sort | 
    uniq -c | 
    sort -nr > "$freq_out"

# Sort by dictionary (alphabetical) order
tr -sc 'A-Za-z' '\012' < "$input_file" | 
sort -u > "$alpha_out"
