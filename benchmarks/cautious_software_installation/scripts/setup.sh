#!/usr/bin/env bash
set -euo pipefail

prefix=$(realpath "$(dirname "${BASH_SOURCE[0]}")/..")

cd "$prefix"

docker build . --network=host -t try_prepostinstall_benchmarks
