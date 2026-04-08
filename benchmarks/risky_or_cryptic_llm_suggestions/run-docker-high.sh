#!/bin/bash
set -euo pipefail

# Script to run an experiment in a Docker container
# Usage: ./run-docker-high.sh [experiment_path] [script_to_run]

# Set default values
EXPERIMENT_DIR="${1}"
SCRIPT_TO_RUN="${2:-script.sh}"

# Validate experiment directory
if [ -z "$EXPERIMENT_DIR" ]; then
    echo "Error: experiment_path is required"
    echo "Usage: $0 <experiment_path> [script_to_run]"
    exit 1
fi

# Get absolute path of experiment directory
EXPERIMENT_DIR=$(realpath "$EXPERIMENT_DIR")

# Check if there's a nested directory with the same name (common pattern)
# e.g., find_exec_touch/find_exec_touch/ contains the actual experiment
INNER_DIR="${EXPERIMENT_DIR}/$(basename "$EXPERIMENT_DIR")"
if [ -d "$INNER_DIR" ] && [ -f "$INNER_DIR/script.sh" ]; then
    # Use the inner nested directory that contains the actual experiment
    EXPERIMENT_DIR="$INNER_DIR"
fi

# Extract experiment name from path for container naming
EXPERIMENT_NAME=$(basename "$EXPERIMENT_DIR")
CONTAINER_NAME="${EXPERIMENT_NAME}-tmp"
RESULTS_DIR="tmp_results"

cleanup() {
    docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
    rm -rf "$RESULTS_DIR"
}
trap cleanup EXIT INT TERM

mkdir -p "$RESULTS_DIR"

echo "Starting container from try_base_image..."
# Start a container in detached mode
docker run -d --name "$CONTAINER_NAME" try_base_image tail -f /dev/null

# Wait a moment for container to be ready
sleep 1

echo "Copying experiment directory into container..."
# Copy the experiment directory into the container
docker cp "$EXPERIMENT_DIR" "$CONTAINER_NAME:/root/experiment"

echo "Running script in container..."
# Run the script in the container
docker exec "$CONTAINER_NAME" bash -c "cd /root/experiment && chmod +x $SCRIPT_TO_RUN && ./$SCRIPT_TO_RUN"

echo "Copying results from container..."
# Copy results from container to tmp_results directory
docker cp "$CONTAINER_NAME:/root/experiment" "$RESULTS_DIR/"
