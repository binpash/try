#!/bin/bash
# Calculate mispelled words in an input

dict=/usr/share/dict/words

find $IN -type f -name '*.txt' -exec cat {} + |
    sed 's/[^[:print:]]//g' |      # remove non-printing characters
    col -bx            |           # remove backspaces / linefeeds
    tr -cs A-Za-z '\n' |
    tr A-Z a-z |                   # map upper to lower case
    tr -d '[:punct:]' |            # remove punctuation
    sort |                         # put words in alphabetical order
    comm -23 - $dict               # report words not in dictionary 
