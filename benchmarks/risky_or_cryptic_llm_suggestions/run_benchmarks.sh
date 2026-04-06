#!/bin/bash

#BASE_DIR=$(realpath $(dirname $0))
BASE_DIR="."
RESULT_DIR=$(realpath ${BASE_DIR}/..)/results/llm_scripts

# Directory containing the cases
OUTPUT_FILE=$RESULT_DIR/"benchmark_results.csv"

# Remove results from previous runs 
rm -f $OUTPUT_FILE

# Iterate over each case in the directory, skipping the 'scripts' folder
for case_name in find_exec_zip find_exec_touch find_txt grep_log sort_large_file; do
    case=${BASE_DIR}/${case_name}
   
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
        for i in {1..10}; do
          echo "Running $script_path (Iteration $i)"
          time_output=$(/bin/bash "$script_path" --time-only | sed 's/\r//g')      
          echo /bin/bash "$script_path" --time-only
          times="$times,$time_output"
          /bin/bash ${BASE_DIR}/restore_clean_data.sh
        done

        # Append the benchmark results to the CSV file
        echo "$benchmark_name$times" >> $OUTPUT_FILE
    }

    # Function to time the docker run of the script
    run_docker_benchmark() {
      local script_path=$1
      local benchmark_name="${case_name}_$(basename $script_path)"
      local times=""

      for i in {1..10}; do
        echo "Running $script_path (Iteration $i)"
        # Use root run-docker-high.sh with experiment path
        time_output=$(/usr/bin/time -f "%e" /bin/bash "${BASE_DIR}/run-docker-high.sh" "$case" 2>&1 >/dev/null)
        times="$times,$time_output"
      done  

      # Append the benchmark results to the CSV file
      echo "$benchmark_name$times" >> $OUTPUT_FILE
    }

  # Run benchmarks for both run.sh and try-run.sh if they exist
  [ -f "$case/$run_script" ] && run_benchmark "$case/$run_script"
  [ -f "$case/$try_run_script" ] && run_benchmark "$case/$try_run_script"
  [ -f "$case/$try_run_no_commit_script" ] && run_benchmark "$case/$try_run_no_commit_script"
  # Check if root run-docker-high.sh exists
  [ -f "${BASE_DIR}/run-docker-high.sh" ] && run_docker_benchmark "${BASE_DIR}/run-docker-high.sh"
  # [ -f "$case/$try_trace_run_script" ] && run_benchmark "$case/$try_trace_run_script"
  # [ -f "$case/$try_timed_script" ] && run_benchmark "$case/$try_timed_script"
done

echo "Benchmark results saved to $OUTPUT_FILE"
