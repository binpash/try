#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
EVAL_DIR="${TOP}/evaluation"
BENCHMARK="image-annotation"
BENCHMARK_DIR="${EVAL_DIR}/benchmarks/${BENCHMARK}"
SCRIPT_DIR="${BENCHMARK_DIR}/scripts"
INPUT_DIR="${BENCHMARK_DIR}/inputs"
OUTPUT_DIR="${BENCHMARK_DIR}/outputs"
mkdir -p "$OUTPUT_DIR"

suffix=".full"
for arg in "$@"; do
    case "$arg" in
        --small) suffix=".small" ;;
        --min) suffix=".min" ;;
    esac
done

llm --no-log -m "gpt-4o-mini" "Respond with the single word 'ok'"
export IMG_DIR="${BENCHMARK_DIR}/inputs/jpg${suffix}/jpg"

SCRIPTS=(
    "image-annotation-1.sh"
    "image-annotation-2.sh"
    "image-annotation-3.sh"
    "image-annotation-4.sh"
    "image-annotation-5.sh"
    "image-annotation-6.sh"
    "image-annotation-7.sh"
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

    export mode="$mode"

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

export IN="$INPUT_DIR/jpg$suffix/jpg"
export OUT="$OUTPUT_DIR"

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
