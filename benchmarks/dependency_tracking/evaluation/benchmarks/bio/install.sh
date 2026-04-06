#!/bin/bash

sudo apt-get update
pkgs="build-essential libncurses5-dev libncursesw5-dev libbz2-dev liblzma-dev libcurl4-openssl-dev libssl-dev wget zlib1g-dev minimap2 samtools gnuplot" 

for pkg in $pkgs; do
    if ! dpkg -s $pkg; then
        sudo apt-get install -y --no-install-recommends $pkg
    fi
done
