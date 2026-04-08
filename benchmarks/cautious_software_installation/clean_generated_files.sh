#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

selection="${1:-all}"
cases=(eslint-scope node-sass coa ua-parser-js)

cleanup_case() {
    local case_name="$1"
    local case_dir="$SCRIPT_DIR/$case_name/$case_name"
    if [ ! -d "$case_dir" ]; then
        return
    fi

    if [ -d "$case_dir/node_modules" ] || [ -f "$case_dir/package-lock.json" ]; then
        echo "[*] Cleaning npm install artifacts for $case_name..."
        rm -rf "$case_dir/node_modules"
        rm -f "$case_dir/package-lock.json"
    fi
}

case "$selection" in
    all)
        for case_name in "${cases[@]}"; do
            cleanup_case "$case_name"
        done
        ;;
    eslint-scope|node-sass|coa|ua-parser-js)
        cleanup_case "$selection"
        ;;
    *)
        echo "Unknown cleanup target: $selection" >&2
        exit 1
        ;;
esac
