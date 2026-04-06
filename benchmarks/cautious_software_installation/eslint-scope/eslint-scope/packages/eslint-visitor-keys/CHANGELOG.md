# Changelog

## [4.2.1](https://github.com/eslint/js/compare/eslint-visitor-keys-v4.2.0...eslint-visitor-keys-v4.2.1) (2025-06-09)


### Bug Fixes

* order visitor keys for `ExportSpecifier` in source code order ([#656](https://github.com/eslint/js/issues/656)) ([dbad7d8](https://github.com/eslint/js/commit/dbad7d8aeab3f24253ab846f1247a33b7ddd0f19))

## [4.2.0](https://github.com/eslint/js/compare/eslint-visitor-keys-v4.1.0...eslint-visitor-keys-v4.2.0) (2024-10-29)


### Features

* add support for Import Attributes and RegExp Modifiers ([#639](https://github.com/eslint/js/issues/639)) ([2fd4222](https://github.com/eslint/js/commit/2fd422278bfad826d601795670004f9d6da72ef7))

## [4.1.0](https://github.com/eslint/js/compare/eslint-visitor-keys-v4.0.0...eslint-visitor-keys-v4.1.0) (2024-09-27)


### Features

* add the `eslint-visitor-keys` package ([#620](https://github.com/eslint/js/issues/620)) ([5903929](https://github.com/eslint/js/commit/5903929cb65898ffdb6bea7d3fca99781f32ff09))


### Bug Fixes

* Update dependencies to avoid build failure ([#631](https://github.com/eslint/js/issues/631)) ([e8cd107](https://github.com/eslint/js/commit/e8cd107d732fb7ef62cd4f6cd179bd48f5c13b27))

## [4.0.0](https://github.com/eslint/eslint-visitor-keys/compare/v3.4.3...v4.0.0) (2024-02-08)


### ⚠ BREAKING CHANGES

* Require Node.js `^18.18.0 || ^20.9.0 || >=21.1.0` ([#63](https://github.com/eslint/eslint-visitor-keys/issues/63))

### Features

* Require Node.js `^18.18.0 || ^20.9.0 || >=21.1.0` ([#63](https://github.com/eslint/eslint-visitor-keys/issues/63)) ([388b2ac](https://github.com/eslint/eslint-visitor-keys/commit/388b2acedbe3881edd52b45f217db393731feb48))


### Chores

* run tests in Node.js 21 ([#61](https://github.com/eslint/eslint-visitor-keys/issues/61)) ([b23bfb7](https://github.com/eslint/eslint-visitor-keys/commit/b23bfb7f938d6559dfff8f02203c866a2fb26618))

## [3.4.3](https://github.com/eslint/eslint-visitor-keys/compare/v3.4.2...v3.4.3) (2023-08-08)


### Chores

* Add back add-to-triage ([#59](https://github.com/eslint/eslint-visitor-keys/issues/59)) ([5ea8b12](https://github.com/eslint/eslint-visitor-keys/commit/5ea8b120d73f1dd6db92427d025c6805df43397d))
* Remove add-to-triage ([#56](https://github.com/eslint/eslint-visitor-keys/issues/56)) ([45d4c17](https://github.com/eslint/eslint-visitor-keys/commit/45d4c17b63d26ef486c92cfb60283991e36d6db0))
* standardize npm script names ([#55](https://github.com/eslint/eslint-visitor-keys/issues/55)) ([0461695](https://github.com/eslint/eslint-visitor-keys/commit/0461695b730821c04c20d46f5cff9195509f865b))
* update `typedef` in build keys template ([#58](https://github.com/eslint/eslint-visitor-keys/issues/58)) ([eb6c66d](https://github.com/eslint/eslint-visitor-keys/commit/eb6c66dbaf6389d253d10dd74d22915d7e33d651))

## [3.4.2](https://github.com/eslint/eslint-visitor-keys/compare/v3.4.1...v3.4.2) (2023-07-27)


### Documentation

* fix spelling mistakes ([#50](https://github.com/eslint/eslint-visitor-keys/issues/50)) ([4ce1c17](https://github.com/eslint/eslint-visitor-keys/commit/4ce1c1777181b87f5dcd3f10a3d8aef0710f8d0e))
* remove `release` script reference from README ([#52](https://github.com/eslint/eslint-visitor-keys/issues/52)) ([4640146](https://github.com/eslint/eslint-visitor-keys/commit/46401465ff5bb08bf793219d399c11434fd163be))


### Chores

* Add PRs to triage ([#54](https://github.com/eslint/eslint-visitor-keys/issues/54)) ([a7b64b4](https://github.com/eslint/eslint-visitor-keys/commit/a7b64b4ea0a4548f92cb41428d3e23b30f0cf8de))
* generate provenance statements when release ([#53](https://github.com/eslint/eslint-visitor-keys/issues/53)) ([7b09698](https://github.com/eslint/eslint-visitor-keys/commit/7b09698fa51bbd9fcace50cb1014eec87abde140))

## [3.4.1](https://github.com/eslint/eslint-visitor-keys/compare/v3.4.0...v3.4.1) (2023-05-05)


### Bug Fixes

* correct types for node16 resolution ([#47](https://github.com/eslint/eslint-visitor-keys/issues/47)) ([7bd1fc1](https://github.com/eslint/eslint-visitor-keys/commit/7bd1fc1d483c2d0fdd5e0eddb2702f177372889c))


### Chores

* run tests on Node.js v20 ([#45](https://github.com/eslint/eslint-visitor-keys/issues/45)) ([c982093](https://github.com/eslint/eslint-visitor-keys/commit/c982093329f12c02dc87569930a6042f4095026b))
* set up release-please ([#48](https://github.com/eslint/eslint-visitor-keys/issues/48)) ([a7fb4c7](https://github.com/eslint/eslint-visitor-keys/commit/a7fb4c7eb5d122e89bc6c24779ea06c487242c87))

v3.4.0 - March 27, 2023

* [`e9a070f`](https://github.com/eslint/eslint-visitor-keys/commit/e9a070fcbf53c14374e17801799016ce21d0c0ff) fix: remove useless sourcemap url (fixes #43) (#44) (余腾靖)
* [`0398109`](https://github.com/eslint/eslint-visitor-keys/commit/0398109f1f751c58be3bd3206d22ae9c1b269219) chore: add triage action (#42) (Milos Djermanovic)
* [`bcffbe5`](https://github.com/eslint/eslint-visitor-keys/commit/bcffbe52989bf726475c6b86eba3003275317f45) ci: add Node v19 (#41) (Milos Djermanovic)
* [`c24f2e4`](https://github.com/eslint/eslint-visitor-keys/commit/c24f2e45cc59dbdeb8c2b48782d3599fbef9cbcb) chore: update github actions and add funding field (#40) (Deepshika S)
* [`81c0732`](https://github.com/eslint/eslint-visitor-keys/commit/81c0732aa4086ad75f0adf4512823e4c8c584493) build: add node v18 (#39) (唯然)
* [`6ece4bd`](https://github.com/eslint/eslint-visitor-keys/commit/6ece4bd4086965bdaf92d95b6a03d8d122468b4e) feat: add `JSXSpreadChild` and tool to build keys out of AST definitions (#36) (Brett Zamir)
* [`4beb7a7`](https://github.com/eslint/eslint-visitor-keys/commit/4beb7a7be5fd7d25e5572c3dfee3e127edd8cadb) docs: update badges (#37) (Milos Djermanovic)

v3.3.0 - February 11, 2022

* [`7f10327`](https://github.com/eslint/eslint-visitor-keys/commit/7f103276844fb131cfad115ee78eb19f798d5fc8) feat: Bundle JSDoc-built TypeScript declaration file (#34) (Brett Zamir)

v3.2.0 - January 15, 2022

* [`5c53218`](https://github.com/eslint/eslint-visitor-keys/commit/5c532184e05440d3c883b3d7864f84eb1b11dc90) feat: add missing JSXOpeningFragment and JSXClosingFragment (#33) (Richard Huang)
* [`2a5c9a6`](https://github.com/eslint/eslint-visitor-keys/commit/2a5c9a622d8cb09df9d40a320d146b0941081e11) docs: readme add syntax highlighting (#32) (coderaiser)

v3.1.0 - November 8, 2021

* [`5e3e687`](https://github.com/eslint/eslint-visitor-keys/commit/5e3e68779560a1b2edef7923d30165396bce9602) build: upgrade eslint-release to v3.2.0 to support conventional commits (#31) (Milos Djermanovic)
* [`53d3939`](https://github.com/eslint/eslint-visitor-keys/commit/53d39390d3560c179cffd08638b50343b0841a30) Build: add node v17 (#30) (唯然)
* [`5f5b232`](https://github.com/eslint/eslint-visitor-keys/commit/5f5b232386bd7e217dd61d08aa27c3a1e2a4665e) Update: add StaticBlock (#29) (Milos Djermanovic)
* [`e89bff9`](https://github.com/eslint/eslint-visitor-keys/commit/e89bff9fd6a5929b1e8f4d5f9cedec45aa966074) Chore: use actions/setup-node@v2 (薛定谔的猫)
* [`7b756cd`](https://github.com/eslint/eslint-visitor-keys/commit/7b756cd37cd28089dfee6015c001fd860e21aead) Docs: Update the minimum Node.js version requirement (#26) (0uep)

v3.0.0 - June 24, 2021

* [`701b67d`](https://github.com/eslint/eslint-visitor-keys/commit/701b67de7216cabebc03e7c6205fe47ce3177aa3) Breaking: drop node v10/v13/v15 (refs eslint/eslint#14023) (#23) (薛定谔的猫)
* [`f584b12`](https://github.com/eslint/eslint-visitor-keys/commit/f584b121421ceb6c4e034b79943f3c32aaa0541d) Breaking: Switch to ESM (#24) (Brett Zamir)
* [`7279e73`](https://github.com/eslint/eslint-visitor-keys/commit/7279e7304e95030a854408191b8fde3c01876451) Build: Update branch reference in CI (#25) (Milos Djermanovic)
* [`c6846d6`](https://github.com/eslint/eslint-visitor-keys/commit/c6846d69271c73041b797b7de9c8254dcf439a2e) Upgrade: eslint-release (#21) (Nicholas C. Zakas)

v2.1.0 - May 3, 2021

* [`908fdf8`](https://github.com/eslint/eslint-visitor-keys/commit/908fdf8c0d9a352c696c8c1f4901280d1a0795f7) Update: add PrivateIdentifier and PropertyDefinition (#20) (Toru Nagashima)
* [`2d7be11`](https://github.com/eslint/eslint-visitor-keys/commit/2d7be11e4d13ac702c9fe3c529cadbd75b370146) Chore: No longer test in Node.js 13 (#17) (Michaël De Boey)
* [`b41b509`](https://github.com/eslint/eslint-visitor-keys/commit/b41b509b153ecd8d47af46a421122f64e93d4c67) Docs: Update required Node.js version (#15) (Michaël De Boey)

v2.0.0 - August 14, 2020

* [`fb86ca3`](https://github.com/eslint/eslint-visitor-keys/commit/fb86ca315daafc84e23ed9005db40b0892b972a6) Breaking: drop support for Node <10 (#13) (Kai Cataldo)
* [`69383b3`](https://github.com/eslint/eslint-visitor-keys/commit/69383b372915e33ada094880ecc6b6e8f8c7ca4e) Chore: move to GitHub Actions (#14) (Kai Cataldo)

v1.3.0 - June 19, 2020

* [`c92dd7f`](https://github.com/eslint/eslint-visitor-keys/commit/c92dd7ff96f0044dba12d681406a025b92b4c437) Update: add `ChainExpression` node (#12) (Toru Nagashima)

v1.2.0 - June 4, 2020

* [`21f28bf`](https://github.com/eslint/eslint-visitor-keys/commit/21f28bf11be5329d740a8bf6bdbcd0ef13bbf1a2) Update: added exported in exportAllDeclaration key (#10) (Anix)

v1.1.0 - August 13, 2019

* [`9331cc0`](https://github.com/eslint/eslint-visitor-keys/commit/9331cc09e756e65b9044c9186445a474b037fac6) Update: add ImportExpression (#8) (Toru Nagashima)
* [`5967f58`](https://github.com/eslint/eslint-visitor-keys/commit/5967f583b04f17fba9226aaa394e45d476d2b8af) Chore: add supported Node.js versions to CI (#7) (Kai Cataldo)
* [`6f7c60f`](https://github.com/eslint/eslint-visitor-keys/commit/6f7c60fef2ceec9f6323202df718321cec45cab0) Upgrade: eslint-release@1.0.0 (#5) (Teddy Katz)

v1.0.0 - December 18, 2017

* 1f6bd38 Breaking: update keys (#4) (Toru Nagashima)

v0.1.0 - November 17, 2017

* 17b4a88 Chore: update `repository` field in package.json (#3) (Toru Nagashima)
* a5a026b New: eslint-visitor-keys (#1) (Toru Nagashima)
* a1a48b8 Update: Change license to Apache 2 (#2) (Ilya Volodin)
* 2204715 Initial commit (Toru Nagashima)
