#!/bin/bash

mkdir -p "$OUT"

for bam in "${IN}"/*.bam; do
  base=$(basename "$bam" .bam)
  samtools view -H "$bam" \
    | sed -e 's/SN:\([0-9XY]\)/SN:chr\1/' -e 's/SN:MT/SN:chrM/' \
    | samtools reheader - "$bam" \
    | dd of="${OUT}/${base}_corrected.bam" status=none
  samtools index -b "${OUT}/${base}_corrected.bam"
done