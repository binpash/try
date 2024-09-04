#!/bin/bash

base=$(git rev-parse --show-toplevel)
#base=/srv/try

"$base"/try-timed -y "$1" 1>stdout 2>stderr

# Read the input from a file or stdin
input=$(cat timelog)

# Initialize variables
prev_timestamp=0
prev_step=""

# Process each line of the input
while IFS= read -r line; do
    # Extract the timestamp and step from the line
    timestamp=$(echo "$line" | cut -d' ' -f1)
    step=$(echo "$line" | cut -d' ' -f2-)

    # Calculate the delta t if it's not the first line
    if [[ $prev_timestamp != 0 ]]; then
        delta_t=$(echo "($timestamp - $prev_timestamp) * 1000" | bc)
        printf "%.9f %s\n" "$delta_t" "$prev_step"
    fi

    # Update the previous timestamp and step
    prev_timestamp=$timestamp
    prev_step=$step
done <<< "$input"