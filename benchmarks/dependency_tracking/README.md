# incr

Bolt-on incremental execution for the shell.

## Development Setup

1. Ensure Rust is installed and Ubuntu is running on 22.04 with updated packages (`sudo apt update` and `sudo apt upgrade`).
2. Install OverlayFS with `sudo apt install mergerfs`.
3. Install Python dependencies for the `insert.py` script:
```sh
pip3 install --no-cache-dir -r requirements.txt
```
4. Edit the `src/config.rs` to contain absolute paths to the `try.sh` script and directory you want cached results to be saved into.
5. Build binaries with `cargo build` and `cargo build --release`.

### Using Docker

To build and run the Docker container, use the following commands:

```sh
docker build -t incr .
docker run -it --rm -v $(pwd):/app --privileged incr
```

Toggle the `DEBUG` and `DEBUG_LOGS` flag in `src/config.rs` to enable debug information to be saved in the cache directory and a log file to be generated.

## Benchmark Setup

The `evaluation/war-and-peace` directory contains a basic benchmark that counts the number of words in War and Peace.
Run the scripts `./evaluation/war-and-peace/with_cache.sh` and `./evaluation/war-and-peace/without_cache.sh` from the directory above `src` where the relative path accesses are correct.

Install the Koala benchmarks by cloning the repository https://github.com/kbensh/koala.
The benchmark scripts need to be manually edited to insert invocations of `target/release/incr`.
An example edited script from the NLP benchmark is:

```sh
#!/bin/bash
# tag: count_words

IN="/users/jxia3/incr/koala/nlp/inputs/pg-small"
OUT="/users/jxia3/incr/koala/nlp/outputs/count_words"
ENTRIES=${ENTRIES:-50}
mkdir -p "$OUT"

for input in $(ls ${IN} | head -n ${ENTRIES} | xargs -I arg1 basename arg1)
do
    cat $IN/$input | tr -c 'A-Za-z' '[\n*]' | grep -v "^\s*$" | sort | uniq -c > $OUT/${input}.out
done

echo 'done';
# rm -rf "$OUT"
```