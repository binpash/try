## web-search

The `web-search` benchmark constructs a textual index of a Wikipedia article
corpus, computing the most frequent **1-grams**, **2-grams**, and **3-grams**
while excluding stopwords and applying stemming. It simulates large-scale
search index construction.

### Inputs

- `inputs/index.txt`: List of article filenames to be processed.
- `inputs/articles*/`: Directories containing HTML article files (in `full`, `small`, and `min` sizes).
- `inputs/stopwords.txt`: List of stopwords to exclude.

### Validation

The SHA256 hash of the output files is compared again reference hashes.


### Incremental Dev
TBD