#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

cd "$ROOT_DIR"

vagrant halt debian

rm -rf benchmarks/results
rm -rf benchmarks/dependency_tracking/results/incr
rm -rf benchmarks/partial_specification_mining/caruca/results/caruca
rm -rf artifacts/paper_eval

vagrant destroy -f debian
