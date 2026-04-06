# Changelog

## [8.4.0](https://github.com/eslint/js/compare/eslint-scope-v8.3.0...eslint-scope-v8.4.0) (2025-06-09)


### Features

* Add support for ES2026 `using` and `await using` declarations ([#658](https://github.com/eslint/js/issues/658)) ([39e0865](https://github.com/eslint/js/commit/39e086509a0164dcea960719fb9673c73452f36e))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * eslint-visitor-keys bumped from ^4.2.0 to ^4.2.1
    * espree bumped from ^10.3.0 to ^10.4.0

## [8.3.0](https://github.com/eslint/js/compare/eslint-scope-v8.2.0...eslint-scope-v8.3.0) (2025-03-07)


### Features

* Option to track JSX components as references ([#646](https://github.com/eslint/js/issues/646)) ([6dd3cbc](https://github.com/eslint/js/commit/6dd3cbc2aaa285736eb668e4763a6c1d58f0fb59))

## [8.2.0](https://github.com/eslint/js/compare/eslint-scope-v8.1.0...eslint-scope-v8.2.0) (2024-10-29)


### Features

* add support for Import Attributes and RegExp Modifiers ([#639](https://github.com/eslint/js/issues/639)) ([2fd4222](https://github.com/eslint/js/commit/2fd422278bfad826d601795670004f9d6da72ef7))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * eslint-visitor-keys bumped from ^4.1.0 to ^4.2.0
    * espree bumped from ^10.2.0 to ^10.3.0

## [8.1.0](https://github.com/eslint/js/compare/eslint-scope-v8.0.2...eslint-scope-v8.1.0) (2024-09-27)


### Features

* add the `eslint-scope` package ([#615](https://github.com/eslint/js/issues/615)) ([2ecfb8b](https://github.com/eslint/js/commit/2ecfb8ba460a73601b859fd10d000cee817d170c))


### Bug Fixes

* Remove node:assert dependency ([#633](https://github.com/eslint/js/issues/633)) ([433a89d](https://github.com/eslint/js/commit/433a89d18f556658751feb63f87303ebbf7b7cb7))
* Update dependencies to avoid build failure ([#631](https://github.com/eslint/js/issues/631)) ([e8cd107](https://github.com/eslint/js/commit/e8cd107d732fb7ef62cd4f6cd179bd48f5c13b27))
* update links to `eslint/js` repo ([#619](https://github.com/eslint/js/issues/619)) ([956389a](https://github.com/eslint/js/commit/956389ac150bd2394bc78a35c2a1f9d794f61ea8))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * eslint-visitor-keys bumped from ^4.0.0 to ^4.1.0
    * espree bumped from ^10.0.1 to ^10.2.0

## [8.0.2](https://github.com/eslint/eslint-scope/compare/v8.0.1...v8.0.2) (2024-07-08)


### Bug Fixes

* `Definition#name` in catch patterns should be `Identifier` node ([#127](https://github.com/eslint/eslint-scope/issues/127)) ([8082caa](https://github.com/eslint/eslint-scope/commit/8082caa1a0f9aae0894a0a01fef9efa7a5e509f6))

## [8.0.1](https://github.com/eslint/eslint-scope/compare/v8.0.0...v8.0.1) (2024-03-20)


### Documentation

* document Security Policy ([#122](https://github.com/eslint/eslint-scope/issues/122)) ([0d03700](https://github.com/eslint/eslint-scope/commit/0d0370035c3fcd3846bcfed25e2de1c90c204cc8))


### Chores

* switch to eslint flat config ([#121](https://github.com/eslint/eslint-scope/issues/121)) ([59b1606](https://github.com/eslint/eslint-scope/commit/59b160624bd725a1254024bcbbd28b7529c04c64))
* upgrade espree@10.0.1, eslint-visitor-keys@4.0.0 ([#119](https://github.com/eslint/eslint-scope/issues/119)) ([6f95a94](https://github.com/eslint/eslint-scope/commit/6f95a9406e321ba519bbf635ebb8b1ae4b8861e7))

## [8.0.0](https://github.com/eslint/eslint-scope/compare/v7.2.2...v8.0.0) (2024-01-04)


### ⚠ BREAKING CHANGES

* use ESTree `directive` property when searching for `"use strict"` ([#118](https://github.com/eslint/eslint-scope/issues/118))
* class `extends` is evaluated in the class scope ([#116](https://github.com/eslint/eslint-scope/issues/116))
* Require Node.js ^18.18.0 || ^20.9.0 || >=21.1.0 ([#115](https://github.com/eslint/eslint-scope/issues/115))

### Features

* Require Node.js ^18.18.0 || ^20.9.0 || &gt;=21.1.0 ([#115](https://github.com/eslint/eslint-scope/issues/115)) ([ed67857](https://github.com/eslint/eslint-scope/commit/ed678573aca7b00815ecb3c5dc4eee913b53a162))
* use ESTree `directive` property when searching for `"use strict"` ([#118](https://github.com/eslint/eslint-scope/issues/118)) ([23fe81f](https://github.com/eslint/eslint-scope/commit/23fe81f5861ade17a2f17f9518fdde376dd2395f))


### Bug Fixes

* class `extends` is evaluated in the class scope ([#116](https://github.com/eslint/eslint-scope/issues/116)) ([42ef7a9](https://github.com/eslint/eslint-scope/commit/42ef7a995771f0700fc6af7eee03bab977f272c6))


### Documentation

* Update README with analyze() options ([#111](https://github.com/eslint/eslint-scope/issues/111)) ([2122fdb](https://github.com/eslint/eslint-scope/commit/2122fdb237cc0c115cd2473f383f741b1f055791)), closes [#110](https://github.com/eslint/eslint-scope/issues/110)


### Chores

* Remove add-to-triage ([#106](https://github.com/eslint/eslint-scope/issues/106)) ([dc75851](https://github.com/eslint/eslint-scope/commit/dc75851b92b47eb37ed617448c0291129db676e1))
* run tests in Node.js 21 ([#109](https://github.com/eslint/eslint-scope/issues/109)) ([957748e](https://github.com/eslint/eslint-scope/commit/957748e7fb741dd23f521af0c124ce6da0848997))
* standardize npm script names ([#105](https://github.com/eslint/eslint-scope/issues/105)) ([115ded3](https://github.com/eslint/eslint-scope/commit/115ded3cb6f768a37f0dcb17bb16e2299849e16f))

## [7.2.2](https://github.com/eslint/eslint-scope/compare/v7.2.1...v7.2.2) (2023-07-27)


### Chores

* Add PRs to triage ([#104](https://github.com/eslint/eslint-scope/issues/104)) ([a4dd888](https://github.com/eslint/eslint-scope/commit/a4dd8884726758ed513210a6b537105a07e8bf70))
* generate provenance statements when release ([#102](https://github.com/eslint/eslint-scope/issues/102)) ([a27ce6b](https://github.com/eslint/eslint-scope/commit/a27ce6bbf70d7ba5af763a4d1650bfd87eee8136))

## [7.2.1](https://github.com/eslint/eslint-scope/compare/v7.2.0...v7.2.1) (2023-05-31)


### Chores

* run tests on Node.js v20 ([#97](https://github.com/eslint/eslint-scope/issues/97)) ([675f7de](https://github.com/eslint/eslint-scope/commit/675f7de78c312546441fa9b204734c26376710f7))
* set up release-please ([#99](https://github.com/eslint/eslint-scope/issues/99)) ([6bc2619](https://github.com/eslint/eslint-scope/commit/6bc2619fff2aa401fe43d3fda60e0c127d2d39a8))

v7.2.0 - April 13, 2023

* [`70c8db1`](https://github.com/eslint/eslint-scope/commit/70c8db16962830f20e27765cd4d1fd0e29b93c08) feat: Add isGlobalReturn method on scopeManager. (#96) (Nicholas C. Zakas)
* [`3dbad80`](https://github.com/eslint/eslint-scope/commit/3dbad80d98e5bb2453423dc3882500a7d76d6259) chore: add triage action (#95) (Milos Djermanovic)
* [`34ffedc`](https://github.com/eslint/eslint-scope/commit/34ffedc9645f3e5bf2111f766931efb0ff33040f) ci: add Node v19 (#94) (Milos Djermanovic)
* [`4c00534`](https://github.com/eslint/eslint-scope/commit/4c005347cd556b4fa97ba0b626decdd0fce95962) ci: update Github actions (#93) (Deepshika S)
* [`6c8ccf2`](https://github.com/eslint/eslint-scope/commit/6c8ccf223952daff78295907316d8d8c1e93cf89) chore: add funding field (#92) (Deepshika S)
* [`a8811b8`](https://github.com/eslint/eslint-scope/commit/a8811b89b93a8b6bb6ac7089d893d5686dabbeb8) build: add node v18 (#91) (唯然)
* [`25abacf`](https://github.com/eslint/eslint-scope/commit/25abacffe690b6141f19d59dc8c0e09599671508) docs: add badges (#89) (Milos Djermanovic)

v7.1.1 - February 11, 2022

* [`8938109`](https://github.com/eslint/eslint-scope/commit/89381090cef60d8d47aeba111e04f859e063ae41) chore: upgrade espree@9.3.1 eslint-visitor-keys@3.3.0 (#88) (Milos Djermanovic)
* [`4e1d24c`](https://github.com/eslint/eslint-scope/commit/4e1d24ca4a747c14b37f059543cf08d1e1820b2d) fix: ignore `"use strict"` directives in ES3 (#87) (Milos Djermanovic)
* [`ceb8bdd`](https://github.com/eslint/eslint-scope/commit/ceb8bdd2cc31f67255e37a961096f9e3320abac6) ci: use node v16 (#84) (Nitin Kumar)
* [`62e147b`](https://github.com/eslint/eslint-scope/commit/62e147be60c1eb84a40c1918913755acbc2d3a3d) test: add tests with year-based `ecmaVersion` (#83) (Milos Djermanovic)

v7.1.0 - November 20, 2021

* [`d756f1e`](https://github.com/eslint/eslint-scope/commit/d756f1ea974093c3ed7121d17f858254036b9690) feat: Add sourceType:commonjs support (#81) (Nicholas C. Zakas)

v7.0.0 - November 16, 2021

* [`22a55c0`](https://github.com/eslint/eslint-scope/commit/22a55c01d1a28fd3ffd45c8818b49e65bd3e5005) feat!: support class static blocks (#80) (Milos Djermanovic)
* [`4aafb61`](https://github.com/eslint/eslint-scope/commit/4aafb616212adc39af37064932da912bdc7d9226) build: upgrade eslint-release to v3.2.0 to support conventional commits (#79) (Milos Djermanovic)
* [`263c762`](https://github.com/eslint/eslint-scope/commit/263c762432c5a3995e30fa814d02b0ed358b0e68) Build: add node v17 (#76) (唯然)

v6.0.0 - July 23, 2021

* [`4ee1d80`](https://github.com/eslint/eslint-scope/commit/4ee1d80ce7dab961d9a158bc664d781bb663b570) Fix: Ensure correct version in package (#73) (Nicholas C. Zakas)
* [`82a7e6d`](https://github.com/eslint/eslint-scope/commit/82a7e6d9de8f4fca48e99779e9573dd46adbc18c) Breaking: Switch to ESM (fixes #70) (#71) (Brett Zamir)
* [`0b4a5f1`](https://github.com/eslint/eslint-scope/commit/0b4a5f132fb65520eee31bcd166078656b6e158e) Update: support class fields (refs eslint/eslint#14343) (#69) (Toru Nagashima)
* [`39f8cfc`](https://github.com/eslint/eslint-scope/commit/39f8cfc026d9b9b7c02e07368323350e74698f29) Chore: upgrade estraverse to version 5 (#68) (Rouven Weßling)
* [`ae27ff3`](https://github.com/eslint/eslint-scope/commit/ae27ff3692ab13cf62075b8659f0e17dfa44acd1) Docs: Add range to espree options in README (fixes #66) (#67) (Alan Liang)

v5.1.1 - September 12, 2020

* [`9b528d7`](https://github.com/eslint/eslint-scope/commit/9b528d778c381718c12dabfb7f1c0e0dc6b36e49) Upgrade: esrecurse version to ^4.3.0 (#64) (Timofey Kachalov)
* [`f758bbc`](https://github.com/eslint/eslint-scope/commit/f758bbc3d49b9b9ea2289a5d6a6bba8dcf2c4903) Chore: fix definiton -> definition typo in comments (#63) (Kevin Kirsche)
* [`7513734`](https://github.com/eslint/eslint-scope/commit/751373473375b3f2edc4eaf1c8d2763d8435bb72) Chore: move to GitHub Actions (#62) (Kai Cataldo)

v5.1.0 - June 4, 2020

* [`d4a3764`](https://github.com/eslint/eslint-scope/commit/d4a376434b16289c1a428d7e304576e997520873) Update: support new export syntax (#56) (Toru Nagashima)

v5.0.0 - July 20, 2019

* [`e9fa22e`](https://github.com/eslint/eslint-scope/commit/e9fa22ea412c26cf2761fa98af7e715644bdb464) Upgrade: update dependencies after dropping support for Node <8 (#53) (Kai Cataldo)
* [`ee9f7c1`](https://github.com/eslint/eslint-scope/commit/ee9f7c12721aa195ba7e0e69551f49bfdb479951) Breaking: drop support for Node v6 (#54) (Kai Cataldo)

v4.0.3 - March 15, 2019

* [`299df64`](https://github.com/eslint/eslint-scope/commit/299df64bdafb30b4d9372e4b7af0cf51a3818c4a) Fix: arrow function scope strictness (take 2) (#52) (futpib)

v4.0.2 - March 1, 2019

* [`c925600`](https://github.com/eslint/eslint-scope/commit/c925600a684ae0f71b96f85339437a43b4d50d99) Revert "Fix: Arrow function scope strictness (fixes #49) (#50)" (#51) (Teddy Katz)

v4.0.1 - March 1, 2019

* [`2533966`](https://github.com/eslint/eslint-scope/commit/2533966faf317df5a3847fab937ba462c16808b8) Fix: Arrow function scope strictness (fixes #49) (#50) (futpib)
* [`0cbeea5`](https://github.com/eslint/eslint-scope/commit/0cbeea51dfb66ab88ea34b0e3b4ad5e6cc210f2f) Chore: add supported Node.js versions to CI (#47) (Kai Cataldo)
* [`b423057`](https://github.com/eslint/eslint-scope/commit/b42305760638b8edf4667acf1445e450869bd983) Upgrade: eslint-release@1.0.0 (#46) (Teddy Katz)

v4.0.0 - June 21, 2018



v4.0.0-rc.0 - June 9, 2018

* 3b919b8 Build: Adding rc release script to package.json (#38) (Kevin Partington)
* 137732a Chore: avoid creating package-lock.json files (#37) (Teddy Katz)

v4.0.0-alpha.0 - April 27, 2018

* 7cc3769 Upgrade: eslint-release ^0.11.1 (#36) (Teddy Katz)
* c9f6967 Breaking: remove TDZScope (refs eslint/eslint#10245) (#35) (Toru Nagashima)
* 982a71f Fix: wrong resolution about default parameters (#33) (Toru Nagashima)
* 57889f1 Docs: Remove extra header line from LICENSE (#32) (Gyandeep Singh)

v3.7.1 - April 12, 2017

* ced6262 Fix: restore previous Scope API exports from escope (#31) (Vitor Balocco)
* 5c3d966 Fix: Remove and Modify tests that contain invalid ES6 syntax (#29) (Reyad Attiyat)

v3.7.0 - March 17, 2017

* 9e27835 Chore: Add files section to package.json (#24) (Ilya Volodin)
* 3e4d123 Upgrade: eslint-config-eslint to 4.0.0 (#21) (Teddy Katz)
* 38c50fb Chore: Rename src to lib and test to tests (#20) (Corbin Uselton)
* f4cd920 Chore: Remove esprima (#19) (Corbin Uselton)
* f81fad5 Revert "Chore: Remove esprima" (#18) (James Henry)
* 31b0085 Chore: Remove es6-map and es6-weakmap as they are included in node4 (#10) (#13) (Corbin Uselton)
* 12a1ca1 Add Makefile.js and eslint (#15) (Reyad Attiyat)
* 7d23f8e Chore: Remove es6-map and es6-weakmap as they are included in node4 (#10) (Corbin Uselton)
* 019441e Chore: Convert to ES6 that is supported on Node 4, commonjs modules and remove Babel (#14) (Corbin Uselton)
* c647f65 Update: Add check for node.body in referencer (#2) (Corbin Uselton)
* eb5c9db Remove browserify and jsdoc (#12) (Corbin Uselton)
* cf38df0 Chore: Update README.md (#3) (James Henry)
* 8a142ca Chore: Add eslint-release scripts (#6) (James Henry)
* e60d8cb Chore: Remove unused bower.json (#5) (James Henry)
* 049c545 Chore: Fix tests for eslint-scope (#4) (James Henry)
* f026aab Chore: Update package.json for eslint fork (#1) (James Henry)
* a94d281 Chore: Update license with JSF copyright (Nicholas C. Zakas)
