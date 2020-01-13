"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversion_1 = require("./conversion");
const validation_1 = require("./validation");
const Convert = (InputNumber, InputBase, OutputBase) => {
    if (typeof InputNumber === 'string') {
        InputNumber = `${InputNumber}`.toUpperCase();
    }
    let isValid = validation_1.isValidInput(`${InputNumber}`, InputBase, OutputBase);
    if (typeof isValid == 'string') {
        return isValid;
    }
    if (`${InputNumber}`.length === 2 && `${InputNumber}`.charAt(0) === '-' && `${InputNumber}`.charAt(1) === '0') {
        return '0';
    }
    else {
        if (InputBase === OutputBase) {
            return `${InputNumber}`;
        }
        else {
            let signe = '-';
            InputNumber = `${InputNumber}`;
            if (InputNumber.charAt(0) === signe) {
                InputNumber = InputNumber.substr(1, InputNumber.length);
            }
            else {
                signe = '';
            }
            ;
            if (InputBase === 10) {
                return `${signe}${conversion_1.decimalToAnyBase(+InputNumber, OutputBase)}`;
            }
            else {
                if (OutputBase === 10) {
                    return `${signe}${conversion_1.anyBaseToDecimal(`${InputNumber}`, InputBase)}`;
                }
                else {
                    return `${signe}${conversion_1.decimalToAnyBase(conversion_1.anyBaseToDecimal(`${InputNumber}`, InputBase), OutputBase)}`;
                }
                ;
            }
            ;
        }
        ;
    }
    ;
};
exports.default = Convert;
