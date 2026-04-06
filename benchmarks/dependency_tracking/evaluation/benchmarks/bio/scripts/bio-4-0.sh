#!/bin/bash

mkdir -p "$OUT"

while read -r pop sample <&3; do
  samtools view -H "${IN}/${sample}.bam" \
    | sed -e 's/SN:\([0-9XY]\)/SN:chr\1/' -e 's/SN:MT/SN:chrM/' \
    | samtools reheader - "${IN}/${sample}.bam" \
    | dd of="${OUT}/${sample}_corrected.bam" status=none
  samtools index -b "${OUT}/${sample}_corrected.bam"

  for chr in $(cut -f2 Gene_locs.txt | sort -u); do
    samtools view -b "${OUT}/${sample}_corrected.bam" chr"$chr" \
      | dd of="${OUT}/${pop}_${sample}_${chr}.bam" status=none
    samtools index -b "${OUT}/${pop}_${sample}_${chr}.bam"
  done
done 3< "$IN_NAME"