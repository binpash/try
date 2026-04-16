#!/bin/bash
set -euo pipefail

base_dir=$(realpath "$(dirname "$0")")
result_dir="$base_dir/results/caruca"
top=$(git rev-parse --show-toplevel)
shared_result_dir="$top/benchmarks/results/partial_specification_mining"

source "$top/.venv/bin/activate"
export PYTHONPATH="$base_dir/src${PYTHONPATH:+:$PYTHONPATH}"
export PATH="$HOME/.local/bin:$PATH"

mkdir -p "$result_dir"
mkdir -p "$shared_result_dir"

# Remove results from previous runs
rm -f "$result_dir"/*

# Create outputs dir
mkdir -p outputs

# Disable Caruca's tqdm output
export TQDM_DISABLE=1
iterations="${ITERATIONS:-10}"

cleanup_leaked_sandboxes() {
    for dir in /tmp/toplevel_*; do
        [ -d "$dir" ] || continue

        if command -v findmnt >/dev/null 2>&1; then
            { findmnt -R -n -o TARGET "$dir" 2>/dev/null || true; } | sort -r | while IFS= read -r mountpoint; do
                [ -n "$mountpoint" ] || continue
                umount "$mountpoint" 2>/dev/null || umount -l "$mountpoint" 2>/dev/null || true
            done
        fi

        rm -rf "$dir" 2>/dev/null || true
    done
}

run_benchmark() {
    local cmd="$1"
    local benchmark_name="$cmd"
    local times=""

    for i in $(seq 1 "$iterations"); do
        echo "Running $cmd (Iteration $i)"
        cleanup_leaked_sandboxes
        time_output=$({ /usr/bin/time -f "%e" caruca trace "$cmd" >/dev/null; } 2>&1)
        cleanup_leaked_sandboxes
        times="$times,$time_output"
    done

    echo "$benchmark_name$times" >> "$output_file"
}

export CARUCA_ISOLATION_METHOD=try
output_file="$result_dir/benchmark_results_try.csv"
rm -f "$output_file"
run_benchmark "cp"
run_benchmark "ls"
run_benchmark "rm"
run_benchmark "sed"
run_benchmark "xargs"
cp "$output_file" "$shared_result_dir/benchmark_results_try.csv"

export CARUCA_ISOLATION_METHOD=docker
output_file="$result_dir/benchmark_results_docker.csv"
rm -f "$output_file"
run_benchmark "cp"
run_benchmark "ls"
run_benchmark "rm"
run_benchmark "sed"
run_benchmark "xargs"
cp "$output_file" "$shared_result_dir/benchmark_results_docker.csv"

export CARUCA_ISOLATION_METHOD=none
output_file="$result_dir/benchmark_results_vanilla.csv"
rm -f "$output_file"
run_benchmark "cp"
run_benchmark "ls"
run_benchmark "rm"
run_benchmark "sed"
run_benchmark "xargs"
cp "$output_file" "$shared_result_dir/benchmark_results_vanilla.csv"
