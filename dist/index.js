"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_between_bases_1 = require("./src/convert-between-bases");
function Convert(InputNumber, InputBase, OutputBase) {
    return new convert_between_bases_1.default().main(InputNumber, InputBase, OutputBase);
}
exports.Convert = Convert;
;
