#!/bin/bash

base_dir=$(realpath "$(dirname "$0")")
cd "$base_dir" || exit 1
result_dir=./results/incr

mkdir -p ${result_dir}

# Remove results from previous runs 
# rm -f "$result_dir"/*

export IN="$PWD/evaluation/microbenchmarks/eager/inputs/pg-small"

run_benchmark() {
	local benchmark_name="$1"
	local script="./evaluation/microbenchmarks/eager/scripts/$2"
	local times=""
	
	for i in {1..10}; do
		sudo rm -rf /tmp/*
		rm -rf /tmp/incr
		echo "Running $script_path (Iteration $i)"
		time_output=$( { /usr/bin/time -f "%e" ./incr.sh $script >/dev/null; } 2>&1)
		times="$times,$time_output"
	done

	echo "$benchmark_name$times" >> $output_file
}

export INCR_ISOLATION_MODE=try
output_file=${result_dir}/"benchmark_results_try.csv"
run_benchmark "nlp" eager-stream-processing.sh
run_benchmark "spell" spell-7.sh
run_benchmark "unixfun" unixfun.sh
run_benchmark "covid" covid.sh

export INCR_ISOLATION_MODE=docker
output_file=${result_dir}/"benchmark_results_docker.csv"
run_benchmark "nlp" eager-stream-processing.sh
run_benchmark "spell" spell-7.sh
run_benchmark "unixfun" unixfun.sh
run_benchmark "covid" covid.sh

export INCR_ISOLATION_MODE=none
output_file=${result_dir}/"benchmark_results_vanilla.csv"
run_benchmark "nlp" eager-stream-processing.sh
run_benchmark "spell" spell-7.sh
run_benchmark "unixfun" unixfun.sh
run_benchmark "covid" covid.sh
