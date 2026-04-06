#!/bin/bash

# Directory containing the cases
OUTPUT_FILE="compatibility_results.csv"

# Remove results from previous runs 
rm -f $OUTPUT_FILE

# Iterate over each case in the directory, skipping the 'scripts' folder
for case in $(find . -maxdepth 1 -mindepth 1 -type d); do
  case_name=$(basename "$case")
  if [ "$case_name" == "scripts" ]; then
    continue  # Skip the 'scripts' folder
  fi

  # Define the script paths for run.sh and try-run.sh
  run_script="$case/run.sh"
  try_run_script="$case/try-run.sh"

  # Function to run the script 10 times and collect the results
  run_benchmark() {
    local benchmark_name="${case_name}_$(basename $run_script)"
    local result=""

    echo "Running $run_script & $try_run_script"
    hash_run_script=$(docker run --privileged -it --rm --name try-llm -v /tmp:/tmp try_llm_benchmarks /bin/bash "$run_script" --hash)
    hash_try_run_script=$(docker run --privileged -it --rm --name try-llm -v /tmp:/tmp try_llm_benchmarks /bin/bash "$try_run_script" --hash)
    
    # Create temporary files to store the hashes
    temp_file1=$(mktemp)
    temp_file2=$(mktemp)

    # Save the output of each command into the temporary files
    echo "$hash_run_script" > "$temp_file1"
    echo "$hash_try_run_script" > "$temp_file2"

    # Compare the files
    if diff "$temp_file1" "$temp_file2" > /dev/null; then
        echo "OK: Both hashes are identical."
        result="1"
    else
        echo "Differences found:"
        diff "$temp_file1" "$temp_file2"
        result="0"
    fi

    # Append the benchmark results to the CSV file
    echo "$benchmark_name,$result" >> $OUTPUT_FILE

    # Clean up temporary files
    rm "$temp_file1" "$temp_file2"
  }

  # Run benchmarks for both run.sh and try-run.sh if they exist
  run_benchmark 
done

echo "Benchmark results saved to $OUTPUT_FILE"