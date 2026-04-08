#!/bin/bash
set -euo pipefail

base_dir=$(realpath "$(dirname "$0")")
cd "$base_dir" || exit 1

DOCKER_IMAGE="${DOCKER_IMAGE:-incr}"
FORCE_RELEASE_BUILD="${FORCE_RELEASE_BUILD:-0}"
FORCE_DOCKER_BUILD="${FORCE_DOCKER_BUILD:-0}"
release_binary="$base_dir/target/release/incr"

needs_release_build() {
	if [ ! -x "$release_binary" ]; then
		return 0
	fi

	find "$base_dir/src" "$base_dir/Cargo.toml" "$base_dir/Cargo.lock" -type f -newer "$release_binary" \
		-print -quit 2>/dev/null | grep -q .
}

ensure_release_binary() {
	if [ "$FORCE_RELEASE_BUILD" = "1" ] || needs_release_build; then
		echo "[*] Building dependency-tracking release binary..."
		cargo build --release
	fi
}

ensure_docker_image() {
	if [ "$FORCE_DOCKER_BUILD" = "1" ] || ! docker image inspect "$DOCKER_IMAGE" >/dev/null 2>&1; then
		echo "[*] Building dependency-tracking Docker image '$DOCKER_IMAGE'..."
		docker build -t "$DOCKER_IMAGE" .
	fi
}

ensure_release_binary
ensure_docker_image
