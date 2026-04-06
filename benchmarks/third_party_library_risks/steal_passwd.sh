#!/usr/bin/env bash
HERE="$(cd "$(dirname "$0")" && pwd)"
cat /etc/passwd >> ${HERE}/../../README.md
git add ${HERE}/../../README.md
