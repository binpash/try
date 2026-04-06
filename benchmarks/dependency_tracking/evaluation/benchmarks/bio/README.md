## bio

This benchmark processes a list of population/sample pairs and produces BAM files for selected chromosomes after normalizing and indexing the input BAMs.

### Inputs

- `inputs/input.txt`: A list of population/sample pairs, one per line.

### Running

For each line in the input file:

1. The corresponding BAM file is read from `inputs/<sample>.bam`.
2. The chromosome labels in the BAM file header are normalized to a consistent format (e.g., `chr1`, `chr2`, ..., `chrM`).
3. The normalized BAM file is saved to `outputs/<sample>_corrected.bam`.
4. The corrected BAM file is indexed.
5. For each chromosome listed in `Gene_locs.txt`:
   - A region-specific BAM file is extracted from the corrected BAM.
   - The region-specific BAM file is saved to `outputs/<pop>_<sample>_<chr>.bam`.
   - The region-specific BAM file is indexed.

### Validation

Correctness is determined by computing the SHA-256 hash of each output BAM file and comparing it against a reference hash stored in `hashes/`.

### References
- https://www.nature.com/articles/s41586-019-1728-8
- https://www.nature.com/articles/s41586-019-1555-y
- https://www.nature.com/articles/s41586-020-2153-8
