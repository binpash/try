#!/bin/bash
cd "$(dirname "$0")" || exit 1

TOP=$(git rev-parse --show-toplevel)
BENCHMARK="file-mod"
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
    data_url="${URL}/llm/playlist_small.tar.gz"
    wget --no-check-certificate $data_url -O "$INPUT_DIR"/playlist_small.tar.gz
    tar -xzf "$INPUT_DIR/playlist_small.tar.gz" -C "$INPUT_DIR"
    rm "$INPUT_DIR/playlist_small.tar.gz"
    mv "$INPUT_DIR/playlist_small" "$INPUT_DIR/songs.small"
    input_dir="$INPUT_DIR/songs.small"
    total=0
    for song in "$input_dir"/*; do
        if (( total + 1 <= 2 )); then
            total=$(( total + 1 ))
            (cd -- "$song" && ls -1 | sort | tail -n +11 | xargs rm --)
        else
            rm -rf -- "$song"
        fi
    done
    exit 0
elif [[ "$size" == "min" ]]; then
    if [[ -d "$INPUT_DIR/jpg.min" ]]; then
        echo "Image data already downloaded and extracted."
    else
        cp -r "${BENCHMARK_DIR}"/min_inputs/jpg.min "$INPUT_DIR"
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
