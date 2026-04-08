#!/bin/bash
set -euo pipefail

BASE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
REPO_ROOT=$(cd "$BASE_DIR/../.." && pwd)
RESULT_DIR=$(realpath "${BASE_DIR}/..")/results/pre_commit_hook
DEFAULT_WORK_ROOT="${TRY_LEAK_WORK_ROOT:-${XDG_CACHE_HOME:-$HOME/.cache}/try-paper/third_party_library_risks}"
TRY_LEAK_ENV_DIR="${TRY_LEAK_ENV_DIR:-$DEFAULT_WORK_ROOT/try_leak_env}"
TRY_LEAK_ENV_CUR_DIR="${TRY_LEAK_ENV_CUR_DIR:-$DEFAULT_WORK_ROOT/try_leak_env_cur}"
GIT_NAME=$(echo "Test User")
GIT_EMAIL=$(echo "test@example.com")
DEFAULT_TRY_BIN="$REPO_ROOT/scripts/try-patched"
DEFAULT_TRY_TIMED_BIN="$REPO_ROOT/scripts/try-timed"
mkdir -p "$RESULT_DIR"
OUTPUT_FILE="$RESULT_DIR/benchmark_results.csv"
TIME_BIN="${TIME_BIN:-/usr/bin/time}"
ITERATIONS="${ITERATIONS:-10}"
BENCHMARK_CASES="${BENCHMARK_CASES:-LinOTP frogmouth kibble okteto uv-metrics}"

rm -f "$OUTPUT_FILE"

# Create working copy of try_leak_env for benchmarks
if [ -d "$TRY_LEAK_ENV_DIR" ]; then
  echo "[*] Creating working copy of try_leak_env..."
  mkdir -p "$(dirname "$TRY_LEAK_ENV_CUR_DIR")"
  rm -rf "$TRY_LEAK_ENV_CUR_DIR"
  cp -r "$TRY_LEAK_ENV_DIR" "$TRY_LEAK_ENV_CUR_DIR"
else
  echo "ERROR: $TRY_LEAK_ENV_DIR not found. Run setup-baremetal.sh first."
  exit 1
fi

# Cleanup function to restore working copy from original
restore_working_copy() {
  if [ -d "$TRY_LEAK_ENV_DIR" ]; then
    echo "[*] Restoring working copy from $TRY_LEAK_ENV_DIR to $TRY_LEAK_ENV_CUR_DIR..."
    rm -rf "$TRY_LEAK_ENV_CUR_DIR"
    mkdir -p "$(dirname "$TRY_LEAK_ENV_CUR_DIR")"
    cp -r "$TRY_LEAK_ENV_DIR" "$TRY_LEAK_ENV_CUR_DIR"
  fi
}

# Cleanup on exit
cleanup() {
  echo "[*] Cleaning up working copy..."
  rm -rf "$TRY_LEAK_ENV_CUR_DIR"
}
trap cleanup EXIT

sync_working_copy_scripts() {
  cp "$BASE_DIR/hash_dir.sh" "$TRY_LEAK_ENV_CUR_DIR/hash_dir.sh"
  cp "$BASE_DIR/steal_passwd.sh" "$TRY_LEAK_ENV_CUR_DIR/steal_passwd.sh"
  chmod +x "$TRY_LEAK_ENV_CUR_DIR/hash_dir.sh" "$TRY_LEAK_ENV_CUR_DIR/steal_passwd.sh"

  for sync_case_name in $BENCHMARK_CASES; do
    local src_case_dir="$BASE_DIR/$sync_case_name"
    local dst_case_dir="$TRY_LEAK_ENV_CUR_DIR/$sync_case_name"

    [ -d "$dst_case_dir" ] || continue

    for script_name in run.sh try-run.sh run-leak.sh try-run-leak.sh try-timed-run.sh run-leak-docker.sh; do
      if [ -f "$src_case_dir/$script_name" ]; then
        cp "$src_case_dir/$script_name" "$dst_case_dir/$script_name"
        chmod +x "$dst_case_dir/$script_name"
      fi
    done
  done
}

sync_working_copy_scripts

for case_name in $BENCHMARK_CASES; do
  case="$BASE_DIR/$case_name"

  # Define the script paths for run.sh and try-run.sh
  run_docker_script="$case/run-leak-docker.sh"
  run_script="$case/run.sh"
  try_run_script="$case/try-run.sh"
  try_timed_script="$case/try-timed-run.sh"

  # Function to run the script 10 times and collect the results
  run_benchmark() {
    local script_path=$1
    local benchmark_name="${case_name}_$(basename "$script_path")"
    local env_case_dir="$TRY_LEAK_ENV_CUR_DIR/$case_name"
    local env_script_name
    local env_script_path
    local target_script
    local times=""

    env_script_name="$(basename "$script_path")"
    env_script_path="$env_case_dir/$env_script_name"

    if [ ! -d "$env_case_dir" ]; then
      echo "Skipping $benchmark_name: missing env dir $env_case_dir (run setup-baremetal.sh)"
      return
    fi

    if [ ! -f "$env_script_path" ]; then
      echo "Skipping $benchmark_name: missing env script $env_script_path"
      return
    fi

    target_script="$env_script_path"

    # Run the script 10 times and collect the timing results
    for ((i = 1; i <= ITERATIONS; i++)); do
      echo "Running $target_script (Iteration $i)"
      time_output=$(
        HOME="$TRY_LEAK_ENV_CUR_DIR" \
        GIT_AUTHOR_NAME="$GIT_NAME" \
        GIT_AUTHOR_EMAIL="$GIT_EMAIL" \
        GIT_COMMITTER_NAME="$GIT_NAME" \
        GIT_COMMITTER_EMAIL="$GIT_EMAIL" \
        TRY_BIN="${TRY_BIN:-$DEFAULT_TRY_BIN}" \
        TRY_TIMED_BIN="${TRY_TIMED_BIN:-$DEFAULT_TRY_TIMED_BIN}" \
        /bin/bash "$target_script" --time-only | sed 's/\r//g'
      )
      times="$times,$time_output"
      # Restore the working copy for this case after each iteration
      restore_working_copy 
      sync_working_copy_scripts
    done

    # Append the benchmark results to the CSV file
    echo "$benchmark_name$times" >> "$OUTPUT_FILE"
  }

  run_docker_benchmark() {
    local script_path=$1
    local benchmark_name="${case_name}_$(basename "$script_path")"
    local container_script="/home/tryuser/${case_name}/$(basename "$script_path")"
    local times=""

    # Run the script 10 times and collect the timing results
    for ((i = 1; i <= ITERATIONS; i++)); do
      echo "Running $script_path (Iteration $i)"
      time_output=$("$TIME_BIN" -f "%e" sh -c "docker run --privileged --rm --name try-precommit2-$i -v /tmp:/tmp try_pre_commit_benchmarks /bin/bash \"$container_script\" >/dev/null 2>&1" 2>&1)
      times="$times,$time_output"
    done

    echo "$benchmark_name$times" >> "$OUTPUT_FILE"
    
  }

  [ -f "$run_docker_script" ] && run_docker_benchmark "$run_docker_script"
  [ -f "$run_script" ] && run_benchmark "$run_script"
  [ -f "$try_run_script" ] && run_benchmark "$try_run_script"
  # [ -f "$try_timed_script" ] && run_benchmark "$try_timed_script"
done

echo "Benchmark results saved to $OUTPUT_FILE"
