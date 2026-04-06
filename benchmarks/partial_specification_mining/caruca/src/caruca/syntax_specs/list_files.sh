#!/bin/bash

# File where the list of filenames will be stored
output_file="file_list.txt"

# Empty the file if it already exists, or create it if it doesn't
> $output_file

# Loop through all files in the current directory
for file in *; do
    # Check if it's a file (not a directory)
    if [ -f "$file" ]; then
        # Get the filename without the extension
        filename="${file%.*}"
        # Append the filename (without extension) to the output file
        echo "$filename" >> $output_file
    fi
done

# Output a message to indicate the process is complete
echo "List of files without suffix has been written to $output_file"

