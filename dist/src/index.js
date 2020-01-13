"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anyBaseToDecimal_1 = require("./anyBaseToDecimal");
const decimalToAnyBase_1 = require("./decimalToAnyBase");
const validation_1 = require("./validation");
const main = (InputNumber, InputBase, OutputBase) => {
    if (typeof InputNumber === "string") {
        InputNumber = InputNumber.toString().toUpperCase();
    }
    let isValid = validation_1.default(InputNumber.toString(), InputBase, OutputBase);
    if (isValid !== "true") {
        return isValid;
    }
    if (InputNumber.toString().length === 2 && InputNumber.toString().charAt(0) === "-" && InputNumber.toString().charAt(1) === "0") {
        return "0";
    }
    else {
        if (InputBase === OutputBase) {
            return InputNumber.toString();
        }
        else {
            let signe = "-";
            InputNumber = (typeof InputNumber === "number") ? InputNumber.toString() : InputNumber;
            if (InputNumber.charAt(0) === "-") {
                InputNumber = InputNumber.substr(1, InputNumber.length);
            }
            else {
                signe = "";
            }
            ;
            if (InputBase === 10) {
                InputNumber = (typeof InputNumber === "string") ? parseInt(InputNumber) : InputNumber;
                return signe + decimalToAnyBase_1.default(InputNumber, OutputBase);
            }
            else {
                if (OutputBase === 10) {
                    return signe + anyBaseToDecimal_1.default(InputNumber.toString(), InputBase).toString();
                }
                else {
                    InputNumber = (typeof InputNumber === "string") ? anyBaseToDecimal_1.default(InputNumber, InputBase) : anyBaseToDecimal_1.default(InputNumber, InputBase);
                    return signe + decimalToAnyBase_1.default(InputNumber, OutputBase);
                }
                ;
            }
            ;
        }
        ;
    }
    ;
};
exports.default = main;
