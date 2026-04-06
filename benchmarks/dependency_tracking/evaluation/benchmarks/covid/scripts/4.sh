#!/bin/bash
# Hours monitored each day

# <in.csv sed 's/T\(..\):..:../,\1/' |
# awk -F, '!seen[$1 $2] {hours[$1]++; seen[$1 $2] = 1}
#    END { OFS = "\t"; for (d in hours) print d, hours[d]}' |
#   sort

# curl https://balab.aueb.gr/~dds/oasa-$(date --date='1 days ago' +'%y-%m-%d').bz2 |
#   bzip2 -d |                  # decompress
# Replace the line below with the two lines above to stream the latest file
cat $INPUT |                        # assumes saved input
  sed 's/T\(..\):..:../,\1/' |  # keep times only
  cut -d ',' -f 1,2 |           # keep only time and date
  sort -u |                     # removing duplicate entries
  cut -d ',' -f 1 |             # keep only date
  sort |                        # preparing for uniq
  uniq -c |                     # count unique dates
  awk "{print \$2,\$1}"         # print first date, then count

# diff out{1,}
