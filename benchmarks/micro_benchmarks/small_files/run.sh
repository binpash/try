#!/bin/bash

mkdir tmp
cd tmp
/usr/bin/time -f "%e" create_files 16 10000
