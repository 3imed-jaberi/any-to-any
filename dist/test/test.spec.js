"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const index_1 = require("../index");
const constants_1 = require("../src/constants");
describe('Standard Convert Of Positive Numbers', () => {
    it('binary to binary', () => {
        chai_1.expect(index_1.default('1110', 2, 2)).to.equal('1110');
    });
    it('binary to octal', () => {
        chai_1.expect(index_1.default('1110', 2, 8)).to.equal('16');
    });
    it('binary to decimal', () => {
        chai_1.expect(index_1.default('1110', 2, 10)).to.equal('14');
    });
    it('decimal to hexadecimal', () => {
        chai_1.expect(index_1.default('1110', 2, 16)).to.equal('E');
    });
    it('octal to binary', () => {
        chai_1.expect(index_1.default('120', 8, 2)).to.equal('1010000');
    });
    it('octal to octal', () => {
        chai_1.expect(index_1.default('120', 8, 8)).to.equal('120');
    });
    it('octal to decimal', () => {
        chai_1.expect(index_1.default('120', 8, 10)).to.equal('80');
    });
    it('octal to hexadecimal', () => {
        chai_1.expect(index_1.default('120', 8, 16)).to.equal('50');
    });
    it('decimal to binary', () => {
        chai_1.expect(index_1.default(2019, 10, 2)).to.equal('11111100011');
    });
    it('decimal to octal', () => {
        chai_1.expect(index_1.default(2019, 10, 8)).to.equal('3743');
    });
    it('decimal to decimal', () => {
        chai_1.expect(index_1.default(2019, 10, 10)).to.equal('2019');
    });
    it('decimal to hexadecimal', () => {
        chai_1.expect(index_1.default(2019, 10, 16)).to.equal('7E3');
    });
    it('hexadecimal to binary', () => {
        chai_1.expect(index_1.default('150A', 16, 2)).to.equal('1010100001010');
    });
    it('hexadecimal to octal', () => {
        chai_1.expect(index_1.default('150A', 16, 8)).to.equal('12412');
    });
    it('hexadecimal to decimal', () => {
        chai_1.expect(index_1.default('150A', 16, 10)).to.equal('5386');
    });
    it('hexadecimal to hexadecimal', () => {
        chai_1.expect(index_1.default('150A', 16, 16)).to.equal('150A');
    });
});
describe('Standard Convert Of Negative Numbers', () => {
    it('binary to binary', () => {
        chai_1.expect(index_1.default('-1110', 2, 2)).to.equal('-1110');
    });
    it('binary to octal', () => {
        chai_1.expect(index_1.default('-1110', 2, 8)).to.equal('-16');
    });
    it('binary to decimal', () => {
        chai_1.expect(index_1.default('-1110', 2, 10)).to.equal('-14');
    });
    it('decimal to hexadecimal', () => {
        chai_1.expect(index_1.default('-1110', 2, 16)).to.equal('-E');
    });
    it('octal to binary', () => {
        chai_1.expect(index_1.default('-120', 8, 2)).to.equal('-1010000');
    });
    it('octal to octal', () => {
        chai_1.expect(index_1.default('-120', 8, 8)).to.equal('-120');
    });
    it('octal to decimal', () => {
        chai_1.expect(index_1.default('-120', 8, 10)).to.equal('-80');
    });
    it('octal to hexadecimal', () => {
        chai_1.expect(index_1.default('-120', 8, 16)).to.equal('-50');
    });
    it('decimal to binary', () => {
        chai_1.expect(index_1.default(-2019, 10, 2)).to.equal('-11111100011');
    });
    it('decimal to octal', () => {
        chai_1.expect(index_1.default(-2019, 10, 8)).to.equal('-3743');
    });
    it('decimal to decimal', () => {
        chai_1.expect(index_1.default(-2019, 10, 10)).to.equal('-2019');
    });
    it('decimal to hexadecimal', () => {
        chai_1.expect(index_1.default(-2019, 10, 16)).to.equal('-7E3');
    });
    it('hexadecimal to binary', () => {
        chai_1.expect(index_1.default('-150A', 16, 2)).to.equal('-1010100001010');
    });
    it('hexadecimal to octal', () => {
        chai_1.expect(index_1.default('-150A', 16, 8)).to.equal('-12412');
    });
    it('hexadecimal to decimal', () => {
        chai_1.expect(index_1.default('-150A', 16, 10)).to.equal('-5386');
    });
    it('hexadecimal to hexadecimal', () => {
        chai_1.expect(index_1.default('-150A', 16, 16)).to.equal('-150A');
    });
});
describe('Standard Errors', () => {
    it('Error : Input Base Invalid', () => {
        chai_1.expect(() => index_1.default('111', 1, 10)).to.throw(new Error(constants_1.__Error_InputBase__).message);
    });
    it('Error : Output Base Invalid', () => {
        chai_1.expect(() => index_1.default('111', 2, 100)).to.throw(new Error(constants_1.__Error_OutputBase__).message);
    });
    it('Error : Input Number Invalid - Empty', () => {
        chai_1.expect(() => index_1.default('', 2, 10)).to.throw(new Error(constants_1.__Error_InputNumber_Size__).message);
    });
    it('Error : Input Number Invalid - Existe point or vergule', () => {
        chai_1.expect(() => index_1.default('1.01', 2, 10)).to.throw(new Error(constants_1.__Error_InputNumber_Int__).message);
    });
    it('Error : Input Number Invalid - Existe special charts', () => {
        chai_1.expect(() => index_1.default('14*4', 2, 10)).to.throw(new Error(constants_1.__Error_InputNumber_Not_Special_Charts__).message);
    });
    it('Error : Input Number Invalid - Input not valid with Input Base', () => {
        chai_1.expect(() => index_1.default('114', 2, 10)).to.throw(new Error(constants_1.__Error_InputNumber_Less_Than_InputBase__).message);
    });
});
