#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
BENCHMARK="weather"
eval_dir="${TOP}/evaluation/benchmarks/${BENCHMARK}"
input_dir="${TOP}/evaluation/benchmarks/${BENCHMARK}/inputs"

URL='https://atlas.cs.brown.edu/data'
URL=$URL/max-temp
FROM=2000
TO=2015

n_samples=99999
suffix="full"

mkdir -p "${input_dir}"

size=full
for arg in "$@"; do
    case "$arg" in
    --small) size=small ;;
    --min) size=min ;;
    esac
done

if [[ "$size" == "min" ]]; then
    if [[ -f "$input_dir/temperatures.min.txt" && -f "$input_dir/tuft_weather.$size.txt" ]]; then
        echo "Data already downloaded and extracted."
        exit 0
    fi
    min_inputs="$eval_dir/min_inputs/"
    mkdir -p "$input_dir"
    cp -r "$min_inputs"/* "$input_dir/"
    python3 $eval_dir/scripts/generate_input.py $input_dir/tuft_weather.$size.txt --size $size
    exit 0
fi

if [[ "$size" == "small" ]]; then
    if [[ -f "$input_dir/temperatures.small.txt" && -f "$input_dir/tuft_weather.$size.txt" ]]; then
        echo "Data already downloaded and extracted."
        exit 0
    fi
    data_url="${URL}/temperatures.small.tar.gz"
    wget --no-check-certificate "$data_url" -O "$input_dir/temperatures.small.tar.gz" || {
        echo "Failed to download $data_url"
        exit 1
    }
    tar -xzf "$input_dir/temperatures.small.tar.gz" -C "$input_dir" || {
        echo "Failed to extract $input_dir/temperatures.small.tar.gz"
        exit 1
    }
    rm "$input_dir/temperatures.small.tar.gz"
    mv "$input_dir/inputs/temperatures.small.txt" "$input_dir/temperatures.small.txt"
    rm -rf "$input_dir/inputs"
    python3 $eval_dir/scripts/generate_input.py $input_dir/tuft_weather.$size.txt --size $size
    exit 0
fi

if [[ -f "$input_dir/temperatures.full.txt" && -f "$input_dir/tuft_weather.$size.txt" ]]; then
    echo "Data already downloaded and extracted."
    exit 0
fi
data_url="${URL}/temperatures.full.tar.gz"
wget --no-check-certificate "$data_url" -O "$input_dir/temperatures.full.tar.gz" || {
    echo "Failed to download $data_url"
    exit 1
}
tar -xzf "$input_dir/temperatures.full.tar.gz" -C "$input_dir" || {
    echo "Failed to extract $input_dir/temperatures.full.tar.gz"
    exit 1
}
rm "$input_dir/temperatures.full.tar.gz"
mv "$input_dir/inputs/temperatures.full.txt" "$input_dir/temperatures.full.txt"
rm -rf "$input_dir/inputs"
python3 $eval_dir/scripts/generate_input.py $input_dir/tuft_weather.$size.txt --size $size
