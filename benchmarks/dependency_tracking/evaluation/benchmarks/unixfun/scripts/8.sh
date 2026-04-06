#!/bin/bash

# 4.2: find pieces captured by Belle
cat $INPUT | tr ' ' '\n' | grep 'x' | grep '\.' | wc -l
