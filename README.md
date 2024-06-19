# ANY-TO-ANY - converts numbers between bases ; binary , decimal , octal , hexadecimal and muche more ...

---

![imed-jaberi](logo.jpg)

[![Build Status][travis-badge]][travis-url] &nbsp;&nbsp;
[![Coverage Status][coveralls-badge]][coveralls-url] &nbsp;&nbsp;
[![NPM version][npm-badge]][npm-url] &nbsp;&nbsp;
[![License][license-badge]][license-url] &nbsp;&nbsp;
![Top Language][top-language-badge] &nbsp;&nbsp;
![Code Size][code-size-badge] &nbsp;&nbsp;
[![Code of Conduct][coc-badge]][coc-url] &nbsp;&nbsp;
[![PRs Welcome][pr-badge]][pr-url] &nbsp;&nbsp;

[travis-badge]: https://travis-ci.org/3imed-jaberi/any-to-any.svg?branch=master
[travis-url]: https://travis-ci.org/3imed-jaberi/any-to-any
[coveralls-badge]: https://coveralls.io/repos/github/3imed-jaberi/any-to-any/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/3imed-jaberi/any-to-any?branch=master
[npm-badge]: https://img.shields.io/npm/v/any-to-any.svg
[npm-url]: https://www.npmjs.com/package/any-to-any
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg
[license-url]: https://github.com/3imed-jaberi/any-to-any/blob/master/LICENSE
[top-language-badge]: https://img.shields.io/github/languages/top/3imed-jaberi/any-to-any
[code-size-badge]: https://img.shields.io/github/languages/code-size/3imed-jaberi/any-to-any
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg
[coc-url]: https://github.com/3imed-jaberi/any-to-any/blob/master/CODE_OF_CONDUCT.md
[pr-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: https://github.com/3imed-jaberi/any-to-any/blob/master/CONTRIBUTING.md

The purpose of this module is to convert numbers from any base to other base you want.

> This module support both CommonJS and ES Modules.

## `Limitation`

- Support only bases between 2 and 36.
- Support only integer numbers.

## `Next Feature(s)`

- Support float numbers.
- Add a chainable api (`convert().from().to()` | `convert().from().to().get()`).

## `Installation`

```bash
# npm
$ npm install any-to-any
# yarn
$ yarn add any-to-any
```

## `Usage`

This is a practical example of how to use.

```javascript
// const convert = require('any-to-any')
const { convert } = require("any-to-any");

const inputNumber = "1110111"; // 119 in decimal
const inputBase = 2;
const outputBase = 8;

const result = convert(inputNumber, inputBase, outputBase);
console.log(result);
//  "167"
```

Also, we have 2 exported methods to convert a value from any base to Decimal (base 10) called `fromAnyBaseToDecimalBase` and the reverse one from Decimal to any base named `fromDecimalBaseToAnyBase`.

### `fromAnyBaseToDecimalBase`

```javascript
// const convert = require('any-to-any')
const { fromAnyBaseToDecimalBase } = require("any-to-any");

const inputNumber = "1110111"; // 119 in decimal
const inputBase = 2;
const result = fromAnyBaseToDecimalBase(inputNumber, inputBase);
console.log(result);
//  "119"
```

### `fromDecimalBaseToAnyBase`

```javascript
// const convert = require('any-to-any')
const { fromDecimalBaseToAnyBase } = require("any-to-any");

const inputNumber = "119";
const outputBase = 2;
const result = fromDecimalBaseToAnyBase(inputNumber, outputBase);
console.log(result);
//  "1110111"
```

> **NOTE:** There are a set of suggested examples that have been tested that you can follow [here](https://github.com/3imed-jaberi/any-to-any/blob/master/index.spec.ts).

### `Note about the new experimental convert on v4.2.x`

Since we bump to v5.x.x, we remove the new experimental method `experimentalConvert` because we
resolved the problem related to large numbers due to the JS number limitation to handle only 32bit
in one shot. We use [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) for that 🤫.

> Please, if you find any problem or you have suggestion to improve the experiance with this module feel free to open an issue.

#### `License`

---

[MIT](LICENSE) &copy; [Imed Jaberi](https://github.com/3imed-jaberi)
