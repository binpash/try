#!/bin/bash

mkdir tmp
cd tmp
/usr/bin/time -f "%e" try -y -t x.log create_files 1000000000 5
