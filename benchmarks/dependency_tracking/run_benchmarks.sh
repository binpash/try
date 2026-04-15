#!/bin/bash

base_dir=$(realpath "$(dirname "$0")")
cd "$base_dir" || exit 1
result_dir=./results/incr
TIME_BIN="${TIME_BIN:-/usr/bin/time}"
ITERATIONS="${ITERATIONS:-10}"
BENCHMARK_CASES="${BENCHMARK_CASES:-nlp spell unixfun covid}"

mkdir -p "${result_dir}"

/bin/bash "$base_dir/setup.sh"

cleanup() {
	/bin/bash "$base_dir/clean_generated_files.sh"
}
trap cleanup EXIT INT TERM

sudo rm -rf /tmp/incr/*
# Remove results from previous runs 
# rm -f "$result_dir"/*

top=$(git rev-parse --show-toplevel)
source "$top/.venv/bin/activate"

cp evaluation/microbenchmarks/eager/inputs/dict.txt /usr/share/dict/words

default_in="$PWD/evaluation/microbenchmarks/eager/inputs/pg-small"
used_default_in=false
if [ -z "${IN:-}" ]; then
	export IN="$default_in"
	used_default_in=true
fi

prepare_default_input() {
	local fallback_root="${INCR_EAGER_INPUT_DIR:-/tmp/dependency_tracking_inputs}"
	local readable_input=""

	if [ -d "$IN" ]; then
		readable_input="$(find "$IN" -type f -readable -print -quit 2>/dev/null || true)"
	fi

	if [ -n "$readable_input" ]; then
		return
	fi

	echo "Preparing readable eager inputs under $fallback_root"
	INCR_EAGER_INPUT_DIR="$fallback_root" /bin/bash "$base_dir/evaluation/microbenchmarks/eager/fetch.sh" --small
	export IN="$fallback_root/pg-small"
}

if [ "$used_default_in" = true ]; then
	prepare_default_input
fi

run_benchmark() {
	local benchmark_name="$1"
	local script="./evaluation/microbenchmarks/eager/scripts/$2"
	local times=""
	local runner=("./incr.sh" "$script")

	if [ $INCR_ISOLATION_MODE = "none" ]; then
		runner=("/bin/bash" "$script")
	fi

	for ((i = 1; i <= ITERATIONS; i++)); do
		sudo rm -rf /tmp/incr/*
		echo "Running $script ($INCR_ISOLATION_MODE) (Iteration $i)"
		time_output=$( { "$TIME_BIN" -f "%e" "${runner[@]}" >/dev/null; } 2>&1)
		times="$times,$time_output"
	done

	echo "$benchmark_name$times" >> "$output_file"
}

export INCR_ISOLATION_MODE=try
output_file=${result_dir}/"benchmark_results_try.csv"
: > "$output_file"
for benchmark_name in $BENCHMARK_CASES; do
	case "$benchmark_name" in
		nlp) run_benchmark "nlp" eager-stream-processing.sh ;;
		spell) run_benchmark "spell" spell-7.sh ;;
		unixfun) run_benchmark "unixfun" unixfun.sh ;;
		covid) run_benchmark "covid" covid.sh ;;
		*)
			echo "Unknown benchmark: $benchmark_name" >&2
			exit 1
			;;
	esac
done

export INCR_ISOLATION_MODE=docker
output_file=${result_dir}/"benchmark_results_docker.csv"
: > "$output_file"
for benchmark_name in $BENCHMARK_CASES; do
	case "$benchmark_name" in
		nlp) run_benchmark "nlp" eager-stream-processing.sh ;;
		spell) run_benchmark "spell" spell-7.sh ;;
		unixfun) run_benchmark "unixfun" unixfun.sh ;;
		covid) run_benchmark "covid" covid.sh ;;
		*)
			echo "Unknown benchmark: $benchmark_name" >&2
			exit 1
			;;
	esac
done

export INCR_ISOLATION_MODE=none
output_file=${result_dir}/"benchmark_results_vanilla.csv"
: > "$output_file"
for benchmark_name in $BENCHMARK_CASES; do
	case "$benchmark_name" in
		nlp) run_benchmark "nlp" eager-stream-processing.sh ;;
		spell) run_benchmark "spell" spell-7.sh ;;
		unixfun) run_benchmark "unixfun" unixfun.sh ;;
		covid) run_benchmark "covid" covid.sh ;;
		*)
			echo "Unknown benchmark: $benchmark_name" >&2
			exit 1
			;;
	esac
done

deactivate
