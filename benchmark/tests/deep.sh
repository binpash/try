#!/bin/sh

mkdir test-deep
cd test-deep || exit

for i in $(seq 1 30); do
  mkdir -p "$i"
  (
    cd "$i" || exit

    for j in $(seq 1 500); do
      mkdir -p "s$j"
      (
        cd "s$j" || exit
        echo "0" > file.txt
      )
    done
  )
done
