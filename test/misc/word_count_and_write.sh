#!/bin/bash
# this way wc doesn't output the input filename
cat $1 | wc -l > $2
