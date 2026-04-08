#!/bin/bash

# Extract system memory in GB
MEMORY=$(grep MemTotal /proc/meminfo | awk '{printf "%.0f", $2/1024/1024}')

# Extract CPU information
CPU_MODEL=$(grep -m 1 "model name" /proc/cpuinfo | cut -d: -f2 | xargs)
CPU_CORES=$(grep -c "processor" /proc/cpuinfo)
CPU_CLOCK=$(grep -m 1 "cpu MHz" /proc/cpuinfo | awk '{printf "%.2f", $4/1000}')

# Extract Linux kernel version
KERNEL_VERSION=$(uname -r)

# Extract Node.js, V8, and NPM versions
NODE_VERSION=$(node -v | sed 's/v//')
V8_VERSION=$(node -p "process.versions.v8")
NPM_VERSION=$(npm -v)

# Print the result
cat <<EOF
We conduct our experiments on a server
with $MEMORY GB of memory and $CPU_CORES Intel Core $CPU_MODEL CPUs
clocked at $CPU_CLOCK GHz, 
running a Linux kernel version $KERNEL_VERSION. 
The JavaScript setup uses Node.js v$NODE_VERSION, 
bundled with V8 $V8_VERSION and NPM version v$NPM_VERSION.
EOF
