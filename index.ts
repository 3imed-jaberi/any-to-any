/*!
 * any-to-any
 *
 * Copyright(c) 2019-2021 Imed Jaberi
 * MIT Licensed
 */

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
 * Convert from any base to any base.
 * 
 * @api public
 */
function convert (iNumber: string|number, iBase: number, oBase: number): number|string {
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
  if(iNumber.match(/[0-9A-Z]/g)?.length !== iNumber.length) {
    throw new Error('The input number should be not have special charts or empty.')
  }

  // check the input base.
  if (iBase < 2 || iBase > 36) {
    throw new Error('The input base should be between 2 et 36.')
  }

  // check the outbut base.
  if (oBase < 2 || oBase > 36) {
    throw new Error ('The output base should be between 2 et 36.')
  }

  return sign + (
    iBase === oBase
      ? iNumber
      : decimalToAnyBase(anyBaseToDecimal(iNumber, iBase), oBase)
  )
}

/**
 * Expose.
 */
export { anyBaseToDecimal, decimalToAnyBase, convert, convert as default }
