#!/bin/bash
cd "$(dirname "$0")" || exit 1

BENCHMARKS=(
    "beginner"
    "bio"
    "covid"
    "dpt"
    "file-mod"
    "image-annotation"
    "nginx-analysis"
    "nlp-uppercase"
    "nlp-ngrams"
    "poet"
    "spell"
    "unixfun"
    "weather"
    "word-freq"
)
SIZES=(
    "small"
    "small"
    "small"
    "small"
    "small"
    "small"
    "small"
    "small"
    "small"
    "small"
    "small"
    "small"
    "small"
    "small"
)

rm -rf ../run_results
mkdir -p ../run_results

for i in "${!BENCHMARKS[@]}"; do
    benchmark="${BENCHMARKS[$i]}"
    size="${SIZES[$i]}"
    mode=""

    echo "Running $benchmark '$mode' $size"
    sudo bash "./$benchmark/clean.sh"
    sleep 0.01

    if [[ "$mode" == "" ]]; then
        bash "./$benchmark/execute.sh" "--$size"
    else
        bash "./$benchmark/execute.sh" "$mode" "--$size"
    fi
    sleep 0.01

    cp "./$benchmark/outputs/timing.csv" "../run_results/$benchmark-time.csv"
    du -sb "./$benchmark/cache" > "../run_results/$benchmark-size.txt"
    # TODO: generate output hashes

    rm -rf "./$benchmark/cache"
    rm -rf "./$benchmark/outputs"
    rm -rf "/tmp/sort*"
    rm -rf "/tmp/tmp.*"
done
