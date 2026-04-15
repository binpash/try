#!/usr/bin/env bash
set -euo pipefail

repo_root=$(realpath "$(dirname "${BASH_SOURCE[0]}")/..")
image_name="${TRY_EVAL_IMAGE:-try_eval_runner}"

if [ "$#" -eq 0 ]; then
    echo "Usage: ${0##*/} shell | tests | <eval_ae.py args...>" >&2
    echo "Example: ${0##*/} shell" >&2
    echo "Example: ${0##*/} tests" >&2
    echo "Example: ${0##*/} run setup" >&2
    echo "Example: ${0##*/} run all" >&2
    echo "Example: ${0##*/} report" >&2
    exit 2
fi

tty_flags=()
if [ -t 0 ] && [ -t 1 ]; then
    tty_flags=(-it)
fi

if ! docker image inspect "$image_name" >/dev/null 2>&1; then
    docker build -t "$image_name" "$repo_root"
fi

if [ "$1" = "shell" ]; then
    set -- /bin/bash
elif [ "$1" = "tests" ] || { [ "$#" -eq 2 ] && [ "$1" = "run" ] && [ "$2" = "tests" ]; }; then
    set -- /bin/bash -lc "scripts/run_tests.sh"
else
    set -- python3 scripts/eval_ae.py "$@"
fi

docker run --rm "${tty_flags[@]}" \
    --privileged \
    --network host \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$repo_root":/workspace \
    -w /workspace \
    "$image_name" \
    "$@"
