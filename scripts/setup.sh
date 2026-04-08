#!/usr/bin/env bash
prefix=$(realpath $(dirname "${BASH_SOURCE[0]}")/..)

cd $prefix

docker run -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
docker build .  --network=host -t try_base_image
