#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
EVAL_DIR="${TOP}/evaluation"
BENCHMARK="beginner"
BENCHMARK_DIR="${EVAL_DIR}/benchmarks/${BENCHMARK}"
SCRIPT_DIR="${BENCHMARK_DIR}/scripts"
OUTPUT_DIR="${BENCHMARK_DIR}/outputs"
INPUT_DIR="${BENCHMARK_DIR}/inputs"
mkdir -p "$OUTPUT_DIR"

size=full
for arg in "$@"; do
    case "$arg" in
    --small) size=small ;;
    --min) size=min ;;
    esac
done
INPUT="${BENCHMARK_DIR}/inputs/nginx-logs_${size}"

SCRIPTS=(
    "beginner-01.sh"
    "beginner-02.sh"
    "beginner-03.sh"
    "beginner-04.sh" 
    "beginner-05.sh"
    "beginner-06.sh" 
    "beginner-07.sh"
    "beginner-08.sh"
    "beginner-09.sh"
    "beginner-10.sh"
    "beginner-11.sh"
    "beginner-12.sh"
    "beginner-13.sh"
    "beginner-14.sh"
)

TIME_FILE="${OUTPUT_DIR}/timing.csv"
echo "mode,script,time_sec" > "$TIME_FILE"

measure_time() {
    local mode=$1
    local script=$2

    local out_file="${OUTPUT_DIR}/${script}.${mode}.out"
    local err_file="${OUTPUT_DIR}/${script}.${mode}.err"
    local time_output
    local cmd

    if [[ "$mode" == "incr" ]]; then
        cache_dir="${BENCHMARK_DIR}/cache"
        cmd="${TOP}/incr.sh ${SCRIPT_DIR}/${script} ${cache_dir}"
    else
        cmd="bash ${SCRIPT_DIR}/${script}"
    fi

    time_output=$({ time INPUT=$INPUT $cmd >"$out_file" 2>"$err_file"; } 2>&1)

    # Extract the real time and convert to seconds
    local elapsed
    elapsed=$(echo "$time_output" | grep real | awk '{print $2}' |
        awk -Fm '{if (NF==2){sub("s","",$2); print ($1*60)+$2}else{gsub("s","",$1); print $1}}')

    echo "$mode,$script,$elapsed" >> "$TIME_FILE"
}

export OUT=${OUTPUT_DIR}
export IN="${INPUT_DIR}/nginx-logs_${size}"/log0

# Baseline: bash
for script in "${SCRIPTS[@]}"; do
    echo "Running ${script} with bash..."
    measure_time "bash" $script
done

# Incremental run: incr
for script in "${SCRIPTS[@]}"; do
    echo "Running $script with incr..."
    measure_time "incr" $script
done
