#!/bin/bash
mkdir -p jsons
for file in src/caruca/syntax_specs/*.py; do
	cmdname=$(basename $file .py)
	if [ $cmdname == __init__ ]; then
		continue
	fi
	echo $cmdname
	caruca syntax-spec --fetch --json $cmdname > jsons/$cmdname
done
