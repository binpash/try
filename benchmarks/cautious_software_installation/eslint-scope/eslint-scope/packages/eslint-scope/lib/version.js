/**
 * @fileoverview Contains the current version number. This file is checked in
 * to source control and should always return "main". During the release
 * process, this file is overwritten with a new on that returns the actual
 * version number. The file with the actual version number is *not* checked
 * back into the repo. This is only necessary until Node.js supports import
 * assertions, at which time we can just import package.json for this info.
 * @author Nicholas C. Zakas
 */
const version = "main";

export default version;
