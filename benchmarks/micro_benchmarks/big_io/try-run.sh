#!/bin/bash

mkdir tmp
cd tmp
/usr/bin/time -f "%e" try -y create_files 600000000 5
