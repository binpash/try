# Contributing Code

Please sign the [jQuery Foundation Contributor License Agreement](https://contribute.jquery.org/CLA/)

# Full Documentation

Our full contribution guidelines can be found at:
<http://eslint.org/docs/developer-guide/contributing/>

# How to upgrade `acorn` to support new syntax

1. `npm install acorn@latest`
1. If a new `ecmaVersion` value is added, update `SUPPORTED_VERSIONS` constant in `lib/options.js` and tests in `tests/lib/supported-ecmaversions.js`.
1. If new token types are added, update `lib/token-translator.js` file to translate the tokens.
1. Add tests in `tests/fixtures/ecma-version/<ecma-vesion>/`.
    - Add a directory named the new syntax name.
    - Add `valid-<test-case-name>.src.js` files for parseable codes.
    - Add `invalid-<test-case-name>.src.js` files for syntax error codes.
    - Run `node tools/update-ecma-version-tests.js <ecma-vesion>` command to generate `<name>.result.js` files.
    - Check the `<name>.result.js` files are expected results.
1. Update `README.md`.
1. Send a pull request.
