#!/bin/bash

mkdir tmp
cd tmp
export EXECUTION_ID="try-bigio-trace-run-timed_$(date +%s%3N)"
/usr/bin/time -f "%e" try-timed -y -t x.log create_files 600000000 5
