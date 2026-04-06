#!/bin/bash

BASE_DIR=$(realpath $(dirname $0))
RESULT_DIR=$(realpath ${BASE_DIR}/..)/results/npm_pre_postinstall

# Directory containing the cases
OUTPUT_FILE=$RESULT_DIR/"benchmark_results.csv"

# Remove results from previous runs 
rm -f $OUTPUT_FILE

# Iterate over each case in the directory, skipping the 'scripts' folder
for case_name in eslint-scope node-sass coa ua-parser-js; do
    case=${BASE_DIR}/${case_name}

    # Define the script paths for run.sh and try-run.sh
    run_docker_script="run-docker.sh"
    run_script="run.sh"
    try_run_script="try-run.sh"
    try_trace_run_script="try-trace-run.sh"
    try_timed_script="try-timed-run.sh"

    # Function to run the script 10 times and collect the results
    run_benchmark() {
	local script_path=$1
	local benchmark_name="${case_name}_$(basename $script_path)"
	local times=""

	# Run the script 10 times and collect the timing results
	for i in {1..10}; do
	    echo "Running $script_path (Iteration $i)"
	    time_output=$(/bin/bash "$script_path" --time-only | sed 's/\r//g')
	    times="$times,$time_output"
	done

	# Append the benchmark results to the CSV file
	echo "$benchmark_name$times" >> $OUTPUT_FILE
    }

    run_docker_benchmark() {
        local script_path=$1
        local benchmark_name="${case_name}_$(basename $script_path)"
        local times=""
        local container_script_path="${case_name}/$(basename $script_path)"
        
        
        for i in {1..10}; do
            echo "Running $script_path (Iteration $i)"
            time_output=$(/usr/bin/time -f "%e" sh -c "docker run --privileged --network=host -it --rm --name try-greg2 -v /tmp:/tmp try_prepostinstall_benchmarks /bin/bash \"$container_script_path\" >/dev/null 2>&1" 2>&1)
            times="$times,$time_output"
        done

        # Append the benchmark results to the CSV file
        echo "$benchmark_name$times" >> $OUTPUT_FILE
    }

    # Run benchmarks for both run.sh and try-run.sh if they exist
    [ -f "$case/$run_docker_script" ] && run_docker_benchmark "$case/$run_docker_script"
    [ -f "$case/$run_script" ] && run_benchmark "./$case_name/$run_script"
    [ -f "$case/$try_run_script" ] && run_benchmark "./$case_name/$try_run_script"
    # [ -f "$case/$try_trace_run_script" ] && run_benchmark "./$case_name/$try_trace_run_script"
    # [ -f "$case/$try_timed_script" ] && run_benchmark "./$case_name/$try_timed_script"
done

echo "Benchmark results saved to $OUTPUT_FILE"
