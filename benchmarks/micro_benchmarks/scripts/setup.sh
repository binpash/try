#!/usr/bin/env bash
set -euo pipefail

prefix=$(realpath "$(dirname "${BASH_SOURCE[0]}")/..")
repo_root=$(realpath "${prefix}/../..")
build_dir=$(mktemp -d)
trap 'rm -rf "$build_dir"' EXIT

sudo install -m 0755 "${repo_root}/try" /usr/local/bin/try
sudo install -m 0755 "${repo_root}/scripts/try-timed" /usr/local/bin/try-timed
sudo install -m 0755 "${repo_root}/scripts/try-patched" /usr/local/bin/try-patched
sudo install -m 0755 "${repo_root}/utils/parse_trace.py" /usr/local/bin/trace_v2.py

gcc -g -Wall -O2 -I"${repo_root}/utils" -c "${repo_root}/utils/ignores.c" -o "${build_dir}/ignores.o"
gcc -g -Wall -O2 -I"${repo_root}/utils" -c "${repo_root}/utils/try-summary.c" -o "${build_dir}/try-summary.o"
gcc -g -Wall -O2 -I"${repo_root}/utils" -c "${repo_root}/utils/try-commit.c" -o "${build_dir}/try-commit.o"
gcc -g -Wall -O2 -o "${build_dir}/try-summary" "${build_dir}/ignores.o" "${build_dir}/try-summary.o"
gcc -g -Wall -O2 -o "${build_dir}/try-commit" "${build_dir}/ignores.o" "${build_dir}/try-commit.o"

sudo install -m 0755 "${build_dir}/try-summary" /usr/local/bin/try-summary
sudo install -m 0755 "${build_dir}/try-commit" /usr/local/bin/try-commit

cd "${repo_root}/utils/gidmapper"
cargo build --release
sudo install -m 0755 target/release/gidmapper /usr/local/bin/gidmapper
sudo setcap 'CAP_SETGID=ep' /usr/local/bin/gidmapper

cd "${prefix}/create_files"
rm -f Cargo.lock
cargo build --release
sudo install -m 0755 target/release/create_files /usr/local/bin/create_files
