#!/bin/bash
set -euo pipefail

BASE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
RESULT_DIR="${BASE_DIR}/../results/llm_scripts"
mkdir -p "$RESULT_DIR"
TIME_BIN="${TIME_BIN:-/usr/bin/time}"
ITERATIONS="${ITERATIONS:-10}"
BENCHMARK_CASES="${BENCHMARK_CASES:-find_exec_zip find_exec_touch find_txt grep_log sort_large_file}"

OUTPUT_FILE="$RESULT_DIR/benchmark_results.csv"
rm -f "$OUTPUT_FILE"

cleanup() {
  /bin/bash "${BASE_DIR}/clean_local_files.sh" all
}
trap cleanup EXIT INT TERM

restore_case_data() {
  local case_name=$1
  case "$case_name" in
    find_exec_zip|find_exec_touch|grep_log|sort_large_file)
      /bin/bash "${BASE_DIR}/restore_clean_data.sh" "$case_name"
      ;;
  esac
}

for case_name in $BENCHMARK_CASES; do
    case="${BASE_DIR}/${case_name}"
   
    run_script="run.sh"
    run_docker_script="run-docker-high.sh"
    try_run_script="try-run.sh"
    try_run_no_commit_script="try-run-no-commit.sh"
    try_trace_run_script="try-trace-run.sh"
    try_timed_script="try-timed-run.sh"

    # Function to run the script 10 times and collect the results
    run_benchmark() {
      local script_path=$1
      local benchmark_name="${case_name}_$(basename $script_path)"
      local times=""

        # Run the script 10 times and collect the timing results
      for ((i = 1; i <= ITERATIONS; i++)); do
          echo "Running $script_path (Iteration $i)"
          restore_case_data "$case_name"
          time_output=$(/bin/bash "$script_path" --time-only | tr -d '\r')
          echo /bin/bash "$script_path" --time-only
          times="$times,$time_output"
          restore_case_data "$case_name"
        done

        # Append the benchmark results to the CSV file
        echo "$benchmark_name$times" >> "$OUTPUT_FILE"
    }

    # Function to time the docker run of the script
    run_docker_benchmark() {
      local script_path=$1
      local benchmark_name="${case_name}_$(basename $script_path)"
      local times=""

      for ((i = 1; i <= ITERATIONS; i++)); do
        echo "Running $script_path (Iteration $i)"
        time_output=$("$TIME_BIN" -f "%e" /bin/bash "${BASE_DIR}/run-docker-high.sh" "$case" >/dev/null 2>&1)
        times="$times,$time_output"
      done  

      # Append the benchmark results to the CSV file
      echo "$benchmark_name$times" >> "$OUTPUT_FILE"
    }

  # Run benchmarks for both run.sh and try-run.sh if they exist
    [ -f "$case/$run_script" ] && run_benchmark "$case/$run_script"
    [ -f "$case/$try_run_script" ] && run_benchmark "$case/$try_run_script"
    [ -f "$case/$try_run_no_commit_script" ] && run_benchmark "$case/$try_run_no_commit_script"
    [ -f "${BASE_DIR}/run-docker-high.sh" ] && run_docker_benchmark "${BASE_DIR}/run-docker-high.sh"
    # [ -f "$case/$try_trace_run_script" ] && run_benchmark "$case/$try_trace_run_script"
    # [ -f "$case/$try_timed_script" ] && run_benchmark "$case/$try_timed_script"
done

echo "Benchmark results saved to $OUTPUT_FILE"
