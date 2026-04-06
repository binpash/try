#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
BENCHMARK="image-annotation"
BENCHMARK_DIR="${TOP}/evaluation/benchmarks/${BENCHMARK}"
INPUT_DIR="${TOP}/evaluation/benchmarks/${BENCHMARK}/inputs"

URL="https://atlas.cs.brown.edu/data"
mkdir -p "$INPUT_DIR"
cd "$INPUT_DIR" || exit 1

mkdir -p "$INPUT_DIR"

size=full
for arg in "$@"; do
    case "$arg" in
    --small) size=small ;;
    --min) size=min ;;
    esac
done
export LC_ALL=C

if [[ "$size" == "small" ]]; then
    # if inputs exist
    if [[ -d "$INPUT_DIR/jpg.small" ]]; then
        echo "Image data already downloaded and extracted."
    else
        data_url="${URL}"/small/jpg.zip
        zip_dst=$INPUT_DIR/jpg.small.zip
        out_dir=$INPUT_DIR/jpg.small
        wget --no-check-certificate $data_url -O $zip_dst || {
            echo "Failed to download $data_url"
            exit 1
        }
        unzip $zip_dst -d $out_dir || {
            echo "Failed to unzip $zip_dst"
            exit 1
        }
        rm "$zip_dst"
        input_dir="$INPUT_DIR/jpg.small/jpg"
        total=0
        for image in "$input_dir"/*; do
            if (( total + 1 <= 10 )); then
                total=$(( total + 1 ))
            else
                rm -f -- "$image"
            fi
        done
    fi
elif [[ "$size" == "min" ]]; then
    if [[ -d "$INPUT_DIR/jpg.min/jpg" ]]; then
        echo "Image data already downloaded and extracted."
    else
        mkdir -p "$INPUT_DIR"/jpg.min/jpg
        cp -r "${BENCHMARK_DIR}"/min_inputs/* "$INPUT_DIR"/jpg.min/jpg
    fi
else
    if [[ -d "$INPUT_DIR/jpg" ]]; then
        echo "Image data already downloaded and extracted."
    else
        echo "Downloading full dataset."
        data_url=https://atlas-group.cs.brown.edu/data/full/jpg.zip
        zip_dst="$INPUT_DIR/jpg.zip"
        out_dir="$INPUT_DIR/jpg"
        wget --no-check-certificate $data_url -O $zip_dst
        unzip $zip_dst -d $out_dir
        rm "$zip_dst"
    fi
fi
