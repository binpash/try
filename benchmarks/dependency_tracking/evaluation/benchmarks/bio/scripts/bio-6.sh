#!/bin/bash

mkdir -p "$OUT"

echo -e "sample\treads" > "${OUT}/read_counts.tsv"

while read pop sample <&3; do
  [ -z "$pop" ] || [ -z "$sample" ] && continue
  echo "Processing $sample..."
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

  reads=$(samtools idxstats "${OUT}/${sample}_corrected.bam" | awk '{sum+=$3} END {print sum}')
  echo -e "$sample\t$reads" >> "${OUT}/read_counts.tsv"
done 3< "$IN_NAME"

gnuplot <<EOF
set terminal pngcairo size 800,400
set output "${OUT}/reads_per_sample.png"
set datafile separator "\t"
set style data histograms
set style fill solid 0.6 border -1
set boxwidth 0.8
set xlabel "Sample"
set ylabel "Mapped Reads"
set title "Per-sample read coverage"
plot "${OUT}/read_counts.tsv" using 2:xtic(1) title "Reads"
EOF