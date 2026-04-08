#!/bin/bash
set -euo pipefail

base_dir=$(realpath "$(dirname "$0")")
result_dir="$base_dir/results/caruca"
export PATH="$HOME/.local/bin:$PATH"

mkdir -p "$result_dir"

# Remove results from previous runs
rm -f "$result_dir"/*

# Create outputs dir
mkdir -p outputs

# Disable Caruca's tqdm output
export TQDM_DISABLE=1
iterations="${ITERATIONS:-10}"

run_benchmark() {
    local cmd="$1"
    local benchmark_name="$cmd"
    local times=""

    for i in $(seq 1 "$iterations"); do
        echo "Running $cmd (Iteration $i)"
        time_output=$({ /usr/bin/time -f "%e" caruca trace "$cmd" >/dev/null; } 2>&1)
        times="$times,$time_output"
    done

    echo "$benchmark_name$times" >> "$output_file"
}

export CARUCA_ISOLATION_METHOD=try
output_file="$result_dir/benchmark_results_try.csv"
run_benchmark "cp"
run_benchmark "ls"
run_benchmark "rm"
run_benchmark "sed"
run_benchmark "xargs"

export CARUCA_ISOLATION_METHOD=docker
output_file="$result_dir/benchmark_results_docker.csv"
run_benchmark "cp"
run_benchmark "ls"
run_benchmark "rm"
run_benchmark "sed"
run_benchmark "xargs"

export CARUCA_ISOLATION_METHOD=none
output_file="$result_dir/benchmark_results_vanilla.csv"
run_benchmark "cp"
run_benchmark "ls"
run_benchmark "rm"
run_benchmark "sed"
run_benchmark "xargs"
