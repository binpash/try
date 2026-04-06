#!/bin/bash

# 4.6: piece used the most by Belle
cat $INPUT | tr ' ' '\n' | grep '\.' | cut -d '.' -f 2 | cut -c 1-1 | tr '[a-z]' 'P' | sort | uniq -c | sort -nr | head -n 1 | awk '{print $2}'
