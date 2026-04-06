#!/bin/bash
# Multi-node fault injection demo with Node.js workers
# Shows time-based kill and resurrection of one worker while load continues

set -euo pipefail

# Set up Python path for frac
REPO_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
export PYTHONPATH="$REPO_ROOT${PYTHONPATH:+:$PYTHONPATH}"

# Change to multi-node example directory
cd "$(dirname "$0")"

echo "[demo] Starting multi-node fault injection demo" >&2

# Cleanup function
cleanup() {
    echo "[demo] Cleaning up..." >&2
    # Kill all background jobs
    jobs -p | xargs -r kill 2>/dev/null || true
    # Remove PID files
    rm -f worker-*.pid load_results.csv
    wait 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# Check if Node.js is available
if ! command -v node >/dev/null 2>&1; then
    echo "[demo] ERROR: Node.js is required but not found" >&2
    exit 1
fi

echo "[demo] Starting 3 worker nodes..." >&2

# Start workers
node worker.js 1 8001 &
worker1_pid=$!
sleep 0.5

node worker.js 2 8002 &
worker2_pid=$!
sleep 0.5

node worker.js 3 8003 &
worker3_pid=$!
sleep 0.5

echo "[demo] Starting load balancer..." >&2

# Start balancer
node balancer.js 9000 \
    http://localhost:8001 \
    http://localhost:8002 \
    http://localhost:8003 &
balancer_pid=$!
sleep 1

echo "[demo] Starting load generator..." >&2

# Start load generator  
node load.js http://localhost:9000 &
load_pid=$!
sleep 2

echo "[demo] System ready. Load generation running..." >&2
echo "[demo] Workers: localhost:8001, localhost:8002, localhost:8003" >&2
echo "[demo] Balancer: localhost:9000" >&2

# Wait a bit for baseline traffic
echo "[demo] Collecting 5 seconds of baseline metrics..." >&2
sleep 5

echo "[demo] Scheduling fault injection..." >&2

# Schedule kill of worker-2 after 3 seconds
python -m frac inject \
    --plugin http_plugin.py \
    --node 2 \
    --event delay --ms 3000 &

# Schedule resurrection of worker-2 after 8 seconds (3s kill + 5s downtime)
python -m frac resurrect \
    --plugin http_plugin.py \
    --node 2 \
    --event delay --ms 8000 &

echo "[demo] Fault scheduled: worker-2 will be killed in 3s, resurrected 5s later" >&2

# Let the demo run for 15 seconds total
echo "[demo] Running demo for 15 seconds..." >&2
sleep 15

echo "[demo] Stopping load generation..." >&2
kill $load_pid 2>/dev/null || true
wait $load_pid 2>/dev/null || true

echo "[demo] Demo complete!" >&2

# Show some results
if [ -f load_results.csv ]; then
    echo "[demo] Request summary:" >&2
    echo "[demo] Total requests: $(tail -n +2 load_results.csv | wc -l)" >&2
    echo "[demo] Successful (200): $(tail -n +2 load_results.csv | grep -c ',200,' || echo 0)" >&2
    echo "[demo] Failed (503): $(tail -n +2 load_results.csv | grep -c ',503,' || echo 0)" >&2
    echo "[demo] Errors: $(tail -n +2 load_results.csv | grep -c ',ERROR,' || echo 0)" >&2
    echo "[demo] Results saved to load_results.csv" >&2
else
    echo "[demo] No results file found" >&2
fi

echo "[demo] Multi-node fault injection demo finished" >&2 