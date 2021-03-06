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
declare function decimalToAnyBase(iNumber: number, oBase: number): string;
/**
 * Convert from any base to base 10.
 *
 * @api public
 */
declare function anyBaseToDecimal(iNumber: string, iBase: number): number;
/**
 * Convert from any base to any base.
 *
 * @api public
 */
declare function convert(iNumber: string | number, iBase: number, oBase: number): number | string;
/**
 * Expose.
 */
export { anyBaseToDecimal, decimalToAnyBase, convert, convert as default };
