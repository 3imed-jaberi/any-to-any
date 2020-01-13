"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decimalToAnyBase = (InputNumber, OutputBase) => {
    let result = '', unitConverted, unitExtracted;
    do {
        unitExtracted = InputNumber % OutputBase;
        unitConverted = (unitExtracted >= 0 && unitExtracted <= 9) ? `${unitExtracted}` : String.fromCharCode(unitExtracted + 55);
        result = unitConverted + result;
        InputNumber = parseInt(`${InputNumber / OutputBase}`);
    } while (InputNumber !== 0);
    return result;
};
exports.decimalToAnyBase = decimalToAnyBase;
