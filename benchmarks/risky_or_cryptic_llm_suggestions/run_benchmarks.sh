#!/bin/bash
set -euo pipefail

BASE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
RESULT_DIR="${BASE_DIR}/../results/llm_scripts"
mkdir -p "$RESULT_DIR"
TIME_BIN="${TIME_BIN:-/usr/bin/time}"
ITERATIONS="${ITERATIONS:-10}"
BENCHMARK_CASES="${BENCHMARK_CASES:-find_exec_zip find_exec_touch find_txt grep_log sort_large_file}"
LOCAL_DATA="${BASE_DIR}/local_data"
WORK_ROOT="${LLM_BENCH_WORK_ROOT:-${TMPDIR:-/tmp}/try-paper/llm}"

OUTPUT_FILE="$RESULT_DIR/benchmark_results.csv"
rm -f "$OUTPUT_FILE"

cleanup() {
  rm -rf "$WORK_ROOT"
  /bin/bash "${BASE_DIR}/clean_local_files.sh" tmp_results || true
}
trap cleanup EXIT INT TERM

copy_case_static() {
  local src_case=$1
  local dst_case=$2

  rm -rf "$dst_case"
  mkdir -p "$dst_case"

  (
    cd "$src_case"
    tar \
      --exclude='./find_exec_zip/data' \
      --exclude='./find_exec_touch/data' \
      --exclude='./find_txt/large_directory' \
      --exclude='./grep_log/large_log_file.log' \
      --exclude='./grep_log/filtered_errors.log' \
      --exclude='./sort_large_file/book.txt' \
      --exclude='./sort_large_file/sortedBook.txt' \
      -cf - .
  ) | (
    cd "$dst_case"
    tar -xf -
  )
}

restore_case_data() {
  local case_name=$1
  local workspace_case=$2

  case "$case_name" in
    find_exec_zip|find_exec_touch|grep_log|sort_large_file)
      ;;
    find_txt)
      ;;
  esac

  case "$case_name" in
    find_txt)
      if [ -d "$LOCAL_DATA/find_txt_data/large_directory" ]; then
        mkdir -p "$workspace_case/find_txt"
        cp -r "$LOCAL_DATA/find_txt_data/large_directory" "$workspace_case/find_txt/"
      fi
      ;;
    find_exec_zip)
      if [ -d "$LOCAL_DATA/find_exec_zip_data/data" ]; then
        mkdir -p "$workspace_case/find_exec_zip"
        cp -r "$LOCAL_DATA/find_exec_zip_data/data" "$workspace_case/find_exec_zip/"
      fi
      ;;
    find_exec_touch)
      if [ -d "$LOCAL_DATA/find_exec_zip_data/data" ]; then
        mkdir -p "$workspace_case/find_exec_touch"
        cp -r "$LOCAL_DATA/find_exec_zip_data/data" "$workspace_case/find_exec_touch/"
      fi
      ;;
    grep_log)
      if [ -f "$LOCAL_DATA/sort_large_file/book.txt" ]; then
        mkdir -p "$workspace_case/grep_log"
        cp "$LOCAL_DATA/sort_large_file/book.txt" \
          "$workspace_case/grep_log/large_log_file.log"
      fi
      ;;
    sort_large_file)
      if [ -f "$LOCAL_DATA/sort_large_file/book.txt" ]; then
        mkdir -p "$workspace_case/sort_large_file"
        cp "$LOCAL_DATA/sort_large_file/book.txt" \
          "$workspace_case/sort_large_file/book.txt"
      fi
      ;;
  esac
}

prepare_case_workspace() {
  local case_name=$1
  local workspace_case="${WORK_ROOT}/${case_name}"

  copy_case_static "${BASE_DIR}/${case_name}" "$workspace_case"
  restore_case_data "$case_name" "$workspace_case"

  printf '%s\n' "$workspace_case"
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
          local workspace_case
          local workspace_script
          echo "Running $script_path (Iteration $i)"
          workspace_case=$(prepare_case_workspace "$case_name")
          workspace_script="${workspace_case}/$(basename "$script_path")"
          time_output=$(/bin/bash "$workspace_script" --time-only | tr -d '\r')
          echo /bin/bash "$script_path" --time-only
          times="$times,$time_output"
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
        local workspace_case
        echo "Running $script_path (Iteration $i)"
        workspace_case=$(prepare_case_workspace "$case_name")
        time_output=$("$TIME_BIN" -f "%e" sh -c "/bin/bash \"${BASE_DIR}/run-docker-high.sh\" \"$workspace_case\" >/dev/null 2>&1" 2>&1)
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
