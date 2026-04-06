#!/usr/bin/env node

/*
Extract all text from an HTML page.
Usage: ./getText.js <input > output
*/

const {convert} = require('html-to-text');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

// __start_solution__
let htmlInput = '';
// __end_solution__
rl.on('line', (line) => {
  // 1. Read HTML input from standard input, line by line using the `readline` module.
  // __start_solution__
  htmlInput += line + '\n';
  // __end_solution__
});

// 2. after all input is received, use convert to output plain text.
rl.on('close', () => {
  // __start_solution__
  console.log(convert(htmlInput));
  // __end_solution__
});


