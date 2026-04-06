#!/bin/bash

# Combine terms to create  n-grams (for n=1,2,3) and then count and sort them
# Usage: ./combine.sh <terms > n-grams

p1=$(mktemp -u p1.XXXXXX)
p2=$(mktemp -u p2.XXXXXX)
p3=$(mktemp -u p3.XXXXXX)

mkfifo "$p1" "$p2" "$p3"

bigram() {
	tee "$1" | tail +2 | paste "$1" - | sort
	rm "$1"
}

trigram() {
	tee "$1" | tail +2 | paste "$1" - | tee "$2" | cut -f 1 | tail +3 | paste "$2" - | sort
	rm "$1" "$2"
}

# tee >(sort) >(bigram "$p1") >(trigram "$p2" "$p3") > /dev/null

psort=$(mktemp -u psort.XXXXXX)
mkfifo "$psort"
pbi=$(mktemp -u pbi.XXXXXX)
mkfifo "$pbi"
ptri=$(mktemp -u ptri.XXXXXX)
mkfifo "$ptri"

cleanup() {
  rm -f "$p1" "$p2" "$p3" "$psort" "$pbi" "$ptri"
}
trap cleanup EXIT
# launch the three consumers
sort <"$psort" &
pid_sort=$!
bigram "$p1" <"$pbi" &
pid_bi=$!
trigram "$p2" "$p3" <"$ptri" &
pid_tri=$!

# duplicate the incoming stream to all three FIFOs
tee "$psort" "$pbi" "$ptri" >/dev/null

# wait
wait "$pid_sort" "$pid_bi" "$pid_tri"
