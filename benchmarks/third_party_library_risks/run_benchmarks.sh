#!/bin/bash

# Directory containing the cases
BASE_DIR=$(realpath "$(dirname "$0")")
RESULT_DIR=$(realpath "${BASE_DIR}/..")/results/pre_commit_hook
TRY_LEAK_ENV_DIR="$BASE_DIR/try_leak_env"
TRY_LEAK_ENV_CUR_DIR="$BASE_DIR/try_leak_env_cur"
GIT_NAME=$(echo "Test User")
GIT_EMAIL=$(echo "test@example.com")
mkdir -p "$RESULT_DIR"
OUTPUT_FILE="$RESULT_DIR/benchmark_results.csv"

# Remove results from previous runs 
rm -f $OUTPUT_FILE

# Create working copy of try_leak_env for benchmarks
if [ -d "$TRY_LEAK_ENV_DIR" ]; then
  echo "[*] Creating working copy of try_leak_env..."
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
    cp -r "$TRY_LEAK_ENV_DIR" "$TRY_LEAK_ENV_CUR_DIR"
  fi
}

# Cleanup on exit
cleanup() {
  echo "[*] Cleaning up working copy..."
  rm -rf "$TRY_LEAK_ENV_CUR_DIR"
}
trap cleanup EXIT

# Iterate over each case in the directory, skipping the 'scripts' folder
for case in $(find "$BASE_DIR" -maxdepth 1 -mindepth 1 -type d); do
  case_name=$(basename "$case")
  if [ "$case_name" == "scripts" ]; then
    continue  # Skip the 'scripts' folder
  fi

  # Define the script paths for run.sh and try-run.sh
  run_docker_script="$case/run-leak-docker.sh"
  run_script="$case/run-leak.sh"
  try_run_script="$case/try-run-leak.sh"
  try_timed_script="$case/try-timed-run.sh"
  try_run_allow_leak_script="$case/try-run.sh"

  # Function to run the script 10 times and collect the results
  run_benchmark() {
    local script_path=$1
    local benchmark_name="${case_name}_$(basename $script_path)"
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
    for i in {1..10}; do
      echo "Running $target_script (Iteration $i)"
      time_output=$(
        HOME="$TRY_LEAK_ENV_CUR_DIR" \
        GIT_AUTHOR_NAME="$GIT_NAME" \
        GIT_AUTHOR_EMAIL="$GIT_EMAIL" \
        GIT_COMMITTER_NAME="$GIT_NAME" \
        GIT_COMMITTER_EMAIL="$GIT_EMAIL" \
        /bin/bash "$target_script" --time-only | sed 's/\r//g'
      )
      times="$times,$time_output"
      # Restore the working copy for this case after each iteration
      restore_working_copy 
    done

    # Append the benchmark results to the CSV file
    echo "$benchmark_name$times" >> $OUTPUT_FILE
  }

  run_docker_benchmark() {
    local script_path=$1
    local benchmark_name="${case_name}_$(basename $script_path)"
    local container_script="/home/tryuser/${case_name}/$(basename "$script_path")"
    local times=""

    # Run the script 10 times and collect the timing results
    for i in {1..10}; do
      echo "Running $script_path (Iteration $i)"
      # /usr/bin/time outputs to stderr, capture it while suppressing docker's output
      # Use sh -c to suppress docker output, then capture time's stderr
      time_output=$(/usr/bin/time -f "%e" sh -c "docker run --privileged -it --rm --name try-precommit2-$i -v /tmp:/tmp try_pre_commit_benchmarks /bin/bash \"$container_script\" >/dev/null 2>&1" 2>&1)
      times="$times,$time_output"
    done

    # Append the benchmark results to the CSV file
    echo "$benchmark_name$times" >> $OUTPUT_FILE
    
  }

  # Run benchmarks for both run.sh and try-run.sh if they exist
  # [ -f "$run_docker_script" ] && run_docker_benchmark "$run_docker_script"
  # [ -f "$run_script" ] && run_benchmark "$run_script"
  # [ -f "$try_run_script" ] && run_benchmark "$try_run_script"
  [ -f "$try_run_allow_leak_script" ] && run_benchmark "$try_run_allow_leak_script"
  # [ -f "$try_timed_script" ] && run_benchmark "$try_timed_script"
done

echo "Benchmark results saved to $OUTPUT_FILE"
