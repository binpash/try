#!/bin/bash

# List all manual pages in ../gnu-coreutils/man
# remove the .txt extension
# and for all of them download the corresponding bsd command using xargs and curl
# https://man.freebsd.org/cgi/man.cgi?query={}&apropos=0&sektion=1&manpath=FreeBSD+15.0-CURRENT&arch=default&format=ascii

for man in ../gnu-coreutils/man/*.txt; do
    bsd=$(basename "$man" .txt)
    url="https://man.freebsd.org/cgi/man.cgi?query=$bsd&apropos=0&sektion=1&manpath=FreeBSD+15.0-CURRENT&arch=default&format=ascii" 
    curl $url -o $bsd.txt
done
