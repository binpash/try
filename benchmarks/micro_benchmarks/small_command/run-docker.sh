#!/bin/bash

mkdir tmp
cd tmp

sh -c "for i in {0..100}; do create_files 16 0; done"

