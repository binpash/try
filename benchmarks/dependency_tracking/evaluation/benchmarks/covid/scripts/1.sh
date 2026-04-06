#!/bin/bash
# Vehicles on the road per day

# <in.csv sed 's/T..:..:..//' |
# awk -F, '!seen[$1 $3] {onroad[$1]++; seen[$1 $3] = 1}
#    END { OFS = "\t"; for (d in onroad) print d, onroad[d]}' |
# sort > out1

# curl https://balab.aueb.gr/~dds/oasa-$(date --date='1 days ago' +'%y-%m-%d').bz2 |
#   bzip2 -d |              # decompress
# Replace the line below with the two lines above to stream the latest file
cat $INPUT |                    # assumes saved input
  sed 's/T..:..:..//' |     # hide times
  cut -d ',' -f 1,3 |       # keep only day and bus no
  sort -u |                 # remove duplicate records due to time
  cut -d ',' -f 1 |         # keep all dates
  sort |                    # preparing for uniq
  uniq -c |                 # count unique dates
  awk "{print \$2,\$1}"     # print first date, then count

# diff out{1,}
