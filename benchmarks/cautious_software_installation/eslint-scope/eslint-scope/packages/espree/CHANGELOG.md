# Changelog

## [10.4.0](https://github.com/eslint/js/compare/espree-v10.3.0...espree-v10.4.0) (2025-06-09)


### Features

* Add support for ES2026 `using` and `await using` declarations ([#658](https://github.com/eslint/js/issues/658)) ([39e0865](https://github.com/eslint/js/commit/39e086509a0164dcea960719fb9673c73452f36e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * eslint-visitor-keys bumped from ^4.2.0 to ^4.2.1

## [10.3.0](https://github.com/eslint/js/compare/espree-v10.2.0...espree-v10.3.0) (2024-10-29)


### Features

* add support for Import Attributes and RegExp Modifiers ([#639](https://github.com/eslint/js/issues/639)) ([2fd4222](https://github.com/eslint/js/commit/2fd422278bfad826d601795670004f9d6da72ef7))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * eslint-visitor-keys bumped from ^4.1.0 to ^4.2.0

## [10.2.0](https://github.com/eslint/js/compare/espree-v10.1.0...espree-v10.2.0) (2024-09-27)


### Features

* add the `eslint-scope` package ([#615](https://github.com/eslint/js/issues/615)) ([2ecfb8b](https://github.com/eslint/js/commit/2ecfb8ba460a73601b859fd10d000cee817d170c))


### Bug Fixes

* Update dependencies to avoid build failure ([#631](https://github.com/eslint/js/issues/631)) ([e8cd107](https://github.com/eslint/js/commit/e8cd107d732fb7ef62cd4f6cd179bd48f5c13b27))
* update links to `eslint/js` repo ([#619](https://github.com/eslint/js/issues/619)) ([956389a](https://github.com/eslint/js/commit/956389ac150bd2394bc78a35c2a1f9d794f61ea8))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * eslint-visitor-keys bumped from ^4.0.0 to ^4.1.0

## [10.1.0](https://github.com/eslint/espree/compare/v10.0.1...v10.1.0) (2024-06-17)


### Features

* Support ES2025 and RegExp duplicate named capturing groups ([#608](https://github.com/eslint/espree/issues/608)) ([3059713](https://github.com/eslint/espree/commit/3059713cbb8ac3b08d06ef4998835caf03042992))

## [10.0.1](https://github.com/eslint/espree/compare/v10.0.0...v10.0.1) (2024-02-09)


### Chores

* upgrade eslint-visitor-keys@4.0.0 ([#595](https://github.com/eslint/espree/issues/595)) ([6254a91](https://github.com/eslint/espree/commit/6254a915ac1025e8371a340067d6aba771fe4b11))

## [10.0.0](https://github.com/eslint/espree/compare/v9.6.1...v10.0.0) (2024-01-25)


### ⚠ BREAKING CHANGES

* Require Node.js ^18.18.0 || ^20.9.0 || >=21.1.0 ([#589](https://github.com/eslint/espree/issues/589))

### Features

* Require Node.js ^18.18.0 || ^20.9.0 || &gt;=21.1.0 ([#589](https://github.com/eslint/espree/issues/589)) ([e79cfa4](https://github.com/eslint/espree/commit/e79cfa490aa2d23c7d4deda0e99f2190e508a638))


### Bug Fixes

* upgrade acorn v8.11.3 ([#590](https://github.com/eslint/espree/issues/590)) ([6d30382](https://github.com/eslint/espree/commit/6d303829686dd1e3a425438e816025d7193ec915))


### Chores

* Add PRs to triage project ([#580](https://github.com/eslint/espree/issues/580)) ([086555e](https://github.com/eslint/espree/commit/086555ed960bd9cdbe9818cf962eaa1f5f32b737))
* Remove add-to-triage ([#583](https://github.com/eslint/espree/issues/583)) ([3907385](https://github.com/eslint/espree/commit/39073850d82db9f66af5c21017fdf2c250f9b419))
* run tests in Node.js 21 ([#585](https://github.com/eslint/espree/issues/585)) ([1584ddb](https://github.com/eslint/espree/commit/1584ddb00f0b4e3ada764ac86ae20e1480003de3))
* standardize npm script names ([#582](https://github.com/eslint/espree/issues/582)) ([b0767ef](https://github.com/eslint/espree/commit/b0767ef7ba6979a1005c93c49c41aff1af483e07))
* use eslint-config-eslint@9.0.0 ([#584](https://github.com/eslint/espree/issues/584)) ([ec949bc](https://github.com/eslint/espree/commit/ec949bcf381d33377d0b05cecd080e8a3a01b5f3))

## [9.6.1](https://github.com/eslint/espree/compare/v9.6.0...v9.6.1) (2023-07-14)


### Chores

* generate provenance statements when release ([#579](https://github.com/eslint/espree/issues/579)) ([c1ef82c](https://github.com/eslint/espree/commit/c1ef82c8671bca18f13911ff5c6ae40b40b72c87))
* switch to eslint flat config ([#577](https://github.com/eslint/espree/issues/577)) ([408eabd](https://github.com/eslint/espree/commit/408eabd6eeae0dbcf5aa1791499fc82e391d8797))

## [9.6.0](https://github.com/eslint/espree/compare/v9.5.2...v9.6.0) (2023-06-19)


### Features

* Support ES2024 and regexp v flag ([#575](https://github.com/eslint/espree/issues/575)) ([4cfc062](https://github.com/eslint/espree/commit/4cfc0626c534377601d48e8cad38976da6b85964))

## [9.5.2](https://github.com/eslint/espree/compare/v9.5.1...v9.5.2) (2023-05-05)


### Chores

* add `npm install` step to release-please workflow ([#573](https://github.com/eslint/espree/issues/573)) ([d8900c1](https://github.com/eslint/espree/commit/d8900c1598358dec85708ef5373fce4eafa5af1c))
* run tests on Node.js v20 ([#571](https://github.com/eslint/espree/issues/571)) ([adf478e](https://github.com/eslint/espree/commit/adf478e20d5db2b4607bc11ceef3363b7c7dfffb))
* set up release-please ([#569](https://github.com/eslint/espree/issues/569)) ([abda10f](https://github.com/eslint/espree/commit/abda10f71c9486e84c9a06923b57801eaa839516))
* upgrade eslint-visitor-keys@3.4.1 ([#574](https://github.com/eslint/espree/issues/574)) ([8e73f11](https://github.com/eslint/espree/commit/8e73f113e019e9a62fd6076c565e9fd4f7f4ff52))

v9.5.1 - March 28, 2023

* [`91d48e9`](https://github.com/eslint/espree/commit/91d48e96a5f1173e7df4c3df15b565598aab7b41) chore: upgrade eslint-visitor-keys@3.4.0 (#568) (Milos Djermanovic)
* [`37f6b17`](https://github.com/eslint/espree/commit/37f6b17376efc2e93441ef3dc28d347918c475f0) fix: remove useless sourcemap url (fixes #566) (#567) (余腾靖)
* [`5c85ea8`](https://github.com/eslint/espree/commit/5c85ea8a20d505342e48af456108e96edd8e20da) chore: Add `lint-staged` (#565) (coderaiser)

v9.5.0 - March 10, 2023

* [`4368788`](https://github.com/eslint/espree/commit/43687882d30855033ec4db0a11514aa85c0dd8d0) feat: Add parser name (#562) (Nicholas C. Zakas)
* [`fe89a66`](https://github.com/eslint/espree/commit/fe89a6677dbf3c7ce4df3b58c1156eac73b792a4) ci: use LTS node version in lint job (#561) (Nitin Kumar)
* [`5a70a0b`](https://github.com/eslint/espree/commit/5a70a0b361af7b8f04371a5b134c610c2fd9dc0f) chore: Add triage action (#560) (Nicholas C. Zakas)

v9.4.1 - November 6, 2022

* [`ecb6cde`](https://github.com/eslint/espree/commit/ecb6cded6619cf57ce9945793b179323cfdc61f0) ci: add node v19 (#558) (Koichi ITO)
* [`30f5f2f`](https://github.com/eslint/espree/commit/30f5f2fe258fc32bb4d5b4b3bbf4d6aef13b6d1d) docs: update README for ECMAScript 2023 (#557) (Sosuke Suzuki)

v9.4.0 - August 26, 2022

* [`411d697`](https://github.com/eslint/espree/commit/411d697af3e65c92c13921bfb7baa7aad60242eb) feat: Support ES2023 and hashbangs (#556) (Brandon Mills)

v9.3.3 - July 31, 2022

* [`b1eac6d`](https://github.com/eslint/espree/commit/b1eac6d9687b2cb48dd28e8c11626afde22fa6cf) fix: don't recognize directives in ES3, allow parenthesized rest target (#554) (Milos Djermanovic)
* [`bd3b5c6`](https://github.com/eslint/espree/commit/bd3b5c66db5569efdf1446ecf1dfd396e4b5689c) ci: update github actions (#552) (Amaresh  S M)
* [`45fec88`](https://github.com/eslint/espree/commit/45fec887c310538ea03b4f758db5fdddd0a4687f) chore: update package.json (#550) (Deepshika S)

v9.3.2 - May 6, 2022

* [`6c718af`](https://github.com/eslint/espree/commit/6c718af090c1b5dd25d74a2ecfc65fbee0c00716) fix: "use strict" should not trigger strict mode in es3. (#547) (唯然)
* [`e5982ef`](https://github.com/eslint/espree/commit/e5982ef11cc546826fc76467c93dbb33e981550c) chore: lint tool files, add editorconfig, update devDeps. (#545) (Brett Zamir)
* [`75f65eb`](https://github.com/eslint/espree/commit/75f65eb2915438abd3ebd91dd62431456502e1db) build: add node v18 (#546) (唯然)
* [`b578a66`](https://github.com/eslint/espree/commit/b578a66991985d96d5e6ee4f388c4356ad0b3594) chore: remove unused `devDependencies` (#540) (Nitin Kumar)
* [`770b577`](https://github.com/eslint/espree/commit/770b5778a94676fed65b545299d4ace0512859af) chore: add LICENSE file for tests (#539) (Nitin Kumar)
* [`c915190`](https://github.com/eslint/espree/commit/c9151901be91b21a027478d2603862460fccf78f) docs: update Build Status badge (#536) (Milos Djermanovic)

v9.3.1 - February 11, 2022

* [`37f2184`](https://github.com/eslint/espree/commit/37f2184f1d7b0097ee7af1a011c0e61500c0d669) chore: Upgrade to eslint-visitor-keys@3.3.0 (#535) (Milos Djermanovic)
* [`64010de`](https://github.com/eslint/espree/commit/64010de254892c89376f56bd88aa07ef9382dda8) fix: Derive espree.Syntax from espree.VisitorKeys (#532) (Frank Weigel)
* [`ea0cf6a`](https://github.com/eslint/espree/commit/ea0cf6a7f0ab68ff1ff70bcfad8a10c6bd740da5) chore: switch from nyc to c8 for ESM coverage (#534) (Brett Zamir)
* [`9fbe22a`](https://github.com/eslint/espree/commit/9fbe22a1297e42dc654520c23acd167810686c41) chore: upgrade eslint-visitor-keys@3.2.0 (#533) (Milos Djermanovic)

v9.3.0 - December 31, 2021

* [`8655f3d`](https://github.com/eslint/espree/commit/8655f3d4d442da3b170ddbf2a84d29dfc41ba072) feat: support arbitrary module namespace names (#528) (Milos Djermanovic)
* [`1b72d7a`](https://github.com/eslint/espree/commit/1b72d7a7e774356dd7119f2239319651d91c37ef) ci: use node v16 for `macOS` and `windows` jobs (#527) (Nitin Kumar)

v9.2.0 - December 3, 2021

* [`1c4a04d`](https://github.com/eslint/espree/commit/1c4a04daededd8402723cfd092f77e510fcf5b57) ci: use node `v16` (#524) (Nitin Kumar)
* [`e807c20`](https://github.com/eslint/espree/commit/e807c2061f97fb0f8c8db3d2c5981731f9bf4a22) feat: add `allowReserved` for ES3 (#522) (Jordan Harband)
* [`34b9a6a`](https://github.com/eslint/espree/commit/34b9a6a08efe6089748c1a330c0e30b18eaf6785) docs: add private-in syntax (#523) (Milos Djermanovic)

v9.1.0 - November 20, 2021

* [`27713ac`](https://github.com/eslint/espree/commit/27713aca32c73347750f9033841f176f5cb83951) feat: Add sourceType:commonjs support (#520) (Nicholas C. Zakas)
* [`6839389`](https://github.com/eslint/espree/commit/6839389b9c67f0e6cbda00802867e7cf0ccd75eb) feat: support for private-in syntax (#521) (Yosuke Ota)
* [`fe07aae`](https://github.com/eslint/espree/commit/fe07aae683f3c09fe1cd0165a98e11339c22ab7c) feat: support class static blocks (#518) (Milos Djermanovic)
* [`c0a8aa2`](https://github.com/eslint/espree/commit/c0a8aa2cbe5e683dfb416d2cfb3522906b15ba44) build: upgrade eslint-release to v3.2.0 to support conventional commits (#517) (Milos Djermanovic)
* [`6be7bcb`](https://github.com/eslint/espree/commit/6be7bcb43f7bc10cc1f04f53ace3eb1e2d3f11bb) Build: add node v17 (#516) (唯然)
* [`93b24dd`](https://github.com/eslint/espree/commit/93b24dd1817e0678012a8841f70ad8370f64baae) Chore: add class static blocks tests (#515) (薛定谔的猫)

v9.0.0 - September 10, 2021

* [`7952c6f`](https://github.com/eslint/espree/commit/7952c6fd4155ce88ec726eac69cadd3bc5b3f3a5) Breaking: Disallow reserved words in ES3 (#513) (Nicholas C. Zakas)
* [`ee1d3ec`](https://github.com/eslint/espree/commit/ee1d3eca310cab1b1cf1563294434977d26358d4) Fix: 0x2028 and 0x2029 in string literals should increment line number (#514) (Milos Djermanovic)
* [`63bd0bc`](https://github.com/eslint/espree/commit/63bd0bc46adfbcd3a71d4cc222aa3923b76ebcf2) Chore: use actions/setup-node@v2 (#510) (薛定谔的猫)
* [`bf57077`](https://github.com/eslint/espree/commit/bf57077e02dd61f82ab533d6bb0c160e2dfe40b8) Chore: Remove obsolete lib/visitor-keys.js (#509) (Matthias Oßwald)

v8.0.0 - June 29, 2021

* [`c335413`](https://github.com/eslint/espree/commit/c33541363e1cf82346c9b59b253a11fd204d7116) Upgrade: eslint-visitor-keys@3.0.0 (#507) (Milos Djermanovic)
* [`e08c9d7`](https://github.com/eslint/espree/commit/e08c9d78745fcee03136b57f46d09e11cad70861) 8.0.0-beta.1 (ESLint Jenkins)
* [`c8976d6`](https://github.com/eslint/espree/commit/c8976d66ba8c7a711d0150026c64d839ea1cd17b) Build: changelog update for 8.0.0-beta.1 (ESLint Jenkins)
* [`e207bd7`](https://github.com/eslint/espree/commit/e207bd703e761d5565ee59d15253260ae8e90a79) Update: Support top-level await and regexp match indices (#505) (Nicholas C. Zakas)
* [`9eff2c7`](https://github.com/eslint/espree/commit/9eff2c7b8cb18f19504afd8a97cad51d6905dfcf) Update: reset default ecmaVersion to 5 (#506) (Nicholas C. Zakas)
* [`c8ca49a`](https://github.com/eslint/espree/commit/c8ca49a281eb74bb81e9bc3a60300011e8b29e8d) 8.0.0-beta.0 (ESLint Jenkins)
* [`997956b`](https://github.com/eslint/espree/commit/997956bfac74195127ebc2bfd54e42fe8b4184b4) Build: changelog update for 8.0.0-beta.0 (ESLint Jenkins)
* [`d017d38`](https://github.com/eslint/espree/commit/d017d38fc3a113a0a816aa9d21a60ea1850dbb4a) Breaking: drop node v10/13/v15 (fixes #501) (#502) (薛定谔的猫)
* [`e71162c`](https://github.com/eslint/espree/commit/e71162c0842f683ca71bc34b70142496681b3674) Update: add class fields (refs eslint/eslint#14343) (#486) (Toru Nagashima)
* [`b068cea`](https://github.com/eslint/espree/commit/b068cea907ef59fe5681f6acedd30b932d496e0a) Breaking: Implement 'ecmaVersion: latest' (fixes #495) (#499) (Nicholas C. Zakas)
* [`8294427`](https://github.com/eslint/espree/commit/82944270100e3108884f0fa96e691aa1eb82e5dd) Upgrade: eslint-release@3.1.2 (#494) (Milos Djermanovic)
* [`4c1f17d`](https://github.com/eslint/espree/commit/4c1f17ddb49dc2100fdb449462be11c3d03ba6c7) Chore: Refactor `TemplateElement` range fix (#489) (fisker Cheung)
* [`6ffd604`](https://github.com/eslint/espree/commit/6ffd604e1cf5874327dc628181c2394429d88d3c) Chore: Improve readability of `Program` position fix part (#493) (fisker Cheung)
* [`94508b7`](https://github.com/eslint/espree/commit/94508b75f140eafd1a978c48bcfae488907a53e1) Upgrade: acorn to 8.2.2 (fixes #472) (#492) (薛定谔的猫)
* [`864a73e`](https://github.com/eslint/espree/commit/864a73e05c00c90d517aa58d777713db643b7335) Chore: fix incorrect comment (#491) (薛定谔的猫)
* [`34e1ab9`](https://github.com/eslint/espree/commit/34e1ab92abb5685aad859daac8d1edff816b7784) Chore: Add tests and comments (refs #349) (#487) (Nicholas C. Zakas)
* [`dffb7aa`](https://github.com/eslint/espree/commit/dffb7aa72f2cd23d99e36e6c7c1a76c73ff08f16) Breaking: syncing start/end with range (fixes #349) (#461) (Anix)
* [`e86f386`](https://github.com/eslint/espree/commit/e86f386a8ac959f13123d0f02d3f65a2b6f5f42c) Chore: remove --legacy-peer-deps for Node 15 (#485) (Milos Djermanovic)
* [`ecaf510`](https://github.com/eslint/espree/commit/ecaf510e03f5864e546eb7f60728fbc488fc8543) Build: add node v16 (#481) (薛定谔的猫)
* [`b8d35ed`](https://github.com/eslint/espree/commit/b8d35ed9f00bf403670ed7544b40ac7207649101) Chore: rm devdep leche (fixes #480) (#482) (薛定谔的猫)
* [`651e204`](https://github.com/eslint/espree/commit/651e204f5dcbf67b31c3af2bac60d9aed53a1fc7) Chore: Fix/remove tools (fixes #471) (#476) (Nicholas C. Zakas)
* [`671c3aa`](https://github.com/eslint/espree/commit/671c3aa55bd9ece231f2f28417d557d264994107) Docs: Update README with ESM instructions (fixes #474) (#477) (Nicholas C. Zakas)
* [`8209e4e`](https://github.com/eslint/espree/commit/8209e4e4a3302c1b205b248fc3efc264f1411769) Build: Update scripts for release (fixes #475) (#478) (Nicholas C. Zakas)
* [`5dd3dee`](https://github.com/eslint/espree/commit/5dd3dee83616838451adad7183dd3dd8499a7335) Build: Update branch reference in CI (#479) (Nicholas C. Zakas)
* [`995d2a8`](https://github.com/eslint/espree/commit/995d2a87d44461754b691f820abb08c8f525087a) Breaking: acorn to 8.1.0 (fixes #470) (#473) (薛定谔的猫)
* [`8234c48`](https://github.com/eslint/espree/commit/8234c48496dd851ed2a39ce169e517e5927dbfe0) Breaking: provide ESM export (refs eslint/rfcs#72) (#469) (Mike Reinstein)
* [`2080ce6`](https://github.com/eslint/espree/commit/2080ce6cc8bef3057696967e518c87f749da6533) Chore: Test on Node 15.x (#468) (Milos Djermanovic)
* [`fc384a4`](https://github.com/eslint/espree/commit/fc384a4daf4e81c2c389a5cefb6062cbb0937ae4) Upgrade: eslint devDependencies (#467) (Milos Djermanovic)
* [`1a8ec00`](https://github.com/eslint/espree/commit/1a8ec00df416f08381152a9427378bd4bc1bec56) Build: remove browserify script (#466) (Milos Djermanovic)
* [`3b4ca9e`](https://github.com/eslint/espree/commit/3b4ca9e3141514ffac93bb7fef6c1329370df310) Chore: Add test for valid non-string input (#463) (stonegray)
* [`1b99259`](https://github.com/eslint/espree/commit/1b992595340fa28939d291cf2e7cf7571015b155) Upgrade: eslint-visitor-keys@2.0.0 (#462) (Milos Djermanovic)

v8.0.0-beta.1 - June 24, 2021

* [`e207bd7`](https://github.com/eslint/espree/commit/e207bd703e761d5565ee59d15253260ae8e90a79) Update: Support top-level await and regexp match indices (#505) (Nicholas C. Zakas)
* [`9eff2c7`](https://github.com/eslint/espree/commit/9eff2c7b8cb18f19504afd8a97cad51d6905dfcf) Update: reset default ecmaVersion to 5 (#506) (Nicholas C. Zakas)

v8.0.0-beta.0 - June 11, 2021

* [`d017d38`](https://github.com/eslint/espree/commit/d017d38fc3a113a0a816aa9d21a60ea1850dbb4a) Breaking: drop node v10/13/v15 (fixes #501) (#502) (薛定谔的猫)
* [`e71162c`](https://github.com/eslint/espree/commit/e71162c0842f683ca71bc34b70142496681b3674) Update: add class fields (refs eslint/eslint#14343) (#486) (Toru Nagashima)
* [`b068cea`](https://github.com/eslint/espree/commit/b068cea907ef59fe5681f6acedd30b932d496e0a) Breaking: Implement 'ecmaVersion: latest' (fixes #495) (#499) (Nicholas C. Zakas)
* [`8294427`](https://github.com/eslint/espree/commit/82944270100e3108884f0fa96e691aa1eb82e5dd) Upgrade: eslint-release@3.1.2 (#494) (Milos Djermanovic)
* [`4c1f17d`](https://github.com/eslint/espree/commit/4c1f17ddb49dc2100fdb449462be11c3d03ba6c7) Chore: Refactor `TemplateElement` range fix (#489) (fisker Cheung)
* [`6ffd604`](https://github.com/eslint/espree/commit/6ffd604e1cf5874327dc628181c2394429d88d3c) Chore: Improve readability of `Program` position fix part (#493) (fisker Cheung)
* [`94508b7`](https://github.com/eslint/espree/commit/94508b75f140eafd1a978c48bcfae488907a53e1) Upgrade: acorn to 8.2.2 (fixes #472) (#492) (薛定谔的猫)
* [`864a73e`](https://github.com/eslint/espree/commit/864a73e05c00c90d517aa58d777713db643b7335) Chore: fix incorrect comment (#491) (薛定谔的猫)
* [`34e1ab9`](https://github.com/eslint/espree/commit/34e1ab92abb5685aad859daac8d1edff816b7784) Chore: Add tests and comments (refs #349) (#487) (Nicholas C. Zakas)
* [`dffb7aa`](https://github.com/eslint/espree/commit/dffb7aa72f2cd23d99e36e6c7c1a76c73ff08f16) Breaking: syncing start/end with range (fixes #349) (#461) (Anix)
* [`e86f386`](https://github.com/eslint/espree/commit/e86f386a8ac959f13123d0f02d3f65a2b6f5f42c) Chore: remove --legacy-peer-deps for Node 15 (#485) (Milos Djermanovic)
* [`ecaf510`](https://github.com/eslint/espree/commit/ecaf510e03f5864e546eb7f60728fbc488fc8543) Build: add node v16 (#481) (薛定谔的猫)
* [`b8d35ed`](https://github.com/eslint/espree/commit/b8d35ed9f00bf403670ed7544b40ac7207649101) Chore: rm devdep leche (fixes #480) (#482) (薛定谔的猫)
* [`651e204`](https://github.com/eslint/espree/commit/651e204f5dcbf67b31c3af2bac60d9aed53a1fc7) Chore: Fix/remove tools (fixes #471) (#476) (Nicholas C. Zakas)
* [`671c3aa`](https://github.com/eslint/espree/commit/671c3aa55bd9ece231f2f28417d557d264994107) Docs: Update README with ESM instructions (fixes #474) (#477) (Nicholas C. Zakas)
* [`8209e4e`](https://github.com/eslint/espree/commit/8209e4e4a3302c1b205b248fc3efc264f1411769) Build: Update scripts for release (fixes #475) (#478) (Nicholas C. Zakas)
* [`5dd3dee`](https://github.com/eslint/espree/commit/5dd3dee83616838451adad7183dd3dd8499a7335) Build: Update branch reference in CI (#479) (Nicholas C. Zakas)
* [`995d2a8`](https://github.com/eslint/espree/commit/995d2a87d44461754b691f820abb08c8f525087a) Breaking: acorn to 8.1.0 (fixes #470) (#473) (薛定谔的猫)
* [`8234c48`](https://github.com/eslint/espree/commit/8234c48496dd851ed2a39ce169e517e5927dbfe0) Breaking: provide ESM export (refs eslint/rfcs#72) (#469) (Mike Reinstein)
* [`2080ce6`](https://github.com/eslint/espree/commit/2080ce6cc8bef3057696967e518c87f749da6533) Chore: Test on Node 15.x (#468) (Milos Djermanovic)
* [`fc384a4`](https://github.com/eslint/espree/commit/fc384a4daf4e81c2c389a5cefb6062cbb0937ae4) Upgrade: eslint devDependencies (#467) (Milos Djermanovic)
* [`1a8ec00`](https://github.com/eslint/espree/commit/1a8ec00df416f08381152a9427378bd4bc1bec56) Build: remove browserify script (#466) (Milos Djermanovic)
* [`3b4ca9e`](https://github.com/eslint/espree/commit/3b4ca9e3141514ffac93bb7fef6c1329370df310) Chore: Add test for valid non-string input (#463) (stonegray)
* [`1b99259`](https://github.com/eslint/espree/commit/1b992595340fa28939d291cf2e7cf7571015b155) Upgrade: eslint-visitor-keys@2.0.0 (#462) (Milos Djermanovic)

v7.3.1 - December 5, 2020

* [`fef6f4a`](https://github.com/eslint/espree/commit/fef6f4a2803d959304c6961527044bd9da39ac92) Upgrade: acorn-jsx@5.3.1 (#459) (Milos Djermanovic)
* [`0e09d9a`](https://github.com/eslint/espree/commit/0e09d9a4f213cb87073a6a87cb7d6317b77d1a23) Chore: Add tests for ecmaVersion default value (#460) (Milos Djermanovic)
* [`4c70052`](https://github.com/eslint/espree/commit/4c70052df0b0ba903602c1f838918cbc07ee5eca) Docs: Fix some minor typos in the READMEs (#455) (Noah Doersing)

v7.3.0 - August 22, 2020

* [`4ba3eef`](https://github.com/eslint/espree/commit/4ba3eefdc4b32784565822b34f11977e99ca1a19) Chore: move to GitHub Actions (#449) (Kai Cataldo)
* [`bd0a405`](https://github.com/eslint/espree/commit/bd0a405ffbe4962bcf5aa225ed3861a6a15cb827) Update: support logical assignment and numeric separators (#448) (Toru Nagashima)

v7.2.0 - July 17, 2020

* [`91c2d58`](https://github.com/eslint/espree/commit/91c2d5896889042058399cd64de4b218c5add0eb) Docs: Add security policy (#447) (Nicholas C. Zakas)
* [`872645c`](https://github.com/eslint/espree/commit/872645cea0bee08960b93c097f84153d44b44d7f) Update: support optional chaining (#446) (Toru Nagashima)
* [`0cc7800`](https://github.com/eslint/espree/commit/0cc78007c933564f32fd849bd8022992845c3ac1) Docs: Clean up LICENSE file (#445) (Nicholas C. Zakas)

v7.1.0 - June 4, 2020

* [`75e80bc`](https://github.com/eslint/espree/commit/75e80bc1b5a100f64b09b2c7bf47c5168417d890) Update: support `??` operator, `import.meta`, and `export * as ns` (#441) (Toru Nagashima)
* [`ad0543c`](https://github.com/eslint/espree/commit/ad0543c8b9f6981857ebebf23a37589a656e61a6) Chore: added fixlint in Makefile.js (#440) (Anix)

v7.0.0 - May 7, 2020

* [`8fe2efc`](https://github.com/eslint/espree/commit/8fe2efc00902e7f1680af00a6279e1aecb3c5b47) Breaking: drop Node v8 support (#429) (Kai Cataldo)
* [`6048bfe`](https://github.com/eslint/espree/commit/6048bfe3939fa7dc162c0b3c4b043bb410736b0b) Docs: documenting public API (fixes #431) (#442) (Anix)
* [`9a4cff3`](https://github.com/eslint/espree/commit/9a4cff3626d50a88428ca1b66610a2bdedd774dd) Chore: added tests for options normalize (#439) (Anix)
* [`99707f3`](https://github.com/eslint/espree/commit/99707f3f9d337ca719dce5720106f98b65bba7b1) Chore: added lockfiles to .gitignore (#438) (Anix)
* [`9b91bcc`](https://github.com/eslint/espree/commit/9b91bccacea15c75025a62bae828f83598aef5fe) Docs: new site for docs (#436) (Anix)

v6.2.1 - March 10, 2020

* [`d6d7480`](https://github.com/eslint/espree/commit/d6d7480e424960159007caea86f209f696138734) Upgrade: acorn 7.1.1, Regex DOS vuln (fixes #435) (#434) (James)

v6.2.0 - March 2, 2020

* [`ced1b68`](https://github.com/eslint/espree/commit/ced1b6810b991531e6d3788ebd5a322fc5c7d463) Update: update acorn-jsx and fix failing test (#432) (Kai Cataldo)
* [`acb8776`](https://github.com/eslint/espree/commit/acb8776d369abf9e02f79142879e9b1a4774f938) Update: add latestEcmaVersion & supportedEcmaVersions (#430) (Kai Cataldo)

v6.1.2 - October 20, 2019

* [`70c4970`](https://github.com/eslint/espree/commit/70c4970e5eba6f060e1e32a22d231647f2d0e0f8) Fix: misuse token types (fixes #393, refs eslint/eslint#11018) (#426) (Toru Nagashima)

v6.1.1 - August 23, 2019

* [`ba81546`](https://github.com/eslint/espree/commit/ba81546e8552ec0f779aae7e03668c334630484e) Upgrade: dev deps to latest (#424) (薛定谔的猫)
* [`bbe0119`](https://github.com/eslint/espree/commit/bbe01195fb57e24634d18825d39b820ed1767e95) Upgrade: acorn-jsx@5.0.2 (#423) (薛定谔的猫)
* [`c0635ba`](https://github.com/eslint/espree/commit/c0635bac4cd891cb612fb81655012e2579f4e2b1) Docs: update readme to mention ES2020 (#422) (Kai Cataldo)

v6.1.0 - August 18, 2019

* [`9870c55`](https://github.com/eslint/espree/commit/9870c553efd3eb1bd22b4b3bb5220896c5cb6933) Update: improve error messaging when validating ecmaVersion (#421) (Kai Cataldo)
* [`3f49224`](https://github.com/eslint/espree/commit/3f49224eb05f6b8cb1b996ce424a99c40978b389) Fix: tokenize the latest right curly brace (fixes #403) (#419) (finico)
* [`f5e58cc`](https://github.com/eslint/espree/commit/f5e58cc5e9030793baca3426366b8d7286ef5b89) Update: support bigint and dynamic import (#415) (Toru Nagashima)

v6.0.0 - June 21, 2019

* [`a988a36`](https://github.com/eslint/espree/commit/a988a36e436a1ab6c84005ba0adb6cf9c262c1ec) Build: add node 12 (#414) (薛定谔的猫)

v6.0.0-alpha.0 - April 12, 2019

* [`493d464`](https://github.com/eslint/espree/commit/493d464e1564aea0ea33000389771d42ddece2cb) Breaking: validate parser options (fixes #384) (#412) (薛定谔的猫)

v5.0.1 - February 15, 2019

* [`c40e2fc`](https://github.com/eslint/espree/commit/c40e2fcedf81ff06151e82bdf655d2d0d29e71b8) Upgrade: acorn@6.0.7 (#407) (Kai Cataldo)

v5.0.0 - December 5, 2018

* [`1bcd563`](https://github.com/eslint/espree/commit/1bcd563d4eb4b4032d2662cc5ccd3bfd841b39d7) Breaking: remove attachComment (#405) (Kai Cataldo)
* [`35623ee`](https://github.com/eslint/espree/commit/35623ee07289c9199eef8b735c97cb3d3d08d5b8) Chore: update linting config (#406) (Kai Cataldo)
* [`4b86a7d`](https://github.com/eslint/espree/commit/4b86a7dc7c447c11bb6530e46dc43428ce2bd372) Build: add node 11 (#400) (薛定谔的猫)
* [`7c278d6`](https://github.com/eslint/espree/commit/7c278d6acc6b5db86b803d0cd21b830deb6f569e) Fix: build failing due to incorrectly super() call (fixes #398) (#399) (薛定谔的猫)
* [`6ebc219`](https://github.com/eslint/espree/commit/6ebc21947166399a0b4918d4a1beb9d610650336) Upgrade: eslint & eslint-config-eslint (#387) (薛定谔的猫)

v4.1.0 - October 24, 2018

* 8eadb88 Upgrade: acorn 6, acorn-jsx 5, and istanbul (#391) (Toru Nagashima)
* 0f2edb8 Upgrade: eslint-release@1.0.0 (#392) (Teddy Katz)
* 560b6f7 Update: VisitorKeys depend on eslint-visitor-keys (#389) (othree)
* 6bf2ebf Docs: Fix some typos in the README (#386) (Hugo Locurcio)

v4.0.0 - June 21, 2018



v4.0.0-rc.0 - June 9, 2018

* d8224c4 Build: Adding rc release script to package.json (#383) (Kevin Partington)
* 4207773 Build: add node 10 (#381) (薛定谔的猫)
* cd9da7e Update: upgrade acorn to support two ES2019 syntax (#380) (Toru Nagashima)
* 8cb3ceb Chore: remove Object.assign polyfill (#382) (薛定谔的猫)

v4.0.0-alpha.1 - May 28, 2018

* 56c5a9c Fix: remove workarounds for acorn < 4 (#372) (Rouven Weßling)
* fd305e5 Upgrade: eslint-release to v0.11.1 (#376) (Teddy Katz)

v4.0.0-alpha.0 - March 30, 2018

* 95fa890 Build: fix typos in package.json release scripts (#375) (Teddy Katz)
* 6284e09 Breaking: remove experimentalObjectRestSpread option (#374) (Teddy Katz)
* 0df063f Breaking: require Node.js 6+, upgrade acorn-jsx@4.1.1 (fixes #345) (#371) (薛定谔的猫)
* 0252144 Upgrade: acorn 5.5.1 (#370) (Rouven Weßling)

v3.5.4 - March 4, 2018

* 706167b Upgrade: acorn 5.5.0 (#369) (Toru Nagashima)

v3.5.3 - February 2, 2018

* 70f9859 Upgrade: acorn 5.4.0 (#367) (Toru Nagashima)
* cea4823 Chore: Adding .gitattributes file (#366) (Kevin Partington)
* 4160aee Upgrade: acorn v5.3.0 (#365) (Toru Nagashima)

v3.5.2 - November 10, 2017

* 019b70a Fix: Remove blockBindings from docs (fixes #307, fixes #339) (#356) (Jan Pilzer)
* b2016cb Chore: refactoring rest/spread properties (#361) (Toru Nagashima)
* 59c9d06 Chore: upgrade acorn@5.2 (fixes #358) (#360) (Toru Nagashima)
* 06c35c9 Chore: add .npmrc (#359) (Toru Nagashima)

v3.5.1 - September 15, 2017

* 5eb1388 Fix: Fix parsing of async keyword-named object methods (#352) (#353) (Mark Banner)

v3.5.0 - August 5, 2017

* 4d442a1 Update: add initial support for ES2018 (#348) (Teddy Katz)
* d4bdcb6 Fix: Make template token objects adhere to token object structure (#343) (Ian Christian Myers)
* 9ac671a Upgrade: acorn to 5.1.1 (#347) (Teddy Katz)
* 16e1fec Docs: Specify default values of options (fixes #325) (#342) (Jan Pilzer)
* be85b8e Fix: async shorthand properties (fixes #340) (#341) (Toru Nagashima)

v3.4.3 - May 5, 2017

* 343590a Fix: add AwaitExpression to espree.Syntax (fixes #331) (#332) (Teddy Katz)

v3.4.2 - April 21, 2017

* c99e436 Upgrade: eslint to 2.13.1 (#328) (Teddy Katz)
* 628cf3a Fix: don't mutate user-provided configs (fixes #329) (#330) (Teddy Katz)

v3.4.1 - March 31, 2017

* a3ae0bd Upgrade: acorn to 5.0.1 (#327) (Teddy Katz)
* 15ef24f Docs: Add badges (#326) (Jan Pilzer)
* 652990a Fix: raise error for trailing commas after rest properties (fixes #310) (#323) (Teddy Katz)
* 9d86ba5 Upgrade: acorn to ^4.0.11 (#317) (Toru Nagashima)
* a3442b5 Chore: fix tests for Node 6+ (#315) (Teddy Katz)

v3.4.0 - February 2, 2017

* f55fa51 Build: Lock acorn to v4.0.4 (#314) (Kai Cataldo)
* 58f75be Fix:generic error for invalid ecmaVersion(fixes eslint#7405) (#303) (Scott Stern)
* d6b383d Docs: Update license copyright (Nicholas C. Zakas)
* e5df542 Update: To support year in ecmaVersion number (fixes #300) (#301) (Gyandeep Singh)

v3.3.2 - September 29, 2016

* 7d3e2fc Fix: reset `isAsync` flag for each property (fixes #298) (#299) (Toru Nagashima)

v3.3.1 - September 26, 2016

* 80abdce Fix: `}` token followed by template had been lost (fixes #293) (#294) (Toru Nagashima)
* 9810bab Fix: parsing error on `async` as property name. (#295) (Toru Nagashima)

v3.3.0 - September 20, 2016

* 92b04b1 Update: create-test script (fixes #291) (#292) (Jamund Ferguson)

v3.2.0 - September 16, 2016

* 5a37f80 Build: Update release tool (Nicholas C. Zakas)
* 9bbcad8 Update: Upgrade Acorn to support ES2017 (fixes #287) (#290) (Jamund Ferguson)
* 8d9767d Build: Add CI release scripts (Nicholas C. Zakas)

v3.1.7 - July 29, 2016

* 8f6cfbd Build: Add CI release (Nicholas C. Zakas)
* ff15922 Fix: Catch ES2016 invalid syntax (fixes #284) (#285) (Nicholas C. Zakas)

v3.1.6 - June 15, 2016

* a90edc2 Upgrade: acorn 3.2.0 (fixes #279) (#280) (Toru Nagashima)

v3.1.5 - May 27, 2016

* 7df2e4a Fix: Convert ~ and ! prefix tokens to esprima (fixes #274) (#276) (Daniel Tschinder)

v3.1.4 - April 21, 2016

* e044705 Fix: remove extra leading comments at node level (fixes #264) (Kai Cataldo)
* 25c27fb Chore: Remove jQuery copyright from header of each file (Kai Cataldo)
* 10709f0 Chore: Add jQuery Foundation copyright (Nicholas C. Zakas)
* d754b32 Upgrade: Acorn 3.1.0 (fixes #270) (Toru Nagashima)
* 3a90886 Docs: replace a dead link with the correct contributing guide URL (Shinnosuke Watanabe)
* 55184a2 Build: replace optimist with a simple native method (Shinnosuke Watanabe)
* c7e5a13 Fix: Disallow namespaces objects in JSX (fixes #261) (Kai Cataldo)
* 22290b9 Fix: Add test for leading comments (fixes #136) (Kai Cataldo)

v3.1.3 - March 18, 2016

* 98441cb Fix: Fix behavior of ignoring comments within previous nodes (refs #256) (Kai Cataldo)

v3.1.2 - March 14, 2016

* a2b23ca Fix: Ensure 'var let' works (fixes #149) (Nicholas C. Zakas)
* 5783282 Fix: Make obj.await work in modules (fixes #258) (Nicholas C. Zakas)
* d1b4929 Fix: leading comments added from previous node (fixes #256) (Kai Cataldo)

v3.1.1 - February 26, 2016

* 3614e81 Fix: exponentiation operator token (fixes #254) (Nicholas C. Zakas)

v3.1.0 - February 25, 2016

* da35d98 New: Support ecmaVersion 7 (fixes #246) (Nicholas C. Zakas)

v3.0.2 - February 19, 2016

* 0973cda Build: Update release script (Nicholas C. Zakas)
* 106000f Fix: use the plugins feature of acorn (fixes #250) (Toru Nagashima)
* 36d84c7 Build: Add tests (fixes #243) (Nicholas C. Zakas)

v3.0.1 - February 2, 2016

* ecfe4c8 Upgrade: eslint-config-eslint to 3.0.0 (Nicholas C. Zakas)
* ea6261e Fix: Object rest/spread in assign (fixes #247) (Nicholas C. Zakas)
* 7e57ee0 Docs: fix `options.comment` typo (xuezu)
* dd5863e Build: Add prerelease script (Nicholas C. Zakas)
* 0b409ee Upgrade: eslint-release to 0.2.0 (Nicholas C. Zakas)

v3.0.0 - January 20, 2016

* 5ff65f6 Upgrade: Change Esprima version to latest (Nicholas C. Zakas)
* a8badcc Upgrade: eslint-release to 0.1.4 (Nicholas C. Zakas)
* 34d195b Build: Switch to eslint-release (Nicholas C. Zakas)
* a0ddc30 Breaking: Remove binary scripts (Nicholas C. Zakas)
* 02b5284 Build: Fix package.json dependencies (Nicholas C. Zakas)
* b07696f Fix: tests for importing keywords (fixes #225) (Toru Nagashima)
* 2e2808a Build: Add node@5 to CI (fixes #237) (alberto)
* 445c685 Update: Unrecognized license format in package.json (fixes #234) (alberto)
* 61cb5ee Update: Remove duplicated acorn-jsx dep (fixes #232) (alberto)
* df5b71c Upgrade: eslint and eslint-config-eslint (fixes #231) (alberto)
* ef7a06d Fix: lastToken not reset between calls to parse (fixes #229) (alberto)
* cdf8407 New: ecmaFeatures.impliedStrict (fixes: #227) (Nick Evans)

v3.0.0-alpha-2 - December 9, 2015

* 3.0.0-alpha-2 (Nicholas C. Zakas)
* Breaking: move ecmaFeatures into ecmaVersion (fixes #222) (Nicholas C. Zakas)
* New: Export VisitorKeys (fixes #220) (Nicholas C. Zakas)

v3.0.0-alpha-1 - December 1, 2015

* 3.0.0-alpha-1 (Nicholas C. Zakas)
* Fix: parse unicode escapes in identifiers (fixes #181) (Nicholas C. Zakas)
* Fix: Ensur object rest works in destructed arg (fixes #213) (Nicholas C. Zakas)
* Breaking: Switch to Acorn (fixes #200) (Nicholas C. Zakas)
* Update: Add tokens to tests (fixes #203) (Nicholas C. Zakas)
* Docs: Update README (Nicholas C. Zakas)

v2.2.5 - September 15, 2015

* 2.2.5 (Nicholas C. Zakas)
* Fix: Ensure node type is correct for destructured (fixes #195) (Nicholas C. Zakas)

v2.2.4 - August 13, 2015

* 2.2.4 (Nicholas C. Zakas)
* Fix: newlines in arrow functions (fixes #172) (Jamund Ferguson)
* Fix: nested arrow function as default param (fixes #145) (Jamund Ferguson)
* Fix: Rest Params & Arrow Functions (fixes #187) (Jamund Ferguson)
* Fix: trailing commas in import/export (fixes #148) (Jamund Ferguson)
* Build: Added sudo false to Travis to build faster (fixes #177) (KahWee Teng)

v2.2.3 - July 22, 2015

* 2.2.3 (Nicholas C. Zakas)
* Fix: Incorrect error location (fixes #173) (Nicholas C. Zakas)

v2.2.2 - July 16, 2015

* 2.2.2 (Nicholas C. Zakas)
* 2.2.1 (Nicholas C. Zakas)
* Fix: Yield as identifier in arrow func args (fixes #165) (Nicholas C. Zakas)
* Fix: Allow AssignmentExpression in object spread (fixes #167) (Nicholas C. Zakas)

v2.2.1 - July 16, 2015

* 2.2.1 (Nicholas C. Zakas)

v2.2.0 - July 15, 2015

* 2.2.0 (Nicholas C. Zakas)
* New: Add experimental object rest/spread (fixes #163) (Nicholas C. Zakas)
* Fix: npm browserify (fixes #156) (Jason Laster)

v2.1.0 - July 10, 2015

* 2.1.0 (Nicholas C. Zakas)
* Fix: Leading comments for anonymous classes (fixes #155, fixes #158) (Toru Nagashima)
* New: Add newTarget option (fixes #157) (Nicholas C. Zakas)

v2.0.4 - June 26, 2015

* 2.0.4 (Nicholas C. Zakas)
* Docs: added missing `ecmaFeatures.superInFunctions` option from doc (Clément Fiorio)
* Fix: "await" is a future reserved word (fixes #151) (Jose Roberto Vidal)

v2.0.3 - June 2, 2015

* 2.0.3 (Nicholas C. Zakas)
* Fix: Incomplete Switch Statement Hangs (Fixes #146) (Jamund Ferguson)
* Docs: Clarify ecmaFeatures usage (Dan Wolff)

v2.0.2 - April 28, 2015

* 2.0.2 (Nicholas C. Zakas)
* Fix: Allow yield without value as function param (fixes #134) (Nicholas C. Zakas)
* Fix: Allow computed generators in classes (fixes #123) (Nicholas C. Zakas)
* Fix: Don't allow arrow function rest param (fixes #130) (Nicholas C. Zakas)

v2.0.1 - April 11, 2015

* 2.0.1 (Nicholas C. Zakas)
* Fix: Yield should parse without an argument (fixes #121) (Nicholas C. Zakas)

v2.0.0 - April 4, 2015

* 2.0.0 (Nicholas C. Zakas)
* Docs: Update README with latest info (Nicholas C. Zakas)
* Breaking: Use ESTree format for default params (fixes #114) (Nicholas C. Zakas)
* New: Add Super node (fixes #115) (Nicholas C. Zakas)
* Breaking: Switch to RestElement for rest args (fixes #84) (Nicholas C. Zakas)
* Docs: Correct license info on README (fixes #117) (AJ Ortega)
* Breaking: Remove guardedHandlers/handlers from try (fixes #71) (Nicholas C. Zakas)

v1.12.3 - March 28, 2015

* 1.12.3 (Nicholas C. Zakas)
* Fix: Tagged template strings (fixes #110) (Nicholas C. Zakas)

v1.12.2 - March 21, 2015

* 1.12.2 (Nicholas C. Zakas)
* Fix: Destructured arg for catch (fixes #105) (Nicholas C. Zakas)

v1.12.1 - March 21, 2015

* 1.12.1 (Nicholas C. Zakas)
* Fix: Disallow octals in template strings (fixes #96) (Nicholas C. Zakas)
* Fix: Template string parsing (fixes #95) (Nicholas C. Zakas)
* Fix: shorthand properties named get or set (fixes #100) (Brandon Mills)
* Fix: bad error in parsing invalid class setter (fixes #98) (Marsup)

v1.12.0 - March 14, 2015

* 1.12.0 (Nicholas C. Zakas)
* Fix: Update broken tests (Nicholas C. Zakas)
* New: Add sourceType to Program node (fixes #93) (Nicholas C. Zakas)
* Allow spread in more places (fixes #89) (Nicholas C. Zakas)
* Fix: Deeply nested template literals (fixes #86) (Nicholas C. Zakas)
* Fix: Allow super in classes by default (fixes #87) (Nicholas C. Zakas)
* Fix: generator methods in classes (fixes #85) (Jamund Ferguson)
* Remove XJS note from Esprima-FB incompatibilities (Joe Lencioni)

v1.11.0 - March 7, 2015

* 1.11.0 (Nicholas C. Zakas)
* Fix: Don't allow default export class by mistake (fixes #82) (Nicholas C. Zakas)
* Fix: Export default function should be FunctionDeclaration (fixes #81) (Nicholas C. Zakas)
* Fix: Ensure class declarations must have IDs outside of exports (refs #72) (Nicholas C. Zakas)
* Fix: export class expression support (refs #72) (Jamund Ferguson)
* Update: Add tests for sourceType=module (refs #72) (Nicholas C. Zakas)
* Fix: Class name should be id (fixes #78) (Nicholas C. Zakas)
* Fix: disallow import/export in functions (refs #72) (Jamund Ferguson)
* Test: strict mode enforced in modules (refs #72) (Jamund Ferguson)
* New: Add modules feature flag (refs #72) (Nicholas C. Zakas)
* merging upstream and solving conflicts for PR #43 (Caridy Patino)
* New: Add ES6 module support (fixes #35) (Caridy Patino)
* Update: Add TryStatement.handler (fixes #69) (Brandon Mills)
* Fix: Destructured Defaults (fixes #56) (Jamund Ferguson)
* Update: Refactor out comment attachment logic (Nicholas C. Zakas)

v1.10.0 - March 1, 2015

* 1.10.0 (Nicholas C. Zakas)
* New: Support ES6 classes (refs #10) (Nicholas C. Zakas)
* Docs: Update README.md (Jamund Ferguson)

v1.9.1 - February 21, 2015

* 1.9.1 (Nicholas C. Zakas)
* Fix: Allow let/const in switchcase (fixes #54) (Nicholas C. Zakas)

v1.9.0 - February 21, 2015

* 1.9.0 (Nicholas C. Zakas)
* Fix: Extend property method range and loc to include params (fixes #36) (Brandon Mills)
* New: spread operator (refs #10) (Jamund Ferguson)
* Fix: incorrectly parsed arrow fragment (refs #58) (Jamund Ferguson)
* New: Rest Parameter (refs: #10) (Jamund Ferguson)
* New: Destructuring (refs #10) (Jamund Ferguson)

v1.8.1 - February 7, 2015

* 1.8.1 (Nicholas C. Zakas)
* Build: Add Node.js 0.12 testing (Nicholas C. Zakas)
* Fix: Actuall fix tokenization issue with templates (fixes #44) (Nicholas C. Zakas)

v1.8.0 - February 6, 2015

* 1.8.0 (Nicholas C. Zakas)
* New: Support for Arrow Functions (refs #10) (Jamund Ferguson)
* New: Allow super references in functions (refs #10) (Nicholas C. Zakas)
* Update create-test.js (Jamund Ferguson)
* Fix: Tokenization for template strings (fixes #44) (Nicholas C. Zakas)
* New: Allow return in global scope (fixes #46) (Nicholas C. Zakas)

v1.7.1 - January 23, 2015

* 1.7.1 (Nicholas C. Zakas)
* Fix: When ecmaFeatures.forOf is true, check for operater is "undefined" when match keyword is "in" (fixes #39) (Peter Chanthamynavong)

v1.7.0 - January 23, 2015

* 1.7.0 (Nicholas C. Zakas)
* New: Add support for template strings (FredKSchott)
* New: Add support for default parameters (refs #10) (Jamund Ferguson)
* New: Add support for unicode code point escape sequences (FredKSchott)

v1.6.0 - January 10, 2015

* 1.6.0 (Nicholas C. Zakas)
* Update: Make comment attachment tests look at whole AST (Nicholas C. Zakas)
* Docs: Update README to reflect feature flags (Nicholas C. Zakas)
* Docs: Add a couple more FAQs to README (Nicholas C. Zakas)
* New: Add support for duplicate object literal properties (FredKSchott)
* New: Implement generators (refs #10) (Nicholas C. Zakas)

v1.5.0 - December 29, 2014

* 1.5.0 (Nicholas C. Zakas)
* Docs: Update README with compat info (Nicholas C. Zakas)
* Update: Add regex parsing test (Nicholas C. Zakas)
* Update: s/XJS/JSX/g (Nicholas C. Zakas)
* Build: Update release script (Nicholas C. Zakas)
* Update: Move SyntaxTree to ast-node-factory.js (FredKSchott)
* New: Add JSX parsing (fixes #26) (Nicholas C. Zakas)
* Update: Switch location marker logic (fixes #15) (Nicholas C. Zakas)
* 1.4.0 (Nicholas C. Zakas)

v1.4.0 - December 23, 2014

* 1.4.0 (Nicholas C. Zakas)
* Fix: Parsing issues with property methods (fixes #21) (Nicholas C. Zakas)
* New: Add support for shorthand properties (refs #10) (Nicholas C. Zakas)
* New: Add support for object literal method shorthand (refs #10) (Nicholas C. Zakas)
* Fix: Ensure comments are attached for return (fixes #2) (Nicholas C. Zakas)
* Build: Ensure CHANGELOG.md is committed on release (Nicholas C. Zakas)
* 1.3.1 (Nicholas C. Zakas)

v1.3.1 - December 22, 2014

* 1.3.1 (Nicholas C. Zakas)
* Fix: Add all files to npm package (fixes #17) (Nicholas C. Zakas)
* Update: Move Messages to separate file (Nicholas C. Zakas)
* Docs: Removed unnecessary comment (Nicholas C. Zakas)
* 1.3.0 (Nicholas C. Zakas)

v1.3.0 - December 21, 2014

* 1.3.0 (Nicholas C. Zakas)
* Build: Add release scripts (Nicholas C. Zakas)
* New: Add computed object literal properties (refs #10) (Nicholas C. Zakas)
* Build: Fix commands in Makefile.js (Nicholas C. Zakas)
* Docs: Add FAQ to README (Nicholas C. Zakas)
* Fix: Don't allow let/const in for loops (fixes #14) (Nicholas C. Zakas)
* New: Support for-of loops (refs #10) (Nicholas C. Zakas)
* Update: Change .ast.js files to .result.js files (Nicholas C. Zakas)
* New: Support ES6 octal literals (Nicholas C. Zakas)
* New: Ability to parse binary literals (Nicholas C. Zakas)
* Update: More tests for regex u flag (Nicholas C. Zakas)
* Update: Switch to using ecmaFeatures (Nicholas C. Zakas)
* Update: Add comment attachment tests (Nicholas C. Zakas)
* Update README.md (Jamund Ferguson)
* New: Add u and y regex flags (refs #10) (Nicholas C. Zakas)
* Update: Cleanup tests (Nicholas C. Zakas)
* New: Add ecmascript flag (fixes #7) (Nicholas C. Zakas)
* Docs: Update README with build commands (Nicholas C. Zakas)
* Update: Move some things around (Nicholas C. Zakas)
* Update: Read version number from package.json (Nicholas C. Zakas)
* Update: Move AST node types to separate file (Nicholas C. Zakas)
* Update: Remove duplicate file (Nicholas C. Zakas)
* Update: Move token information to a separate file (Nicholas C. Zakas)
* Update: Bring in Makefile.js for linting and browserify (Nicholas C. Zakas)
* Update: Fix ESLint warnings, remove check-version (Nicholas C. Zakas)
* Update: Move Position and SourceLocation to separate file (Nicholas C. Zakas)
* Update: Move syntax checks into separate file (Nicholas C. Zakas)
* Update: Remove UMD format (Nicholas C. Zakas)
* Docs: Update README with more info (Nicholas C. Zakas)
* Update: remove npm-debug.log from tracked files (Brandon Mills)
* Docs: Remove redundant 'features' in readme (Matthias Oßwald)
* Docs: Fix a link to Wikipedia (Ryuichi Okumura)
* Update: Split parsing tests into smaller files (Nicholas C. Zakas)
* Update: Normalize values in tests (Nicholas C. Zakas)
* Update: CommonJSify test file (Nicholas C. Zakas)
