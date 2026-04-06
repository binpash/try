#!/usr/bin/env bash
BASE_DIR=$(realpath $(dirname $0))
BASE_DIR="."
echo $BASE_DIR

# Directory containing the cases
OUTPUT_FILE=${BASE_DIR}/"benchmark_results.csv"

# Remove results from previous runs 
rm -f $OUTPUT_FILE

# Iterate over each case in the directory, skipping the 'scripts' folder
for case_name in big_io small_files small_command; do

  # Define the script paths for run.sh and try-run.sh
  run_script="${BASE_DIR}/$case_name/run.sh"
  try_run_script="${BASE_DIR}/$case_name/try-run.sh"
  try_timed_run_script="${BASE_DIR}/$case_name/try-trace-run-timed.sh"

  # Function to run the script 10 times and collect the results
  run_benchmark() {
    local script_path=$1
    local benchmark_name="${case_name}_$(basename $script_path)"
    local times=""

    # Run the script 10 times and collect the timing results
    for i in {1..10}; do
      echo "Running $script_path (Iteration $i)"
      echo docker run --privileged -it --rm --name try-microb -v /tmp:/tmp try_micro_benchmarks /bin/bash "$script_path"
      time_output=$(docker run --privileged -it --rm --name try-microb -v /tmp:/tmp try_micro_benchmarks /bin/bash "$script_path" | sed 's/\r//g')
      times="$times,$time_output"
    done

    # Append the benchmark results to the CSV file
    echo "$benchmark_name$times" >> $OUTPUT_FILE
  }

  # Run benchmarks for both run.sh and try-run.sh if they exist
  run_benchmark "$run_script"
  run_benchmark "$try_run_script"
  run_benchmark "$try_timed_run_script"
done

echo "Benchmark results saved to $OUTPUT_FILE"
