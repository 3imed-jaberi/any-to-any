"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anyBaseToDecimal = (InputNumber, InputBase) => {
    let index = InputNumber.length - 1, result = 0, power = 1, unitConverted;
    for (index; index >= 0; index--) {
        unitConverted = (InputNumber.charAt(index) >= '0'
            &&
                InputNumber.charAt(index) <= '9') ?
            parseInt(InputNumber.charAt(index))
            :
                InputNumber.charAt(index).charCodeAt(0) - 55;
        result += unitConverted * power;
        power *= InputBase;
    }
    return result;
};
exports.default = anyBaseToDecimal;
