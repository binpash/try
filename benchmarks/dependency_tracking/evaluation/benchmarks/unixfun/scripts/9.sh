#!/bin/bash

# 4.3: find pieces captured by Belle with a pawn
cat $INPUT | tr ' ' '\n' | grep 'x' | grep '\.' | cut -d '.' -f 2 | grep -v '[KQRBN]' | wc -l
