#!/bin/bash
set -euo pipefail

BASE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
REPO_ROOT=$(cd "$BASE_DIR/../.." && pwd)
OUTPUT_DIR="${BASE_DIR}/../results/pre_commit_hook"
OUTPUT_FILE="${OUTPUT_DIR}/compatibility_results.csv"
DEFAULT_WORK_ROOT="${TRY_LEAK_WORK_ROOT:-${XDG_CACHE_HOME:-$HOME/.cache}/try-paper/third_party_library_risks}"
TRY_LEAK_ENV_DIR="${TRY_LEAK_ENV_DIR:-$DEFAULT_WORK_ROOT/try_leak_env}"
TRY_LEAK_ENV_CUR_DIR="${TRY_LEAK_ENV_CUR_DIR:-$DEFAULT_WORK_ROOT/try_leak_env_cur}"
GIT_NAME="Test User"
GIT_EMAIL="test@example.com"
DEFAULT_TRY_BIN="$REPO_ROOT/scripts/try-patched"
BENCHMARK_CASES="${BENCHMARK_CASES:-LinOTP frogmouth kibble okteto uv-metrics}"

mkdir -p "$OUTPUT_DIR"
rm -f "$OUTPUT_FILE"

if [ -d "$TRY_LEAK_ENV_DIR" ]; then
  mkdir -p "$(dirname "$TRY_LEAK_ENV_CUR_DIR")"
  rm -rf "$TRY_LEAK_ENV_CUR_DIR"
  cp -r "$TRY_LEAK_ENV_DIR" "$TRY_LEAK_ENV_CUR_DIR"
else
  echo "ERROR: $TRY_LEAK_ENV_DIR not found. Run setup-baremetal.sh first."
  exit 1
fi

restore_working_copy() {
  if [ -d "$TRY_LEAK_ENV_DIR" ]; then
    rm -rf "$TRY_LEAK_ENV_CUR_DIR"
    mkdir -p "$(dirname "$TRY_LEAK_ENV_CUR_DIR")"
    cp -r "$TRY_LEAK_ENV_DIR" "$TRY_LEAK_ENV_CUR_DIR"
  fi
}

cleanup() {
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
  run_script="${TRY_LEAK_ENV_CUR_DIR}/${case_name}/run-leak.sh"
  try_run_script="${TRY_LEAK_ENV_CUR_DIR}/${case_name}/try-run-leak.sh"

  run_benchmark() {
    local benchmark_name="${case_name}_$(basename "$run_script")"
    local hash_run_script
    local hash_try_run_script

    echo "Running $run_script & $try_run_script"
    hash_run_script=$(
      HOME="$TRY_LEAK_ENV_CUR_DIR" \
      GIT_AUTHOR_NAME="$GIT_NAME" \
      GIT_AUTHOR_EMAIL="$GIT_EMAIL" \
      GIT_COMMITTER_NAME="$GIT_NAME" \
      GIT_COMMITTER_EMAIL="$GIT_EMAIL" \
      TRY_BIN="${TRY_BIN:-$DEFAULT_TRY_BIN}" \
      /bin/bash "$run_script" --hash
    )

    restore_working_copy
    sync_working_copy_scripts

    hash_try_run_script=$(
      HOME="$TRY_LEAK_ENV_CUR_DIR" \
      GIT_AUTHOR_NAME="$GIT_NAME" \
      GIT_AUTHOR_EMAIL="$GIT_EMAIL" \
      GIT_COMMITTER_NAME="$GIT_NAME" \
      GIT_COMMITTER_EMAIL="$GIT_EMAIL" \
      TRY_BIN="${TRY_BIN:-$DEFAULT_TRY_BIN}" \
      /bin/bash "${TRY_LEAK_ENV_CUR_DIR}/${case_name}/try-run-leak.sh" --hash
    )

    temp_file1=$(mktemp)
    temp_file2=$(mktemp)
    echo "$hash_run_script" > "$temp_file1"
    echo "$hash_try_run_script" > "$temp_file2"

    if diff "$temp_file1" "$temp_file2" > /dev/null; then
        echo "OK: Both hashes are identical."
        result="1"
    else
        echo "Differences found:"
        diff "$temp_file1" "$temp_file2" || true
        result="0"
    fi

    echo "$benchmark_name,$result" >> "$OUTPUT_FILE"

    rm "$temp_file1" "$temp_file2"

    restore_working_copy
    sync_working_copy_scripts
  }

  run_benchmark
done

echo "Benchmark results saved to $OUTPUT_FILE"
