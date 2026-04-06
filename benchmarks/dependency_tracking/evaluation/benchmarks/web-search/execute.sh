#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1
TOP=$(git rev-parse --show-toplevel)
EVAL_DIR="${TOP}/evaluation"
BENCHMARK="web-search"
BENCHMARK_DIR="${EVAL_DIR}/benchmarks/${BENCHMARK}"
SCRIPT_DIR="${BENCHMARK_DIR}/scripts"
OUTPUT_DIR="${BENCHMARK_DIR}/outputs"
INPUT_DIR="${BENCHMARK_DIR}/inputs"
mkdir -p "$OUTPUT_DIR"

# ensure a local ./tmp directory exists for sorting
mkdir -p ./tmp
export TMPDIR=$PWD/tmp
export IN=$INPUT_DIR
export OUT=$OUTPUT_DIR

size="full"
suffix=""
for arg in "$@"; do
    if [ "$arg" = "--small" ]; then
        size="small"
        suffix="_small"
        break
    elif [ "$arg" = "--min" ]; then
        size="min"
        suffix="_min"
        break
    fi
done

export TEST_BASE=$BENCHMARK_DIR
export WIKI="$INPUT_DIR/articles$suffix"
export INDEX_FILE="$INPUT_DIR/index$suffix.txt"

SCRIPTS=("engine.sh")

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
