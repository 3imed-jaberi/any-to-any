/*!
 * any-to-any
 *
 * Copyright(c) 2019-2021 Imed Jaberi
 * MIT Licensed
 */

import { anyBaseToDecimal , decimalToAnyBase } from './conversion';
import { useValidation } from './validation';

function Convert (
  inputNumber: string|number,
  inputBase: number,
  outputBase: number
) {
  // force inputNumber to be uppercase string
  inputNumber = `${inputNumber}`.toUpperCase();

  // init current sign
  let sign = '';

  // remove the 1st char if exist the '-' sign
  // and update the current sign
  if (inputNumber.charAt(0) === '-') {
    sign = '-';
    inputNumber = inputNumber.slice(1);
  }

  // apply all validation rules
  const [isValid, msgError] = useValidation(
    inputNumber,
    inputBase,
    outputBase
  );

  if (!isValid) {
    throw new Error(msgError)
  }

  return sign + (
    inputBase === outputBase
      ? inputNumber
      : decimalToAnyBase(
          anyBaseToDecimal(inputNumber, inputBase),
          outputBase
        )
  )
};

export {
  Convert,
  Convert as default
};

// For CommonJS default export support 
module.exports = Convert;
module.exports.Convert = Convert;
module.exports.default = Convert;
