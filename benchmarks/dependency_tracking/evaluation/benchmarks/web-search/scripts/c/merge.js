#!/usr/bin/env node

/*
Merge the current inverted index (assuming the right structure) with the global index file
Usage: cat input | ./merge.js global-index > output

The inverted indices have the different structures!

Each line of a local index is formatted as:
  - `<word/ngram> | <frequency> | <url>`

Each line of a global index is be formatted as:
  - `<word/ngram> | <url_1> <frequency_1> <url_2> <frequency_2> ... <url_n> <frequency_n>`
  - Where pairs of `url` and `frequency` are in descending order of frequency
  - Everything after `|` is space-separated

-------------------------------------------------------------------------------------
Example:

local index:
  word1 word2 | 8 | url1
  word3 | 1 | url9
EXISTING global index:
  word1 word2 | url4 2
  word3 | url3 2

merge into the NEW global index:
  word1 word2 | url1 8 url4 2
  word3 | url3 2 url9 1

Remember to error gracefully, particularly when reading the global index file.
*/

const fs = require('fs');
const readline = require('readline');
// The `compare` function can be used for sorting.
const compare = (a, b) => {
  if (a.freq > b.freq) {
    return -1;
  } else if (a.freq < b.freq) {
    return 1;
  } else {
    return 0;
  }
};
const rl = readline.createInterface({
  input: process.stdin,
});

// 1. Read the incoming local index data from standard input (stdin) line by line.
let localIndex = '';
rl.on('line', (line) => {
  // __start_solution__
  localIndex += line + '\n';
  // __end_solution__
});

rl.on('close', () => {
  // 2. Read the global index name/location, using process.argv
  // __start_solution__
  const globalFile = process.argv[2];
  // __end_solution__
  // and call printMerged as a callback
  // __start_solution__
  fs.readFile(globalFile, {encoding: 'utf8', flag: 'r'}, printMerged);
  // __end_solution__
});

const printMerged = (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Split the data into an array of lines
  const localIndexLines = localIndex.split('\n');
  const globalIndexLines = data.split('\n');

  localIndexLines.pop();
  globalIndexLines.pop();

  const local = {};
  const global = {};

  // 3. For each line in `localIndexLines`, parse them and add them to the `local` object where keys are terms and values contain `url` and `freq`.
  for (const line of localIndexLines) {
    // __start_solution__
    let [term, freq, url] = line.split(/\|/);
    term = term.trim();
    freq = parseInt(freq.trim());
    url = url.trim();
    // __end_solution__
    local[term] = {url, freq};
  }

  // 4. For each line in `globalIndexLines`, parse them and add them to the `global` object where keys are terms and values are arrays of `url` and `freq` objects.
  // Use the .trim() method to remove leading and trailing whitespace from a string.
  for (const line of globalIndexLines) {
    // __start_solution__
    let [term, urlfs] = line.split(/\|/);
    urlfs = urlfs.trim().split(/\s+/);

    term = term.trim();

    const grouped = [];

    for (let j = 0; j < urlfs.length - 1; j += 2) {
      grouped.push({
        url: urlfs[j].trim(),
        freq: parseInt(urlfs[j + 1].trim()),
      });
    }

    urlfs = grouped;
    // __end_solution__
    global[term] = urlfs; // Array of {url, freq} objects
  }

  // 5. Merge the local index into the global index:
  // - For each term in the local index, if the term exists in the global index:
  //     - Append the local index entry to the array of entries in the global index.
  //     - Sort the array by `freq` in descending order.
  // - If the term does not exist in the global index:
  //     - Add it as a new entry with the local index's data.
  // __start_solution__
  for (const term in local) {
    if (term in global) {
      global[term].push(local[term]);
      global[term].sort(compare);
    } else {
      global[term] = [local[term]];
    }
  }
  // __end_solution__
  // 6. Print the merged index to the console in the same format as the global index file:
  //    - Each line contains a term, followed by a pipe (`|`), followed by space-separated pairs of `url` and `freq`.
  // __start_solution__
  for (const term of Object.keys(global)) {
    console.log(term, '|', global[term].
        map(({url, freq}) => `${url} ${freq}`).join(' '));
  }
  // __end_solution__
};
