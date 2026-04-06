#!/bin/bash

prefix=$(realpath $(dirname "${BASH_SOURCE[0]}"))
cd "$prefix/sort_large_file"

tr -dc 'a-zA-Z' </dev/urandom | fold -w 8 | head -n 10000000 > book.txt