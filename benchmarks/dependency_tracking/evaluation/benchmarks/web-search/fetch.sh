#!/bin/bash

cd "$(dirname "$0")" || exit 1
URL='https://atlas.cs.brown.edu/data'
in="./inputs"

mkdir -p "$in"

curl "$URL/web-index/stopwords.txt" > "$in/stopwords.txt" 

# TODO: Transform dataset into a format that can be used offline

is_small=false
is_min=false
for arg in "$@"; do
    if [ "$arg" = "--small" ]; then
        is_small=true
		suffix="_small"
        break
    fi
	if [ "$arg" = "--min" ]; then
		is_min=true
		suffix="_min"
		break
	fi
done

if [[ ! -d "$in/articles$suffix" ]]; then
	if [[ ! -f "$in/wikipedia$suffix.tar.gz" ]]; then
		if $is_min; then
			echo "Downloading the min dataset."
			# previously was the small dataset
			wget -O $in/wikipedia$suffix.tar.gz "${URL}/wikipedia/input_small/articles.tar.gz" --no-check-certificate
			wget -O $in/index$suffix.txt "${URL}/wikipedia/input_small/index.txt" --no-check-certificate
			echo "Extracting the min dataset."
			tar -xf $in/wikipedia$suffix.tar.gz -C $in
			mv $in/articles $in/articles$suffix
		elif $is_small; then
			# 1gb entries
			echo "Downloading the small dataset."
			wget --no-check-certificate -O $in/wikipedia$suffix.tar.gz "${URL}/wikipedia/wikipedia1g.tar.gz"
			wget --no-check-certificate -O $in/index$suffix.txt "${URL}/wikipedia/index1g.txt"
			echo "Extracting the small dataset."
			tar -xf $in/wikipedia$suffix.tar.gz -C $in
			mv $in/articles1g $in/articles$suffix
		else
			# full dataset
			echo "Downloading the full dataset."
			wget --no-check-certificate -O $in/wikipedia$suffix.tar.gz "${URL}/wikipedia/wikipedia10g.tar.gz"
			wget --no-check-certificate -O $in/index$suffix.txt "${URL}/wikipedia/index10g.txt"
			echo "Extracting the full dataset."
			tar -xf $in/wikipedia$suffix.tar.gz -C $in
			mv $in/articles10g $in/articles$suffix
		fi
	else
		echo "Extracting dataset."
		tar -xf $in/wikipedia$suffix.tar.gz -C $in
	fi
else
	echo "Dataset already exists."
fi