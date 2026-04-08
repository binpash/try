#!/bin/bash
set -euo pipefail

tmp_tar=$(mktemp /tmp/hash_dir.XXXXXX.tar)
trap 'rm -f "$tmp_tar"' EXIT

tar \
  --sort=name \
  --mtime='UTC 1970-01-01' \
  --owner=0 \
  --group=0 \
  --numeric-owner \
  --exclude='./.git' \
  --exclude='./.ruff_cache' \
  --exclude='./.pytest_cache' \
  --exclude='./__pycache__' \
  --exclude='./.mypy_cache' \
  -cf "$tmp_tar" .

sha1sum "$tmp_tar" | awk '{print $1}'
