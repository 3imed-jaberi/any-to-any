/*!
 * any-to-any
 *
 * Copyright(c) 2019-2022 Imed Jaberi
 * MIT Licensed
 */

import 'colors';

/**
 * Convert from base 10 to any base.
 * 
 * @api public
 */
function decimalToAnyBase (iNumber: number, oBase: number): string { 
  let result = '', unitConverted, unitExtracted 
  
  while (iNumber !== 0) {
    unitExtracted = iNumber % oBase
    unitConverted = (unitExtracted >= 0 && unitExtracted <= 9) 
      ? `${unitExtracted}`
      : String.fromCharCode(unitExtracted + 55)
    result = unitConverted + result
    iNumber = parseInt(`${iNumber / oBase}`)
  }

  return result
}

/**
 * Convert from any base to base 10.
 * 
 * @api public
 */
function anyBaseToDecimal (iNumber: string, iBase: number): number {
  // we don't need to make any convertion when we pass iBase with 10 value
  if (iBase === 10) return +iNumber

  // otherwise, convert to base 10
  let index = iNumber.length - 1, result = 0, power = 1, unitConverted

  for (index; index >= 0; index--) {
    unitConverted = (+iNumber[index] >= 0 &&  +iNumber[index] <= 9)
      ? +iNumber[index]
      : (iNumber[index].charCodeAt(0) - 55)      
    result += unitConverted * power
    power *= iBase
  }

  return result
}

/**
 * Utility to check passed number is on the range or not.
 * 
 * @api private
 */
const isInRange = (iNumber: string, iBase: number) => ((+iNumber - 0) * (+iNumber - (iBase - 1)) <= 0)

/**
 * Utility to invoke the convert process.
 * 
 * @api private
 */
function convertEngine(iNumber: string, iBase: number, oBase: number): string {
  // early return when we pass 0 (0 always equal 0) - with out sign -
  if (iNumber === '0') return iNumber
  // https://github.com/SeanCannon/aybabtu#32-bit-limitation
  if (iNumber.length > 32)
    return (iNumber.match(/.{1,32}/g) as string[])
      .map(chunk => convertEngine(chunk, iBase, oBase))
      .join('')
  return (
    iBase === oBase
      ? iNumber
      : decimalToAnyBase(anyBaseToDecimal(iNumber, iBase), oBase)
  )
}

/**
 * Convert from any base to any base.
 * 
 * @api public
 */
function convert (iNumber: string|number, iBase: number, oBase: number): any {
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
  if(iNumber.match(/[0-9A-Z]/g)?.length !== iNumber.length)
    throw new Error('The input number should be not have special charts or empty.')

  // check the input base.
  if (iBase < 2 || iBase > 36)
    throw new Error('The input base should be between 2 et 36.')

  // check the outbut base.
  if (oBase < 2 || oBase > 36)
    throw new Error ('The output base should be between 2 et 36.')

  // TODO: work around this.
  if (iBase > 10) {
    console.warn(`
      Please, be careful and ensure that you pass valid input number which respect the range of the passed bases.
      The module isn't checking the range for input bases greater than 10. soony, will do!
    `.red)
  } else {
    const normalizediNumber = iNumber.split('').filter((number) => isInRange(number, iBase)).join('')
    if (iNumber !== normalizediNumber)
      throw new Error (`The input number '${iNumber}' isn't on the range [0, ${iBase - 1}].`)
  }

  return sign + convertEngine(iNumber, iBase, oBase)
}

/**
 * Expose.
 */
export { anyBaseToDecimal, decimalToAnyBase, convert, convert as default }
// 26.372