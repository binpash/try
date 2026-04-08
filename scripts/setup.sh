#!/usr/bin/env bash
set -euo pipefail

prefix=$(realpath "$(dirname "${BASH_SOURCE[0]}")/..")

cd "$prefix"

ensure_verdaccio() {
  if docker inspect verdaccio >/dev/null 2>&1; then
    if [ "$(docker inspect -f '{{.State.Running}}' verdaccio)" != "true" ]; then
      docker start verdaccio >/dev/null
    fi
    return
  fi

  docker run -d --name verdaccio -p 4873:4873 verdaccio/verdaccio >/dev/null
}

ensure_verdaccio
docker build . --network=host -t try_base_image
