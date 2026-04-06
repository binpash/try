#!/bin/bash
# Days a vehicle is on the road

# <in.csv sed 's/T..:..:..//' |
# awk -F, '!seen[$1 $3] {onroad[$3]++; seen[$1 $3] = 1}
#    END { OFS = "\t"; for (d in onroad) print d, onroad[d]}' |
# sort -k2n >out1

# curl https://balab.aueb.gr/~dds/oasa-$(date --date='1 days ago' +'%y-%m-%d').bz2 |
#   bzip2 -d |                  # decompress
# Replace the line below with the two lines above to stream the latest file
cat $INPUT |                        # assumes saved input
  sed 's/T..:..:..//' |         # hide times
  cut -d ',' -f 3,1 |           # keep only day and bus ID
  sort -u |                     # removing duplicate day-buses
  cut -d ',' -f 2 |             # keep only bus ID
  sort |                        # preparing for uniq
  uniq -c |                     # count unique dates
  sort -k 1 -n |                   # sort in reverse numerical order
  awk "{print \$2,\$1}"     # print first date, then count

# diff out{1,}
