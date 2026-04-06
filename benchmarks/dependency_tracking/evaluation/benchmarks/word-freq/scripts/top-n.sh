#!/bin/bash
# top-N (1000) terms

cat $INPUT | tr -c 'A-Za-z' '[\n*]' | grep -v "^\s*$" | tr A-Z a-z | sort | uniq -c | sort -rn | sed 1000q
