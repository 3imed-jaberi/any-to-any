/*!
 * any-to-any
 *
 * Copyright(c) 2019-2022 Imed Jaberi
 * MIT Licensed
 */

import 'colors'

/**
 * TODO: remove experimentalNextConvert when we fix the problem when convert large hexa number to decimal.
 *
 * INFO:
 *  convert('aa309be366a5cdd63103b657465f6f9617fbaee', 16, 10)
 *  should equal '60725777912152566396085878260777866453342730990'
 *  but return '60725777912152552488440220822060464062280464800'.
 */
import { experimentalConvert } from './experimental-convert.js'

/**
 * Utility to extract the unit to convert it.
 *
 * @api public
 */
function getUnitToConvertIt(number: string, fromDecimal?: boolean) {
  return +number >= 0 && +number <= 9
    ? +number
    : !fromDecimal
      ? number.charCodeAt(0) - 55
      : String.fromCharCode(+number + 55)
}

/**
 * Convert from base 10 to any base.
 *
 * @api public
 */
function decimalToAnyBase(iNumber: number, oBase: number): string {
  let result = ''

  while (iNumber > 0) {
    result =
      String(getUnitToConvertIt(String((iNumber % oBase).toFixed()), true)) +
      result
    iNumber = Math.floor(iNumber / oBase)
  }

  return result
}

/**
 * Convert from any base to base 10.
 *
 * @api public
 */
function anyBaseToDecimal(iNumber: string, iBase: number): number {
  // we don't need to make any convertion when we pass iBase with 10 value
  if (iBase === 10) return +iNumber

  return iNumber
    .split('')
    .reduce(
      (prevResult, currentItem, index) =>
        prevResult +
        +getUnitToConvertIt(currentItem) *
          Math.pow(iBase, iNumber.length - 1 - index),
      0
    )
}

/**
 * Utility to check passed number is on the range or not.
 *
 * @api private
 */
function isInRange(iNumber: string, iBase: number) {
  return (+iNumber - 0) * (+iNumber - (iBase - 1)) <= 0
}

/**
 * Utility to invoke the convert process.
 *
 * @api private
 */
function convertEngine(iNumber: string, iBase: number, oBase: number): string {
  // https://github.com/SeanCannon/aybabtu#32-bit-limitation
  if (iNumber.length > 32 && iBase < 10)
    return (iNumber.match(/.{1,32}/g) as string[])
      .map((chunk) => convertEngine(chunk, iBase, oBase))
      .join('')

  return iBase === oBase
    ? iNumber
    : decimalToAnyBase(anyBaseToDecimal(iNumber, iBase), oBase)
}

/**
 * Convert from any base to any base.
 *
 * @api public
 */
function convert(
  iNumber: string | number,
  iBase: number,
  oBase: number
): string {
  // force iNumber to be uppercase string
  iNumber = `${iNumber}`.toUpperCase()

  // init current sign
  let sign = ''

  // remove the 1st char if exist the '-' sign
  // and update the current sign
  if (iNumber.charAt(0) === '-') {
    sign = '-'
    iNumber = iNumber.slice(1)
  }

  // validator.
  // check if exist some special charts.
  if (iNumber.match(/[0-9A-Z]/g)?.length !== iNumber.length)
    throw new Error(
      'The input number should be not have special charts or empty.'
    )

  // check the input base.
  if (iBase < 2 || iBase > 36)
    throw new Error('The input base should be between 2 et 36.')

  // check the outbut base.
  if (oBase < 2 || oBase > 36)
    throw new Error('The output base should be between 2 et 36.')

  // TODO: work around this in the near future.
  if (iBase > 10) {
    console.warn(
      `
      Please, be careful and ensure that you pass valid input number which respect the range of the passed bases.
      The module isn't checking the range for input bases greater than 10. soony, will do!
    `.red
    )
  } else {
    const normalizediNumber = iNumber
      .split('')
      .filter((number) => isInRange(number, iBase))
      .join('')
    if (iNumber !== normalizediNumber)
      throw new Error(
        `The input number '${iNumber}' isn't on the range [0, ${iBase - 1}].`
      )
  }

  // early return when we pass 0 (0 always equal 0) - with out sign -
  if (iNumber === '0') return iNumber

  return sign + convertEngine(iNumber, iBase, oBase)
}

/**
 * Expose.
 */
export {
  anyBaseToDecimal,
  decimalToAnyBase,
  convert,
  experimentalConvert,
  convert as default,
}
