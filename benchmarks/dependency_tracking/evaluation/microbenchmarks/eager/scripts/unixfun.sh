#!/bin/bash

find "$IN" -type f -exec cat {} + > /tmp/all.txt
IN=/tmp/all.txt

# 4.4: histogram of Belle's captures (-pawns) by each type of piece
cat $IN | tr ' ' '\n' | grep 'x' | grep '\.' | cut -d '.' -f 2 | grep '[KQRBN]' | cut -c 1-1 | sort | uniq -c | sort -nr
#!/bin/bash

# 4.5: 4.4 + pawns
cat $IN | tr ' ' '\n' | grep 'x' | grep '\.' | cut -d '.' -f 2 | cut -c 1-1 | tr '[a-z]' 'P' | sort | uniq -c | sort -nr
#!/bin/bash

# 4.6: piece used the most by Belle
cat $IN | tr ' ' '\n' | grep '\.' | cut -d '.' -f 2 | cut -c 1-1 | tr '[a-z]' 'P' | sort | uniq -c | sort -nr | head -n 1 | awk '{print $2}'
#!/bin/bash

# 4.1: find number of rounds
cat $IN | tr ' ' '\n' | grep '\.' | wc -l
#!/bin/bash

# 4.2: find pieces captured by Belle
cat $IN | tr ' ' '\n' | grep 'x' | grep '\.' | wc -l
#!/bin/bash

# 4.3: find pieces captured by Belle with a pawn
cat $IN | tr ' ' '\n' | grep 'x' | grep '\.' | cut -d '.' -f 2 | grep -v '[KQRBN]' | wc -l
