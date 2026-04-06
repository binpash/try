#!/usr/bin/env node

/*
Extract all URLs from a web page.
Usage: ./getURLs.js <base_url>
*/

const readline = require("readline");
const { JSDOM, VirtualConsole } = require("jsdom");
const path = require("path");
const { URL } = require("url");

// 1. Read the base URL from the command-line argument using `process.argv`.
let baseURL = "";
// __start_solution__
baseURL = process.argv[2];
// __end_solution__

baseURL = path.resolve(baseURL);
baseURL = baseURL.endsWith("/") ? baseURL : path.dirname(baseURL) + "/";

const rl = readline.createInterface({
  input: process.stdin,
});

// __start_solution__
let htmlInput = "";
// __end_solution__
rl.on("line", (line) => {
  // 2. Read HTML input from standard input (stdin) line by line using the `readline` module.
  // __start_solution__
  htmlInput += line + "\n";
  // __end_solution__
});

rl.on("close", () => {
  // 3. Parse HTML using jsdom
  // __start_solution__
  const vcon = new VirtualConsole();
  vcon.on("error", () => {}); // swallow “Could not parse CSS @import …”

  // turn CLI arg into a proper file:// URL so URL() always succeeds
  const basePath = baseURL; // already a directory, absolute
  const base = new URL("file://" + basePath);

  const dom = new JSDOM(htmlInput, { url: base.href, virtualConsole: vcon })
    .window.document;

  // __end_solution__

  // 4. Find all URLs:
  //  - select all anchor (`<a>`) elements) with an `href` attribute using `querySelectorAll`.
  //  - extract the value of the `href` attribute for each anchor element.
  // __start_solution__
  const raw = Array.from(dom.querySelectorAll("a[href]"))
    .map((el) => el.getAttribute("href"))
    // keep only usable link strings
    .filter(
      (h) =>
        h &&
        !h.startsWith("#") &&
        !h.startsWith("javascript:") &&
        !h.startsWith("mailto:")
    );

  raw.forEach((u) => {
    let abs;
    try {
      abs = new URL(u, base);
    } catch {
      return;
    }

    // Skip http/https and anything that escaped the root
    if (abs.protocol !== "file:") return;
    const rel = path.relative(basePath, abs.pathname);  
    if (rel.startsWith("..")) return; // outside the corpus

    console.log(rel); // e.g.   0/0/6/foo.html
  });
  // __end_solution__
});
