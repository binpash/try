#!/bin/bash

find "$IN" -type f -exec cat {} + > /tmp/all.txt
IN=/tmp/all.txt

# Vehicles on the road per day

# <in.csv sed 's/T..:..:..//' |
# awk -F, '!seen[$1 $3] {onroad[$1]++; seen[$1 $3] = 1}
#    END { OFS = "\t"; for (d in onroad) print d, onroad[d]}' |
# sort > out1

# curl https://balab.aueb.gr/~dds/oasa-$(date --date='1 days ago' +'%y-%m-%d').bz2 |
#   bzip2 -d |              # decompress
# Replace the line below with the two lines above to stream the latest file
cat $IN |                    # assumes saved input
  sed 's/T..:..:..//' |     # hide times
  cut -d ',' -f 1,3 |       # keep only day and bus no
  sort -u |                 # remove duplicate records due to time
  cut -d ',' -f 1 |         # keep all dates
  sort |                    # preparing for uniq
  uniq -c |                 # count unique dates
  awk "{print \$2,\$1}"     # print first date, then count

# Days a vehicle is on the road

# <in.csv sed 's/T..:..:..//' |
# awk -F, '!seen[$1 $3] {onroad[$3]++; seen[$1 $3] = 1}
#    END { OFS = "\t"; for (d in onroad) print d, onroad[d]}' |
# sort -k2n >out1

# curl https://balab.aueb.gr/~dds/oasa-$(date --date='1 days ago' +'%y-%m-%d').bz2 |
#   bzip2 -d |                  # decompress
# Replace the line below with the two lines above to stream the latest file
cat $IN |                        # assumes saved input
  sed 's/T..:..:..//' |         # hide times
  cut -d ',' -f 3,1 |           # keep only day and bus ID
  sort -u |                     # removing duplicate day-buses
  cut -d ',' -f 2 |             # keep only bus ID
  sort |                        # preparing for uniq
  uniq -c |                     # count unique dates
  sort -k 1 -n |                   # sort in reverse numerical order
  awk "{print \$2,\$1}"     # print first date, then count

# Hours each vehicle is on the road

# <in.csv sed 's/T\(..\):..:../,\1/' |
# awk -F, '!seen[$1 $2 $4] {onroad[$4]++; seen[$1 $2 $4] = 1}
#    END { OFS = "\t"; for (d in onroad) print d, onroad[d]}' |
# sort -k2n > out1

# curl https://balab.aueb.gr/~dds/oasa-$(date --date='1 days ago' +'%y-%m-%d').bz2 |
#   bzip2 -d |                  # decompress
# Replace the line below with the two lines above to stream the latest file
cat $IN |                        # assumes saved input
  sed 's/T\(..\):..:../,\1/' |  # keep times only
  cut -d ',' -f 1,2,4 |         # keep only time date and bus id
  sort -u |                     # removing duplicate entries
  cut -d ',' -f 3 |             # keep only bus ID
  sort |                        # preparing for uniq
  uniq -c |                     # count hours per bus
  sort -k 1 -n |                   # sort in reverse numerical order
  awk "{print \$2,\$1}"     # print first date, then count

# Hours monitored each day

# <in.csv sed 's/T\(..\):..:../,\1/' |
# awk -F, '!seen[$1 $2] {hours[$1]++; seen[$1 $2] = 1}
#    END { OFS = "\t"; for (d in hours) print d, hours[d]}' |
#   sort

# curl https://balab.aueb.gr/~dds/oasa-$(date --date='1 days ago' +'%y-%m-%d').bz2 |
#   bzip2 -d |                  # decompress
# Replace the line below with the two lines above to stream the latest file
cat $IN |                        # assumes saved input
  sed 's/T\(..\):..:../,\1/' |  # keep times only
  cut -d ',' -f 1,2 |           # keep only time and date
  sort -u |                     # removing duplicate entries
  cut -d ',' -f 1 |             # keep only date
  sort |                        # preparing for uniq
  uniq -c |                     # count unique dates
  awk "{print \$2,\$1}"         # print first date, then count
