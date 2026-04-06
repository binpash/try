#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
EVAL_DIR="${TOP}/evaluation"
BENCHMARK="weather"
BENCHMARK_DIR="${EVAL_DIR}/benchmarks/${BENCHMARK}"
SCRIPT_DIR="${BENCHMARK_DIR}/scripts"
OUTPUT_DIR="${BENCHMARK_DIR}/outputs"
mkdir -p "$OUTPUT_DIR"

size=full
for arg in "$@"; do
    case "$arg" in
    --small) size=small ;;
    --min) size=min ;;
    esac
done

if [[ "$1" == "tuft-weather" ]]; then
    IS_TUFT_WEATHER=1
    INPUT="${BENCHMARK_DIR}/inputs/tuft_weather.${size}.txt"
    SCRIPTS=("tuft-weather-1.sh" "tuft-weather-2.sh" "tuft-weather-3.sh")
else
    IS_TUFT_WEATHER=0
    INPUT="${BENCHMARK_DIR}/inputs/temperatures.${size}.txt"
    SCRIPTS=("temp-analytics-1.sh" "temp-analytics-2.sh" "temp-analytics-3.sh")
fi

if [[ "$size" == "full" && "$1" == "mydata" ]]; then
    INPUT="/mydata/inputs/temperatures.${size}.txt"
fi

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

    if [[ "$IS_TUFT_WEATHER" == 1 ]]; then
        export input_file="$INPUT"
        export plot_dir="$BENCHMARK_DIR/plots/$mode"
        export scripts_dir="$SCRIPT_DIR"
        mkdir -p "$OUTPUT_DIR/$mode.$size"
    else
        export input_file="$INPUT"
        export statistics_dir="$OUTPUT_DIR/statistics.$mode.$size"
        mkdir -p "$statistics_dir"
    fi

    time_output=$({ time INPUT=$INPUT $cmd >"$out_file" 2>"$err_file"; } 2>&1)

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
