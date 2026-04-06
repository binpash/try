#!/bin/bash

mkdir -p /tmp/hashes
for x in $(ls -1 / | sort | grep -v "tmp" | grep -v "proc" | grep -v "sys" | grep -v "dev"); do
    tar --sort=name -cf /tmp/hashes/$x.tar /$x >/dev/null 2>&1
    sha1sum /tmp/hashes/$x.tar
done
