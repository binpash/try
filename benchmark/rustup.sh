#!/bin/bash

export TMPDIR=/mnt
CARGO_HOME=$(mktemp -d)
export CARGO_HOME
RUSTUP_HOME=$(mktemp -d)
export RUSTUP_HOME
echo "$CARGO_HOME"
echo "$RUSTUP_HOME"
./timed-csv.sh tests/rustup.sh
du -hs "$CARGO_HOME"
du -hs "$RUSTUP_HOME"
