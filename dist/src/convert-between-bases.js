"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// les nombres reels .. 
class ConvertBetweenBases {
    anyBaseToDecimal(InputNumber, InputBase) {
        let index;
        let Result = 0;
        let power = 1;
        let UnitConverted;
        for (index = InputNumber.length - 1; index >= 0; index--) {
            UnitConverted = (InputNumber.charAt(index) >= "0" && InputNumber.charAt(index) <= "9") ? parseInt(InputNumber.charAt(index)) : InputNumber.charAt(index).charCodeAt(0) - 55;
            Result += UnitConverted * power;
            power *= InputBase;
        }
        return Result;
    }
    ;
    decimalToAnyBase(InputNumber, OutputBase) {
        let Result = "";
        let UnitConverted;
        let UnitExtracted;
        do {
            UnitExtracted = InputNumber % OutputBase;
            UnitConverted = (UnitExtracted >= 0 && UnitExtracted <= 9) ? UnitExtracted.toString() : String.fromCharCode(UnitExtracted + 55);
            Result = UnitConverted + Result;
            InputNumber = parseInt((InputNumber / OutputBase).toString());
        } while (InputNumber !== 0);
        return Result;
    }
    ;
    validationsInput(InputNumber, InputBase, OutputBase) {
        if (InputNumber.charAt(0) === "-") {
            InputNumber = InputNumber.slice(1);
        }
        if (InputBase < 2 || InputBase > 36) {
            return "Error InputBase : the input base should be between 2 et 36 ..";
        }
        else if (OutputBase < 2 || OutputBase > 36) {
            return "Error OutputBase : the output base should be between 2 et 36 ..";
        }
        else if (typeof InputNumber === "string") {
            if (InputNumber.length === 0) {
                return "Error InputNumber : the input number should be not empty string ..";
            }
            else {
                let NumbersInInput = InputNumber.match(/[0-9]/g);
                let AlphabetsInInput = InputNumber.match(/[A-z]/g);
                let pointOrVerguleInInput = InputNumber.match(/(\.|\,)/g);
                if (pointOrVerguleInInput !== null) {
                    return "Error InputNumber : the input number should be Integer or not possesses < ',' or '.' >  .. ";
                }
                else if ((NumbersInInput === null && AlphabetsInInput !== null && AlphabetsInInput.length !== InputNumber.length)
                    ||
                        (NumbersInInput !== null && AlphabetsInInput === null && NumbersInInput.length !== InputNumber.length)
                    ||
                        (NumbersInInput !== null && AlphabetsInInput !== null && (AlphabetsInInput.length + NumbersInInput.length) !== InputNumber.length)) {
                    return "Error InputNumber : the input number should be not possesses special charts ..";
                }
                else {
                    for (let index = 0; index < InputNumber.length; index++) {
                        if (parseInt(InputNumber.charAt(index)) >= InputBase) {
                            return "Error InputNumber : each unit in the input number should be less than or equal the input base ..";
                        }
                    }
                }
                ;
            }
            ;
        }
        ;
        return "true";
    }
    ;
    main(InputNumber, InputBase, OutputBase) {
        if (typeof InputNumber === "string") {
            InputNumber = InputNumber.toString().toUpperCase();
        }
        let isValid = this.validationsInput(InputNumber.toString(), InputBase, OutputBase);
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
                    return signe + this.decimalToAnyBase(InputNumber, OutputBase);
                }
                else {
                    if (OutputBase === 10) {
                        return signe + this.anyBaseToDecimal(InputNumber.toString(), InputBase).toString();
                    }
                    else {
                        InputNumber = (typeof InputNumber === "string") ? this.anyBaseToDecimal(InputNumber, InputBase) : this.anyBaseToDecimal(InputNumber, InputBase);
                        return signe + this.decimalToAnyBase(InputNumber, OutputBase);
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
    }
    ;
}
;
exports.default = ConvertBetweenBases;
