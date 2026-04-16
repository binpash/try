#!/usr/bin/env bash
set -euo pipefail

repo_root=$(realpath "$(dirname "${BASH_SOURCE[0]}")/..")
image_name="${TRY_EVAL_IMAGE:-try_eval_runner}"
container_name="${TRY_EVAL_CONTAINER:-try_eval_runner}"

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

ensure_container() {
    if ! docker container inspect "$container_name" >/dev/null 2>&1; then
        docker create \
            --name "$container_name" \
            --privileged \
            --network host \
            -v /var/run/docker.sock:/var/run/docker.sock \
            -v "$repo_root":/workspace \
            -w /workspace \
            "$image_name" \
            tail -f /dev/null >/dev/null
    fi

    if [ "$(docker inspect -f '{{.State.Running}}' "$container_name")" != "true" ]; then
        docker start "$container_name" >/dev/null
    fi
}

ensure_container

exec_env_flags=()
if [ -n "${ITERATIONS+x}" ]; then
    exec_env_flags+=(-e "ITERATIONS=$ITERATIONS")
fi

if [ "$1" = "shell" ]; then
    docker exec "${tty_flags[@]}" "${exec_env_flags[@]}" -w /workspace "$container_name" /bin/bash
    exit $?
elif [ "$1" = "tests" ] || { [ "$#" -eq 2 ] && [ "$1" = "run" ] && [ "$2" = "tests" ]; }; then
    set -- /bin/bash -lc "scripts/run_tests.sh"
else
    set -- python3 scripts/eval_ae.py "$@"
fi

docker exec "${tty_flags[@]}" \
    "${exec_env_flags[@]}" \
    -w /workspace \
    "$container_name" \
    "$@"
