import 'mocha'
import { expect } from 'chai'

import { convert, anyBaseToDecimal, decimalToAnyBase, experimentalConvert } from '.'

type TestCasesKey = 'binary'|'octal'|'decimal'|'hexadecimal' 
type TestCasesValue = [string|number, number, number, string][]
const basesTestCases: Record<TestCasesKey,TestCasesValue> = {
  binary: [
    // positive
    ['1110', 2, 2, '1110'],
    ['1110', 2, 8, '16'],
    ['1110', 2, 10, '14'],
    ['1110', 2, 16, 'E'],
    // negative
    ['-1110', 2, 2, '-1110'],
    ['-1110', 2, 8, '-16'],
    ['-1110', 2, 10, '-14'],
    ['-1110', 2, 16, '-E']
  ],
  octal: [
    // positive
    ['120', 8, 2, '1010000'],
    ['120', 8, 8, '120'],
    ['120', 8, 10, '80'],
    ['120', 8, 16, '50'],
    // negative
    ['-120', 8, 2, '-1010000'],
    ['-120', 8, 8, '-120'],
    ['-120', 8, 10, '-80'],
    ['-120', 8, 16, '-50']
  ],
  decimal: [
    // positive
    [2019, 10, 2, '11111100011'],
    [2019, 10, 8, '3743'],
    [2019, 10, 10, '2019'],
    [2019, 10, 16, '7E3'],
    // negative
    [-2019, 10, 2, '-11111100011'],
    [-2019, 10, 8, '-3743'],
    [-2019, 10, 10, '-2019'],
    [-2019, 10, 16, '-7E3']
  ],
  hexadecimal: [
    // positive
    ['150A', 16, 2, '1010100001010'],
    ['150A', 16, 8, '12412'],
    ['150A', 16, 10, '5386'],
    ['150A', 16, 16, '150A'],
    // ['AA', 16, 10, '170'],
    // negative
    ['-150A', 16, 2, '-1010100001010'],
    ['-150A', 16, 8, '-12412'],
    ['-150A', 16, 10, '-5386'],
    ['-150A', 16, 16, '-150A']
  ]
}

describe('any-to-any', () => {
  it('should export convert correcty', () => {
    expect(convert).to.not.be.undefined
  })

  it('should export anyBaseToDecimal correcty', () => {
    expect(anyBaseToDecimal).to.not.be.undefined
  })

  it('should export decimalToAnyBase correcty', () => {
    expect(decimalToAnyBase).to.not.be.undefined
  })

  it('should export experimentalConvert correcty', () => {
    expect(experimentalConvert).to.not.be.undefined
  })
  
  it('should early exist and return 0 over empty string when pass 0 as input number', () => {
    expect(convert('0', 10, 36)).to.equal('0')
  })

  it('should early exist and return 0 over empty string when pass 0 with - symbol as input number', () => {
    expect(convert('-0', 10, 36)).to.equal('0')
  })

  Object
    .keys(basesTestCases)
    .forEach(base =>
      describe(base, () =>
        basesTestCases[base as TestCasesKey]
          .forEach(([iNumber, iBase, oBase, result]) => 
            it(`should convert ${base} to ${oBase} (${iNumber.toString().startsWith('-') ? '-' : '+'}) correctly`, () =>
              expect(convert(iNumber, iBase, oBase)).to.equal(result)
            )
          )
      )
    )

  it('should handle large input value correctly for all input bases under 10 (length > 32)', () => {
    expect(convert('11111011000001010011100101111001010001110011100011011010', 2, 16))
      .to.equal('FB0539794738DA')
  })
  
  describe('errors', () => {
    it('should throw when pass invalid input base', () => {
      expect(() => convert('111', 1, 10))
        .to.throw(/The input base should be between 2 et 36./)
    })
  
    it('should throw when pass invalid output base', () => {
      expect(() => convert('111', 2, 100))
        .to.throw(/The output base should be between 2 et 36./)
    })
  
    it('should throw when pass an empty input number', () => {
      expect(() => convert('', 2, 10))
        .to.throw(/The input number should be not have special charts or empty./)
    })
  
    it('should throw when pass an input number have special charts', () => {
      expect(() => convert('14*4', 2, 10))
        .to.throw(/The input number should be not have special charts or empty./)
    })
  
    it('should throw when pass an input number out of range', () => {
      expect(() => convert('23942394234', 2, 16))
        .to.throw(`The input number '23942394234' isn't on the range [0, 1].`)
    })
  })
})
