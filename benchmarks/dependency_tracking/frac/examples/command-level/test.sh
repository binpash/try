#!/bin/bash
# Test script for frac command-level fault injection
# 
# This demonstrates permanent fail-stop fault injection:
# - tr processes ~500 bytes of input
# - frac kills tr at exactly 500 bytes
# - grep receives partial output and terminates naturally
# - Result: fewer matches than ground truth (expected behavior)

# Set up Python path for in-repo frac module
REPO_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
export PYTHONPATH="$REPO_ROOT:$PYTHONPATH"

INPUT_URL='https://atlas.cs.brown.edu/data/dummy/1M.txt'

# Download the input file only if missing
if [ ! -f in.txt ]; then
  echo "[demo] Downloading input (1 MB)…" >&2
  curl -sf "${INPUT_URL}" -o in.txt || { echo "Download failed" >&2; exit 1; }
else
  echo "[demo] Reusing cached in.txt" >&2
fi

# Ensure output file exists
touch out.txt

echo "[demo] Starting fault injection pipeline" >&2

# New unified CLI syntax:
# - Uses --cmd instead of -- separator
# - Pipes data through stdin/stdout like any Unix filter
cat in.txt | \
python -m frac byte-kill --bytes 500 --cmd "tr A-Z a-z" | \
grep '\(.\).*\1\(.\).*\2\(.\).*\3\(.\).*\4' > out.txt

echo "[demo] Finished. Matches written to out.txt" >&2
echo "[demo] Found $(wc -l < out.txt) matches" >&2

# Create ground truth: what SHOULD happen with exactly 500 bytes
echo "[demo] Creating ground truth with first 500 bytes" >&2
head -c 500 in.txt | \
tr A-Z a-z | \
grep '\(.\).*\1\(.\).*\2\(.\).*\3\(.\).*\4' > ground_truth_500.txt
echo "[demo] Ground truth (500 bytes): $(wc -l < ground_truth_500.txt) matches" >&2

# Also show full file result for comparison
cat in.txt | \
tr A-Z a-z | \
grep '\(.\).*\1\(.\).*\2\(.\).*\3\(.\).*\4' > expected_full.txt
echo "[demo] Full file result: $(wc -l < expected_full.txt) matches" >&2

# Compare fault injection result with 500-byte ground truth
if [ $(wc -l < out.txt) -eq $(wc -l < ground_truth_500.txt) ]; then
    echo "[demo] ✅ SUCCESS: Fault injection matches 500-byte ground truth!" >&2
else
    echo "[demo] ❌ MISMATCH: Fault injection result differs from 500-byte ground truth" >&2
    echo "[demo]    Fault injection: $(wc -l < out.txt)" >&2
    echo "[demo]    500-byte truth:  $(wc -l < ground_truth_500.txt)" >&2
fi

