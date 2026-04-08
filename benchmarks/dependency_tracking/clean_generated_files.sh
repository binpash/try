#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "[*] Cleaning dependency-tracking scratch state..."
sudo rm -rf /tmp/incr
find "$SCRIPT_DIR" -type d -name "__pycache__" -prune -exec rm -rf {} +
find "$SCRIPT_DIR" -type f -name "incr_script_*.sh" -delete
