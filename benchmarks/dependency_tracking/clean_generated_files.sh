#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "[*] Cleaning dependency-tracking scratch state..."
if [ -d /tmp/incr ]; then
    if command -v findmnt >/dev/null 2>&1; then
        findmnt -Rn -o TARGET --submounts /tmp/incr 2>/dev/null | sort -r | while IFS= read -r mountpoint; do
            [ -n "$mountpoint" ] || continue
            sudo umount "$mountpoint" 2>/dev/null || sudo umount -l "$mountpoint" 2>/dev/null || true
        done
    fi

    find /tmp/incr -depth -type d 2>/dev/null | while IFS= read -r path; do
        [ -n "$path" ] || continue
        sudo umount "$path" 2>/dev/null || sudo umount -l "$path" 2>/dev/null || true
    done

    sudo rm -rf /tmp/incr || true
fi
find "$SCRIPT_DIR" -type d -name "__pycache__" -prune -exec rm -rf {} +
find "$SCRIPT_DIR" -type f -name "incr_script_*.sh" -delete
