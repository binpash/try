#!/usr/bin/env bash

prefix=$(realpath $(dirname "${BASH_SOURCE[0]}")/..)

cd $prefix
docker build . -t try_micro_benchmarks
