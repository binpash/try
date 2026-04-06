#!/bin/bash

mkdir tmp
cd tmp
export EXECUTION_ID="try-smallcommands-trace-run-timed_$(date +%s%3N)"
/usr/bin/time -f "%e" sh -c "for i in {0..100}; do try-timed -y -t x.log create_files 16 0; done"
