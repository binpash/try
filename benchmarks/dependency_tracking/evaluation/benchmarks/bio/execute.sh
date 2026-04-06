#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
EVAL_DIR="${TOP}/evaluation"
BENCHMARK="bio"
BENCHMARK_DIR="${EVAL_DIR}/benchmarks/${BENCHMARK}"
SCRIPT_DIR="${BENCHMARK_DIR}/scripts"
OUTPUT_DIR="${BENCHMARK_DIR}/outputs"
INPUT_DIR="${BENCHMARK_DIR}/inputs"
mkdir -p "$OUTPUT_DIR"

IN="inputs/bio-full"
IN_NAME="inputs/bio-full/input.txt"
OUT="outputs"

for arg in "$@"; do
    case "$arg" in
        --small)
            IN_NAME="inputs/bio-small/input_small.txt" 
            IN="inputs/bio-small"
            ;;
        --min)   
            IN_NAME="inputs/bio-min/input_min.txt" 
            IN="inputs/bio-min"
            ;;
    esac
done

IN="${BENCHMARK_DIR}/$IN"
IN_NAME="${BENCHMARK_DIR}/$IN_NAME"
OUT="${BENCHMARK_DIR}/$OUT"

SCRIPTS=("bio-1.sh" "bio-2.sh" "bio-3.sh" "bio-4-0.sh" "bio-4.sh" "bio-5.sh" "bio-6.sh")

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

export IN
export OUT
export IN_NAME
cp ./Gene_locs.txt scripts

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
