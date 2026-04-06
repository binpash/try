#!/bin/bash

mkdir -p "$OUT"

for bam in "${IN}"/*.bam; do
  base=$(basename "$bam" .bam)
  samtools view -H "$bam" \
    | sed -e 's/SN:\([0-9XY]\)/SN:chr\1/' -e 's/SN:MT/SN:chrM/' \
    | samtools reheader - "$bam" \
    | dd of="${OUT}/${base}_corrected.bam" status=none
  samtools index -b "${OUT}/${base}_corrected.bam"

  for chr in $(cut -f2 Gene_locs.txt | sort -u); do
    samtools view -b "${OUT}/${base}_corrected.bam" chr"$chr" \
      | dd of="${OUT}/${base}_chr${chr}.bam" status=none
    samtools index -b "${OUT}/${base}_chr${chr}.bam"
  done
done