#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
EVAL_DIR="${TOP}/evaluation"
BENCHMARK="spell"
BENCHMARK_DIR="${EVAL_DIR}/benchmarks/${BENCHMARK}"
SCRIPT_DIR="${BENCHMARK_DIR}/scripts"
OUTPUT_DIR="${BENCHMARK_DIR}/outputs"
INPUT_DIR="${BENCHMARK_DIR}/inputs"
mkdir -p "$OUTPUT_DIR"

suffix=""
for arg in "$@"; do
    case "$arg" in
        --small) suffix="-small" ;;
        --min) suffix="-min" ;;
    esac
done

SCRIPTS=("spell-1.sh" "spell-2.sh" "spell-3.sh" "spell-4.sh" "spell-5.sh" "spell-6.sh" "spell-7.sh")

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

    time_output=$({ time $cmd >"$out_file" 2>"$err_file"; } 2>&1)

    # Extract the real time and convert to seconds
    local elapsed
    elapsed=$(echo "$time_output" | grep real | awk '{print $2}' |
        awk -Fm '{if (NF==2){sub("s","",$2); print ($1*60)+$2}else{gsub("s","",$1); print $1}}')

    echo "$mode,$script,$elapsed" >> "$TIME_FILE"
}

export IN="${INPUT_DIR}/pg${suffix}"
export OUT="${OUTPUT_DIR}"

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
