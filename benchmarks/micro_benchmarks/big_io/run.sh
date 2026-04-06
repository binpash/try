#!/bin/bash

mkdir tmp
cd tmp
/usr/bin/time -f "%e" create_files 1000000000 5
