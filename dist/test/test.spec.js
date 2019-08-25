"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const index_1 = require("../index");
describe('Standard Convert Of Positive Numbers', () => {
    it('binary to binary', () => {
        chai_1.expect(index_1.default("1110", 2, 2)).to.equal("1110");
    });
    it('binary to octal', () => {
        chai_1.expect(index_1.default("1110", 2, 8)).to.equal("16");
    });
    it('binary to decimal', () => {
        chai_1.expect(index_1.default("1110", 2, 10)).to.equal("14");
    });
    it('decimal to hexadecimal', () => {
        chai_1.expect(index_1.default("1110", 2, 16)).to.equal("E");
    });
    it('octal to binary', () => {
        chai_1.expect(index_1.default("120", 8, 2)).to.equal("1010000");
    });
    it('octal to octal', () => {
        chai_1.expect(index_1.default("120", 8, 8)).to.equal("120");
    });
    it('octal to decimal', () => {
        chai_1.expect(index_1.default("120", 8, 10)).to.equal("80");
    });
    it('octal to hexadecimal', () => {
        chai_1.expect(index_1.default("120", 8, 16)).to.equal("50");
    });
    it('decimal to binary', () => {
        chai_1.expect(index_1.default(2019, 10, 2)).to.equal("11111100011");
    });
    it('decimal to octal', () => {
        chai_1.expect(index_1.default(2019, 10, 8)).to.equal("3743");
    });
    it('decimal to decimal', () => {
        chai_1.expect(index_1.default(2019, 10, 10)).to.equal("2019");
    });
    it('decimal to hexadecimal', () => {
        chai_1.expect(index_1.default(2019, 10, 16)).to.equal("7E3");
    });
    it('hexadecimal to binary', () => {
        chai_1.expect(index_1.default("150A", 16, 2)).to.equal("1010100001010");
    });
    it('hexadecimal to octal', () => {
        chai_1.expect(index_1.default("150A", 16, 8)).to.equal("12412");
    });
    it('hexadecimal to decimal', () => {
        chai_1.expect(index_1.default("150A", 16, 10)).to.equal("5386");
    });
    it('hexadecimal to hexadecimal', () => {
        chai_1.expect(index_1.default("150A", 16, 16)).to.equal("150A");
    });
});
describe('Standard Convert Of Negative Numbers', () => {
    it('binary to binary', () => {
        chai_1.expect(index_1.default("-1110", 2, 2)).to.equal("-1110");
    });
    it('binary to octal', () => {
        chai_1.expect(index_1.default("-1110", 2, 8)).to.equal("-16");
    });
    it('binary to decimal', () => {
        chai_1.expect(index_1.default("-1110", 2, 10)).to.equal("-14");
    });
    it('decimal to hexadecimal', () => {
        chai_1.expect(index_1.default("-1110", 2, 16)).to.equal("-E");
    });
    it('octal to binary', () => {
        chai_1.expect(index_1.default("-120", 8, 2)).to.equal("-1010000");
    });
    it('octal to octal', () => {
        chai_1.expect(index_1.default("-120", 8, 8)).to.equal("-120");
    });
    it('octal to decimal', () => {
        chai_1.expect(index_1.default("-120", 8, 10)).to.equal("-80");
    });
    it('octal to hexadecimal', () => {
        chai_1.expect(index_1.default("-120", 8, 16)).to.equal("-50");
    });
    it('decimal to binary', () => {
        chai_1.expect(index_1.default(-2019, 10, 2)).to.equal("-11111100011");
    });
    it('decimal to octal', () => {
        chai_1.expect(index_1.default(-2019, 10, 8)).to.equal("-3743");
    });
    it('decimal to decimal', () => {
        chai_1.expect(index_1.default(-2019, 10, 10)).to.equal("-2019");
    });
    it('decimal to hexadecimal', () => {
        chai_1.expect(index_1.default(-2019, 10, 16)).to.equal("-7E3");
    });
    it('hexadecimal to binary', () => {
        chai_1.expect(index_1.default("-150A", 16, 2)).to.equal("-1010100001010");
    });
    it('hexadecimal to octal', () => {
        chai_1.expect(index_1.default("-150A", 16, 8)).to.equal("-12412");
    });
    it('hexadecimal to decimal', () => {
        chai_1.expect(index_1.default("-150A", 16, 10)).to.equal("-5386");
    });
    it('hexadecimal to hexadecimal', () => {
        chai_1.expect(index_1.default("-150A", 16, 16)).to.equal("-150A");
    });
});
describe('Standard Errors', () => {
    it('Error : Input Base Invalid', () => {
        chai_1.expect(index_1.default("111", 1, 10)).to.equal("Error InputBase : the input base should be between 2 et 36 ..");
    });
    it('Error : Output Base Invalid', () => {
        chai_1.expect(index_1.default("111", 2, 100)).to.equal("Error OutputBase : the output base should be between 2 et 36 ..");
    });
    it('Error : Input Number Invalid - Empty', () => {
        chai_1.expect(index_1.default("", 2, 10)).to.equal("Error InputNumber : the input number should be not empty string ..");
    });
    it('Error : Input Number Invalid - Existe point or vergule', () => {
        chai_1.expect(index_1.default("1.01", 2, 10)).to.equal("Error InputNumber : the input number should be Integer or not possesses < ',' or '.' >  .. ");
    });
    it('Error : Input Number Invalid - Existe special charts', () => {
        chai_1.expect(index_1.default("14*4", 2, 10)).to.equal("Error InputNumber : the input number should be not possesses special charts ..");
    });
    it('Error : Input Number Invalid - Input not valid with Input Base', () => {
        chai_1.expect(index_1.default("114", 2, 10)).to.equal("Error InputNumber : each unit in the input number should be less than or equal the input base ..");
    });
});
