# ANY-TO-ANY - converts numbers between bases ; binary , decimal , octal , hexadecimal and muche more ..

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

## `Limitation`

This module can convert only the integers numbers between base 2 & base 36.
**Soon, it will be possible to convert real numbers <small>[wip]</small>.**

## `Installation`

```bash
# npm ..
$ npm install any-to-any
# yarn ..
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
//  167

// NOTE: in case the input number is consists of numbers only,
// you can enter the number to the function in number type ..
const inputNumber = 1110111; // 119 in decimal
const inputBase = 2;
const outputBase = 8;
const result = convert(inputNumber, inputBase, outputBase);
console.log(result);
//  167
```

Also, we have 2 exported methods to convert a value from any base to Decimal (base 10) called `anyBaseToDecimal` and the reverse one from Decimal to any base named `decimalToAnyBase`.

> **NOTE:** There are a set of suggested examples that have been tested that you can follow [here](https://github.com/3imed-jaberi/any-to-any/blob/master/index.spec.ts).

### `Note about the new experimental convert`:

We export a new experimental method `experimentalConvert` maybe to solve problem of large numbers between hexa and decimal and up to 64 base.

You can use it with careful until we release the next major release (v5.0.0).

> Please, if you find any problem or you have suggestion to improve the experiance with this module feel free to open an issue.

#### `License`

---

[MIT](LICENSE) &copy; [Imed Jaberi](https://github.com/3imed-jaberi)
