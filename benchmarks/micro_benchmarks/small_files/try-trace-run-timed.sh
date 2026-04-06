#!/bin/bash

mkdir tmp
cd tmp
export EXECUTION_ID="try-smallfiles-trace-run-timed_$(date +%s%3N)"
/usr/bin/time -f "%e" try-timed -y -t x.log create_files 16 10000
