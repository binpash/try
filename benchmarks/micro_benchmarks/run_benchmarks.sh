#!/usr/bin/env bash
set -euo pipefail

BASE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
RESULT_DIR="${BASE_DIR}/../results/micro_benchmarks"
OUTPUT_FILE="${RESULT_DIR}/benchmark_results.csv"
ITERATIONS="${ITERATIONS:-10}"
BENCHMARK_CASES="${BENCHMARK_CASES:-big_io small_files small_command}"

mkdir -p "$RESULT_DIR"
rm -f "$OUTPUT_FILE"

cleanup_case_workspace() {
  local case_dir=$1
  rm -rf "${case_dir}/tmp"
  rm -f "${case_dir}/x.log"
}

# Iterate over each case in the directory, skipping the 'scripts' folder
for case_name in $BENCHMARK_CASES; do
  case_dir="${BASE_DIR}/$case_name"

  # Define the script paths for run.sh and try-run.sh
  run_script="${case_dir}/run.sh"
  try_run_script="${case_dir}/try-run.sh"
  try_timed_run_script="${case_dir}/try-trace-run-timed.sh"

  # Function to run the script 10 times and collect the results
  run_benchmark() {
    local script_path=$1
    local benchmark_name="${case_name}_$(basename $script_path)"
    local raw_output=""
    local times=""

    # Run the script 10 times and collect the timing results
    for ((i = 1; i <= ITERATIONS; i++)); do
      echo "Running $script_path (Iteration $i)"
      cleanup_case_workspace "$case_dir"
      raw_output=$(cd "$case_dir" && /bin/bash "$(basename "$script_path")" 2>&1)
      time_output=$(printf '%s\n' "$raw_output" | tr -d '\r' | awk '/^[0-9]+(\.[0-9]+)?$/{value=$0} END{print value}')
      if [ -z "$time_output" ]; then
        printf 'Failed to parse timing output for %s\n' "$script_path" >&2
        printf '%s\n' "$raw_output" >&2
        exit 1
      fi
      printf '%s\n' "$time_output"
      times="$times,$time_output"
      cleanup_case_workspace "$case_dir"
    done

    echo "$benchmark_name$times" >> "$OUTPUT_FILE"
  }

  # Run benchmarks for both run.sh and try-run.sh if they exist
  run_benchmark "$run_script"
  run_benchmark "$try_run_script"
  run_benchmark "$try_timed_run_script"
done

echo "Benchmark results saved to $OUTPUT_FILE"
