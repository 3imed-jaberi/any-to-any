/*!
 * any-to-any
 *
 * Copyright(c) 2019-2024 Imed Jaberi
 *
 * NOTE: BigInt resolve the limitation of 32bit with number.
 * https://github.com/SeanCannon/aybabtu#32-bit-limitation
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_bitwise_operators
 *
 * MIT Licensed
 */

/**
 * Validator store, where we re-use the validation logics.
 *
 * @api private
 */
const validators = {
  checkSpecialCharts(inputNumber: string) {
    if (inputNumber.match(/[0-9A-Za-z-]/g)?.length !== inputNumber.length)
      throw new TypeError(
        "The input shouldn't have special charts or be empty."
      );
  },
  checkInputNumberRange(inputNumber: string, inputBase: number) {
    // create digits and letters separately
    const digits = Array.from({ length: 10 }, (_, i) => i);
    const letters = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );
    // concatenate digits and letters
    const baseSymbolsRef = [...digits, ...letters].join("");
    const iBaseSymbolsRef = baseSymbolsRef.substring(0, inputBase);
    const positiveInputNumber = inputNumber.startsWith("-")
      ? inputNumber.slice(1)
      : inputNumber;
    const hasOutOfRangeError = !positiveInputNumber
      .split("")
      .every((symbol) => iBaseSymbolsRef.includes(symbol));
    if (hasOutOfRangeError)
      throw new RangeError(
        `The input number '${inputNumber}' isn't on the range [0, ${
          inputBase - 1
        }].`
      );
  },
  checkBaseRange(base: number) {
    if (base < 2 || base > 36)
      throw new RangeError("The base should be between 2 et 36.");
  },
};

/**
 * Convert from base 10 to any base.
 *
 * @api public
 */
export function fromDecimalBaseToAnyBase(
  iNumberAsStr: string,
  oBase: number
): string {
  validators.checkSpecialCharts(iNumberAsStr.toString());
  validators.checkBaseRange(oBase);
  if (["0", "-0"].includes(iNumberAsStr)) return "0";

  let iNumber = BigInt(iNumberAsStr);
  const isNegative = iNumber < 0;
  iNumber = isNegative ? -iNumber : iNumber;
  const safeOutputBase = BigInt(oBase);

  let result = "";
  while (iNumber > 0n) {
    const remainder = iNumber % safeOutputBase;
    // If remainder is 10 or higher, convert it to corresponding letter
    const ascii = remainder + (remainder < 10n ? 48n : 55n);
    const char = String.fromCharCode(Number(ascii));
    result = char.concat(result);
    iNumber = iNumber / safeOutputBase;
  }

  const resultPrefix = isNegative ? "-" : "";
  return resultPrefix.concat(result);
}

/**
 * Convert from any base to base 10.
 *
 * @api public
 */
export function fromAnyBaseToDecimalBase(
  iNumber: string,
  iBase: number
): string {
  validators.checkSpecialCharts(iNumber);
  validators.checkBaseRange(iBase);
  validators.checkInputNumberRange(iNumber, iBase);
  if (["0", "-0"].includes(iNumber)) return "0";

  const isNegative = iNumber.startsWith("-");
  iNumber = isNegative ? iNumber.slice(1) : iNumber;

  const digits = Array.from(iNumber)
    .reverse()
    .map((char: string) => {
      const charCode = char.charCodeAt(0);
      if (charCode >= 48 && charCode <= 57) {
        return charCode - 48; // '0'-'9'
      } else if (charCode >= 65 && charCode <= 90) {
        return charCode - 55; // 'A'-'Z'
      } else if (charCode >= 97 && charCode <= 122) {
        return charCode - 87; // 'a'-'z'
      } else {
        throw new Error("Invalid character in the input string.");
      }
    });

  if (digits.some((digit) => digit >= iBase)) {
    throw new Error(`Invalid digit found for base ${iBase}`);
  }

  const decimalValuePrefix = isNegative ? "-" : "";

  const decimalValue = digits.reduce(
    (result, currentDigit, index) =>
      result + BigInt(currentDigit) * BigInt(iBase) ** BigInt(index),
    BigInt(0)
  );

  return decimalValuePrefix.concat(decimalValue.toString());
}

export function convert(
  iNumber: string | number,
  iBase: number,
  oBase: number
): string {
  const inputNumberAsStr = iNumber.toString();
  validators.checkSpecialCharts(inputNumberAsStr);
  validators.checkBaseRange(iBase);
  validators.checkBaseRange(oBase);
  validators.checkInputNumberRange(inputNumberAsStr, iBase);
  if (["0", "-0"].includes(inputNumberAsStr)) return "0";

  if (iBase === 10) return fromDecimalBaseToAnyBase(inputNumberAsStr, oBase);
  if (oBase === 10) return fromAnyBaseToDecimalBase(inputNumberAsStr, iBase);
  if (iBase === oBase) return inputNumberAsStr;
  return fromDecimalBaseToAnyBase(
    fromAnyBaseToDecimalBase(inputNumberAsStr, iBase),
    oBase
  );
}
