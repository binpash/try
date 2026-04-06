#!/bin/bash

# Convert input to a stream of non-stopword terms
# Usage: ./process.sh < input > output

# Convert each line to one word per line, **remove non-letter characters**, make lowercase, convert to ASCII; then remove stopwords (inside d/stopwords.txt)
# Commands that will be useful: tr, iconv, grep

# __start_solution__
tr -cs A-Za-z '\n' | tr '[:upper:]' '[:lower:]' | iconv -c -t ascii//TRANSLIT | grep -vwFf ${IN}/stopwords.txt || true
# __end_solution__
