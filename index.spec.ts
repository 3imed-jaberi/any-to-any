import 'mocha'
import { expect } from 'chai'
import { convert } from '.'

describe('Standard Convert Of Positive Numbers', () => {
  it('should return 0 not empty string', () => {
    expect(convert('0', 10, 36)).to.equal('0')
  })

  it('binary to binary', () => {
    expect(convert('1110', 2, 2)).to.equal('1110')
  })

  it('binary to octal', () => {
    expect(convert('1110', 2, 8)).to.equal('16')
  })

  it('binary to decimal', () => {
    expect(convert('1110', 2, 10)).to.equal('14')
  })

  it('decimal to hexadecimal', () => {
    expect(convert('1110', 2, 16)).to.equal('E')
  })

  it('octal to binary', () => {
    expect(convert('120', 8, 2)).to.equal('1010000')
  })

  it('octal to octal', () => {
    expect(convert('120', 8, 8)).to.equal('120')
  })

  it('octal to decimal', () => {
    expect(convert('120', 8, 10)).to.equal('80')
  })

  it('octal to hexadecimal', () => {
    expect(convert('120', 8, 16)).to.equal('50')
  })

  it('decimal to binary', () => {
    expect(convert(2019, 10, 2)).to.equal('11111100011')
  })

  it('decimal to octal', () => {
    expect(convert(2019, 10, 8)).to.equal('3743')
  })

  it('decimal to decimal', () => {
    expect(convert(2019, 10, 10)).to.equal('2019')
  })

  it('decimal to hexadecimal', () => {
    expect(convert(2019, 10, 16)).to.equal('7E3')
  })

  it('hexadecimal to binary', () => {
    expect(convert('150A', 16, 2)).to.equal('1010100001010')
  })

  it('hexadecimal to octal', () => {
    expect(convert('150A', 16, 8)).to.equal('12412')
  })

  it('hexadecimal to decimal', () => {
    expect(convert('150A', 16, 10)).to.equal('5386')
  })

  it('hexadecimal to hexadecimal', () => {
    expect(convert('150A', 16, 16)).to.equal('150A')
  })

  it('pure hexadecimal to decimal', () => {
    expect(convert('AA', 16, 10)).to.equal('170')
  })
})

describe('Standard Convert Of Negative Numbers', () => {
  it('should return 0 not empty string', () => {
    expect(convert('-0', 10, 36)).to.equal('0')
  })

  it('binary to binary', () => {
    expect(convert('-1110', 2, 2)).to.equal('-1110')
  })

  it('binary to octal', () => {
    expect(convert('-1110', 2, 8)).to.equal('-16')
  })

  it('binary to decimal', () => {
    expect(convert('-1110', 2, 10)).to.equal('-14')
  })

  it('decimal to hexadecimal', () => {
    expect(convert('-1110', 2, 16)).to.equal('-E')
  })

  it('octal to binary', () => {
    expect(convert('-120', 8, 2)).to.equal('-1010000')
  })

  it('octal to octal', () => {
    expect(convert('-120', 8, 8)).to.equal('-120')
  })

  it('octal to decimal', () => {
    expect(convert('-120', 8, 10)).to.equal('-80')
  })

  it('octal to hexadecimal', () => {
    expect(convert('-120', 8, 16)).to.equal('-50')
  })

  it('decimal to binary', () => {
    expect(convert(-2019, 10, 2)).to.equal('-11111100011')
  })

  it('decimal to octal', () => {
    expect(convert(-2019, 10, 8)).to.equal('-3743')
  })

  it('decimal to decimal', () => {
    expect(convert(-2019, 10, 10)).to.equal('-2019')
  })

  it('decimal to hexadecimal', () => {
    expect(convert(-2019, 10, 16)).to.equal('-7E3')
  })

  it('hexadecimal to binary', () => {
    expect(convert('-150A', 16, 2)).to.equal('-1010100001010')
  })

  it('hexadecimal to octal', () => {
    expect(convert('-150A', 16, 8)).to.equal('-12412')
  })

  it('hexadecimal to decimal', () => {
    expect(convert('-150A', 16, 10)).to.equal('-5386')
  })

  it('hexadecimal to hexadecimal', () => {
    expect(convert('-150A', 16, 16)).to.equal('-150A')
  })
})

describe('Standard Errors', () => {
  it('input base invalid', () => {
    expect(() => convert('111', 1, 10))
      .to
      .throw(/The input base should be between 2 et 36./)
  })

  it('output base invalid', () => {
    expect(() => convert('111', 2, 100))
      .to
      .throw(/The output base should be between 2 et 36./)
  })

  it('input number invalid ~ empty', () => {
    expect(() => convert('', 2, 10))
      .to
      .throw(/The input number should be not have special charts or empty./)
  })

  it('input number invalid ~ existe special charts', () => {
    expect(() => convert('14*4', 2, 10))
    .to
    .throw(/The input number should be not have special charts or empty./)
  })
})