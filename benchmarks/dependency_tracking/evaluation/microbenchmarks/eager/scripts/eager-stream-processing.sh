#!/bin/bash
# Calculate mispelled words in an input

dict=/usr/share/dict/words

find "$IN" -type f -exec cat {} + |
# iconv -f UTF-8 -t ASCII//TRANSLIT//IGNORE//SUBSTITUTE |
tr -cs A-Za-z '\n' |
grep -v '[0-9]+' |
grep -f "$dict" |
rev |
awk '{print length, $0}' |
perl -pe 's/(\d+)\s(.*)/sprintf("%08d %s", $1, $2)/e' |
awk '{gsub(/./, "&"); print}' |
sed -e 's/^/X/; s/^X//' |
python3 -u -c 'import sys
for line in sys.stdin:
    sys.stdout.write(line.lower())' |
awk '{print tolower($0)}' |
grep -a -E "^.*$" |
sed -E 's/(.{1,3})/\1 /g' |
awk '{for(i=1;i<=NF-1;i++) print $i FS $(i+1)}' |
awk '{print $2}' |
sed -E 's/(.)(.)/\2\1/g' |
awk '{print $0, NF, length($0)}' |
rev 
