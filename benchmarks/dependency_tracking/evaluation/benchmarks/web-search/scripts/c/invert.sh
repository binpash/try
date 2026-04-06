#!/bin/bash

# Invert index to create a mapping from a term to all URLs containing the term.

# Usage: ./invert.sh url < n-grams

grep -v $'\t+$' | sort | uniq -c | awk '{print $2,$3,$4,"|",$1,"|"}' | sed 's/\s\+/ /g' | sort | sed "s|$| $1|"
