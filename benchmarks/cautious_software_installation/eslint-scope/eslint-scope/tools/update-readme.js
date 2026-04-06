/**
 * @fileoverview Script to update the README with sponsors details in all packages.
 *
 *   node tools/update-readme.js
 *
 * @author Nitin Kumar
 */

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import got from "got";

//-----------------------------------------------------------------------------
// Data
//-----------------------------------------------------------------------------

const SPONSORS_URL = "https://raw.githubusercontent.com/eslint/eslint.org/main/includes/sponsors.md";

const README_FILE_PATHS = [
    "./README.md",
    ...readdirSync("./packages").map(dir => `./packages/${dir}/README.md`)
];

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

/**
 * Fetches the latest sponsors from the website.
 * @returns {Promise<string>}} Prerendered sponsors markdown.
 */
async function fetchSponsorsMarkdown() {
    return got(SPONSORS_URL).text();
}

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

const allSponsors = await fetchSponsorsMarkdown();

README_FILE_PATHS.forEach(filePath => {

    // read readme file
    const readme = readFileSync(filePath, "utf8");

    let newReadme = readme.replace(
        /<!--sponsorsstart-->[\s\S]*?<!--sponsorsend-->/u,
        `<!--sponsorsstart-->\n${allSponsors}\n<!--sponsorsend-->`
    );

    // replace multiple consecutive blank lines with just one blank line
    newReadme = newReadme.replace(/(?<=^|\n)\n{2,}/gu, "\n");

    // output to the files
    writeFileSync(filePath, newReadme, "utf8");
});
