#!/bin/bash
cd "$(dirname "$0")" || exit 1

rm -rf cache
rm -rf outputs
rm -f scripts/Gene_locs.txt