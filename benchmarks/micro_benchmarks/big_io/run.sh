#!/bin/bash

mkdir tmp
cd tmp
/usr/bin/time -f "%e" create_files 600000000 5
