/**
 * "use strict" should not trigger strict mode in es3.
 * in acorn<v8.7.1, the file cannot be parsed correctly(treated as strict mode).
 * the issue was fixed in acorn v8.7.1
 */
"use strict";
var foo = 00;
