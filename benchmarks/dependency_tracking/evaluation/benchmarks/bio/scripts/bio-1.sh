#!/bin/bash

mkdir -p "$OUT"

sample="HG00421"

samtools view -H "${IN}/${sample}.bam" \
  | sed -e 's/SN:\([0-9XY]\)/SN:chr\1/' -e 's/SN:MT/SN:chrM/' \
  | samtools reheader - "${IN}/${sample}.bam" \
  | dd of="${OUT}/${sample}_corrected.bam" status=none

samtools index -b "${OUT}/${sample}_corrected.bam"