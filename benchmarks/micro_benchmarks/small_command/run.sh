#!/bin/bash

mkdir tmp
cd tmp

/usr/bin/time -f "%e" sh -c "for i in {0..100}; do create_files 16 0; done"

