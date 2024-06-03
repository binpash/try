#!/bin/sh

mkdir test-deep
cd test-deep

for i in $(seq 1 30); do
  mkdir -p "$i"
  cd "$i"

  for j in $(seq 1 500); do
    mkdir -p "s$j"
    cd "s$j"
    echo "0" > file.txt
    cd ..
  done

  cd ..
done

