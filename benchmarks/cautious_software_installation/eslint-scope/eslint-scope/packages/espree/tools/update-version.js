/**
 * @fileoverview Script to update lib/version.js to the value in package.json
 * @author Nicholas C. Zakas
 */

import fs from "node:fs";

/*
 * IMPORTANT: This must be run *before* Rollup so the built package will have
 * the correct version number exported.
 *
 * This is necessary because ESM can't import JSON files directly and we want
 * this value to be available in the browser as well as in Node.js.
 */

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

fs.writeFileSync("lib/version.js", `const version = "${pkg.version}";\n\nexport default version;\n`);
