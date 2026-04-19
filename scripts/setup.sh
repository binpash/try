#!/usr/bin/env bash
set -euo pipefail

prefix=$(realpath "$(dirname "${BASH_SOURCE[0]}")/..")

cd "$prefix"

require_docker_access() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "Docker is required but was not found in PATH." >&2
    exit 1
  fi

  local docker_probe
  if docker_probe=$(docker info 2>&1 >/dev/null); then
    return
  fi

  if [[ "$docker_probe" == *"permission denied"* ]] || [[ "$docker_probe" == *"docker.sock"* ]]; then
    cat >&2 <<'EOF'
Cannot access the Docker daemon.
The current user likely is not in the 'docker' group, or the Docker socket is not accessible.

Try:
  sudo usermod -aG docker "$USER"
  newgrp docker

Then rerun this script. If Docker is managed another way on your system, ensure this user can talk to the Docker daemon before continuing.
EOF
    exit 1
  fi

  printf 'Failed to talk to Docker: %s\n' "$docker_probe" >&2
  exit 1
}

ensure_verdaccio() {
  if docker inspect verdaccio >/dev/null 2>&1; then
    if [ "$(docker inspect -f '{{.State.Running}}' verdaccio)" != "true" ]; then
      docker start verdaccio >/dev/null
    fi
    return
  fi

  docker run -d --name verdaccio -p 4873:4873 verdaccio/verdaccio >/dev/null
}

require_docker_access
ensure_verdaccio
docker build . --network=host -t try_base_image
