#!/usr/bin/env bash
set -euo pipefail

BASE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
RESULT_DIR="${BASE_DIR}/../results/micro_benchmarks"
OUTPUT_FILE="${RESULT_DIR}/benchmark_results.csv"
ITERATIONS="${ITERATIONS:-10}"
BENCHMARK_CASES="${BENCHMARK_CASES:-big_io small_files small_command}"

mkdir -p "$RESULT_DIR"
rm -f "$OUTPUT_FILE"

# Iterate over each case in the directory, skipping the 'scripts' folder
for case_name in $BENCHMARK_CASES; do

  # Define the script paths for run.sh and try-run.sh
  run_script="${BASE_DIR}/$case_name/run.sh"
  try_run_script="${BASE_DIR}/$case_name/try-run.sh"
  try_timed_run_script="${BASE_DIR}/$case_name/try-trace-run-timed.sh"

  # Function to run the script 10 times and collect the results
  run_benchmark() {
    local script_path=$1
    local benchmark_name="${case_name}_$(basename $script_path)"
    local container_script_path="${case_name}/$(basename "$script_path")"
    local times=""

    # Run the script 10 times and collect the timing results
    for ((i = 1; i <= ITERATIONS; i++)); do
      echo "Running $script_path (Iteration $i)"
      time_output=$(docker run --privileged --rm --name try-microb -v /tmp:/tmp try_micro_benchmarks /bin/bash "$container_script_path" | tr -d '\r')
      times="$times,$time_output"
    done

    echo "$benchmark_name$times" >> "$OUTPUT_FILE"
  }

  # Run benchmarks for both run.sh and try-run.sh if they exist
  run_benchmark "$run_script"
  run_benchmark "$try_run_script"
  run_benchmark "$try_timed_run_script"
done

echo "Benchmark results saved to $OUTPUT_FILE"
