#!/bin/bash

# 4.1: find number of rounds
cat $INPUT | tr ' ' '\n' | grep '\.' | wc -l
