#!/bin/bash

TOP=$(git rev-parse --show-toplevel)
URL="https://atlas.cs.brown.edu/data"
BENCHMARK="eager"

input_dir="${TOP}/evaluation/microbenchmarks/${BENCHMARK}/inputs"
mkdir -p "$input_dir"
cd "$input_dir" || exit 1

size=full
for arg in "$@"; do
    case "$arg" in
        --small) size=small ;;
        --min)   size=min ;;
    esac
done

if [ ! -f ./book_links.txt ]; then
    wget --no-check-certificate -O book_links.txt "${URL}/gutenberg/books.txt"
    if [ ! -f book_links.txt ]; then
        echo "Failed to download book_links.txt"
        exit 1
    fi
fi

if [ ! -f ./genesis ]; then
    curl --insecure -sf ${URL}/gutenberg/8/0/0/8001/8001.txt > genesis
fi 

if [ ! -f ./exodus ]; then
    curl --insecure -sf ${URL}/gutenberg/3/3/4/2/33420/33420-0.txt > exodus
fi

if [ ! -f ./dict.txt ]; then
    wget -O - "$URL"/dummy/dict.txt --no-check-certificate | sort >dict.txt
fi

file_size() {
    stat -c%s -- "$1" 2>/dev/null || \
    stat -f%z -- "$1" 2>/dev/null || \
    wc -c < "$1"
}

if [[ "$size" == "small" ]]; then
    if [ ! -e ./pg-small ]; then
        data_url="${URL}/nlp/pg-small.tar.gz"
        wget --no-check-certificate -O pg-small.tar.gz "$data_url"
        if [ ! -f pg-small.tar.gz ]; then
            echo "Failed to download pg-small.tar.gz"
            exit 1
        fi
        tar -xzf pg-small.tar.gz
        rm pg-small.tar.gz
        input_dir="$input_dir/pg-small"
        limit=$((200 * 1024 * 1024))
        total=0
        for book in "$input_dir"/*; do
            size=$(file_size "$book")
            if (( total + size <= limit )); then
                total=$(( total + size ))
            else
                rm -f -- "$book"
            fi
        done
    fi
    exit 0
elif [[ "$size" == "min" ]]; then
    if [ ! -e ./pg-min ]; then
        mkdir pg-min
        cd pg-min || exit 1
        book_count=1

        head -n $book_count ../book_links.txt | while IFS= read -r line
        do
            full_url="${URL}/gutenberg/${line}"
            echo "Downloading $full_url"
            wget --no-check-certificate -q "$full_url"
        done

        cd ..
    fi
    exit 0
fi

if [ ! -e ./pg ]; then
    data_url="${URL}/nlp/pg.tar.gz"
    wget --no-check-certificate -O pg.tar.gz "$data_url"
    if [ ! -f pg.tar.gz ]; then
        echo "Failed to download pg.tar.gz"
        exit 1
    fi
    tar -xzf pg.tar.gz
    rm pg.tar.gz
    exit 0
fi
