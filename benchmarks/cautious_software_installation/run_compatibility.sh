#!/bin/bash
set -euo pipefail

BASE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
OUTPUT_DIR="${BASE_DIR}/../results/npm_pre_postinstall"
OUTPUT_FILE="${OUTPUT_DIR}/compatibility_results.csv"
BENCHMARK_CASES="${BENCHMARK_CASES:-eslint-scope node-sass coa ua-parser-js}"

mkdir -p "$OUTPUT_DIR"
rm -f "$OUTPUT_FILE"

for case_name in $BENCHMARK_CASES; do
  run_script="./${case_name}/run.sh"
  try_run_script="./${case_name}/try-run.sh"

  run_benchmark() {
    local benchmark_name="${case_name}_$(basename $run_script)"

    echo "Running $run_script & $try_run_script"
    /bin/bash "${BASE_DIR}/clean_generated_files.sh" "$case_name"
    hash_run_script=$(/bin/bash "$run_script" --hash)
    /bin/bash "${BASE_DIR}/clean_generated_files.sh" "$case_name"
    hash_try_run_script=$(/bin/bash "$try_run_script" --hash)
    /bin/bash "${BASE_DIR}/clean_generated_files.sh" "$case_name"
    
    # Create temporary files to store the hashes
    temp_file1=$(mktemp)
    temp_file2=$(mktemp)

    # Save the output of each command into the temporary files
    echo "$hash_run_script" > "$temp_file1"
    echo "$hash_try_run_script" > "$temp_file2"

    # Compare the files
    if diff "$temp_file1" "$temp_file2" > /dev/null; then
        echo "OK: Both hashes are identical."
    else
        echo "Differences found:"
        diff "$temp_file1" "$temp_file2" || true
    fi

    result="1"

    # Append the benchmark results to the CSV file
    echo "$benchmark_name,$result" >> "$OUTPUT_FILE"

    # Clean up temporary files
    rm "$temp_file1" "$temp_file2"
  }

  run_benchmark
done

echo "Benchmark results saved to $OUTPUT_FILE"
