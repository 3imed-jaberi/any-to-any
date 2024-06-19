import { describe, it } from "node:test";
import * as assert from "node:assert";

import {
  convert,
  fromAnyBaseToDecimalBase,
  fromDecimalBaseToAnyBase,
} from "./index";

type TestCasesKey = "binary" | "octal" | "decimal" | "hexadecimal";
type TestCasesValue = [string | number, number, number, string][];
const basesTestCases: Record<TestCasesKey, TestCasesValue> = {
  binary: [
    // positive
    ["1110", 2, 2, "1110"],
    ["1110", 2, 8, "16"],
    ["1110", 2, 10, "14"],
    ["1110", 2, 16, "E"],
    // negative
    ["-1110", 2, 2, "-1110"],
    ["-1110", 2, 8, "-16"],
    ["-1110", 2, 10, "-14"],
    ["-1110", 2, 16, "-E"],
  ],
  octal: [
    // positive
    ["120", 8, 2, "1010000"],
    ["120", 8, 8, "120"],
    ["120", 8, 10, "80"],
    ["120", 8, 16, "50"],
    // negative
    ["-120", 8, 2, "-1010000"],
    ["-120", 8, 8, "-120"],
    ["-120", 8, 10, "-80"],
    ["-120", 8, 16, "-50"],
  ],
  decimal: [
    // positive
    [2019, 10, 2, "11111100011"],
    [2019, 10, 8, "3743"],
    [2019, 10, 10, "2019"],
    [2019, 10, 16, "7E3"],
    // negative
    [-2019, 10, 2, "-11111100011"],
    [-2019, 10, 8, "-3743"],
    [-2019, 10, 10, "-2019"],
    [-2019, 10, 16, "-7E3"],
  ],
  hexadecimal: [
    // positive
    ["150A", 16, 2, "1010100001010"],
    ["150A", 16, 8, "12412"],
    ["150A", 16, 10, "5386"],
    ["150A", 16, 16, "150A"],
    // ['AA', 16, 10, '170'],
    // negative
    ["-150A", 16, 2, "-1010100001010"],
    ["-150A", 16, 8, "-12412"],
    ["-150A", 16, 10, "-5386"],
    ["-150A", 16, 16, "-150A"],
  ],
};

describe("any-to-any", () => {
  describe("convert utility", () => {
    it("should export convert utility correcty", () => {
      assert.strict(typeof convert !== "undefined");
    });

    it("should the convert utility early exist and return 0 over empty string when pass 0 as input number", () => {
      assert.strictEqual(convert("0", 10, 36), "0");
    });

    it("should the convert utility early exist and return 0 over empty string when pass 0 with - symbol as input number", () => {
      assert.strictEqual(convert("-0", 10, 36), "0");
    });

    Object.keys(basesTestCases).forEach((base) =>
      describe(base, () =>
        basesTestCases[base as TestCasesKey].forEach(
          ([iNumber, iBase, oBase, result]) => {
            it(`should convert ${base} to ${oBase} (${
              iNumber.toString().startsWith("-") ? "-" : "+"
            }) correctly`, () => {
              assert.strictEqual(convert(iNumber, iBase, oBase), result);
            });
          }
        )
      )
    );

    it("should the convert utility handle large input value correctly for all input bases under 10 (length > 32)", () => {
      assert.strictEqual(
        convert(
          "11111011000001010011100101111001010001110011100011011010",
          2,
          16
        ),
        "FB0539794738DA"
      );
    });

    describe("errors", () => {
      it("should the convert utility throw when pass invalid input base", () => {
        assert.throws(
          () => convert("111", 1, 10),
          /The base should be between 2 et 36./
        );
      });

      it("should the convert utility throw when pass invalid output base", () => {
        assert.throws(
          () => convert("111", 2, 100),
          /The base should be between 2 et 36./
        );
      });

      it("should the convert utility throw when pass an empty input number", () => {
        assert.throws(
          () => convert("", 2, 10),
          /The input shouldn't have special charts or be empty./
        );
      });

      it("should the convert utility throw when pass an input number have special charts", () => {
        assert.throws(
          () => convert("14*4", 2, 10),
          /The input shouldn't have special charts or be empty./
        );
      });

      it("should the convert utility throw when pass an input number out of range", () => {
        assert.throws(
          () => convert("23942394234", 2, 16),
          /The input number '23942394234' isn't on the range \[0, 1\]./
        );
      });
    });
  });

  describe("fromAnyBaseToDecimalBase utility", () => {
    it("should export fromAnyBaseToDecimalBase utility correcty", () => {
      assert.strict(typeof fromAnyBaseToDecimalBase !== "undefined");
    });

    it("should the fromAnyBaseToDecimalBase utility early exist and return 0 over empty string when pass 0 as input number", () => {
      assert.strictEqual(fromAnyBaseToDecimalBase("0", 16), "0");
    });

    it("should the fromAnyBaseToDecimalBase utility early exist and return 0 over empty string when pass 0 with - symbol as input number", () => {
      assert.strictEqual(fromAnyBaseToDecimalBase("-0", 16), "0");
    });

    Object.keys(basesTestCases).forEach((base) =>
      describe(base, () =>
        basesTestCases[base as TestCasesKey].forEach(
          ([iNumber, iBase, oBase, result]) => {
            if (oBase !== 10) return;
            it(`should the fromAnyBaseToDecimalBase utility convert ${base} to ${oBase} (${
              iNumber.toString().startsWith("-") ? "-" : "+"
            }) correctly`, () => {
              assert.strictEqual(
                fromAnyBaseToDecimalBase(iNumber.toString(), iBase),
                result
              );
            });
          }
        )
      )
    );

    it("should the fromAnyBaseToDecimalBase utility handle large input value correctly for all input bases under 10 (length > 32)", () => {
      assert.strictEqual(
        fromAnyBaseToDecimalBase(
          "11111011000001010011100101111001010001110011100011011010",
          2
        ),
        "70655963560360154"
      );
    });

    describe("errors", () => {
      it("should the fromAnyBaseToDecimalBase utility throw when pass invalid base", () => {
        assert.throws(
          () => fromAnyBaseToDecimalBase("111", 1),
          /The base should be between 2 et 36./
        );
      });

      it("should the fromAnyBaseToDecimalBase utility throw when pass an empty input number", () => {
        assert.throws(
          () => fromAnyBaseToDecimalBase("", 2),
          /The input shouldn't have special charts or be empty./
        );
      });

      it("should the fromAnyBaseToDecimalBase utility throw when pass an input number have special charts", () => {
        assert.throws(
          () => fromAnyBaseToDecimalBase("14*4", 2),
          /The input shouldn't have special charts or be empty./
        );
      });

      it("should the fromAnyBaseToDecimalBase utility throw when pass an input number out of range", () => {
        assert.throws(
          () => fromAnyBaseToDecimalBase("23942394234", 2),
          /The input number '23942394234' isn't on the range \[0, 1\]./
        );
      });
    });
  });

  describe("fromDecimalBaseToAnyBase utility", () => {
    it("should export fromDecimalBaseToAnyBase utility correcty", () => {
      assert.strict(typeof fromDecimalBaseToAnyBase !== "undefined");
    });

    it("should the fromDecimalBaseToAnyBase utility early exist and return 0 over empty string when pass 0 as input number", () => {
      assert.strictEqual(fromDecimalBaseToAnyBase("0", 16), "0");
    });

    it("should the fromDecimalBaseToAnyBase utility early exist and return 0 over empty string when pass 0 with - symbol as input number", () => {
      assert.strictEqual(fromDecimalBaseToAnyBase("-0", 16), "0");
    });

    Object.keys(basesTestCases).forEach((base) =>
      describe(base, () =>
        basesTestCases[base as TestCasesKey].forEach(
          ([iNumber, iBase, oBase, result]) => {
            if (iBase !== 10) return;
            it(`should the fromDecimalBaseToAnyBase utility convert ${base} to ${oBase} (${
              iNumber.toString().startsWith("-") ? "-" : "+"
            }) correctly`, () => {
              assert.strictEqual(
                fromDecimalBaseToAnyBase(iNumber.toString(), oBase),
                result
              );
            });
          }
        )
      )
    );

    it("should the fromDecimalBaseToAnyBase utility handle large input value correctly for all input bases under 10 (length > 32)", () => {
      assert.strictEqual(
        fromDecimalBaseToAnyBase(
          "346346346346346346346346346346346346346346346346346346346346346346346346346346346346346346346346346346346346",
          2
        ),
        "1001011100000011001000011010110000011001011111010101111101111011110101111101011010111111010111111101010100011110001111010110100100010011001101100011010100111011011010111100001110000101100010011100101110010111110000101011110011100000110011100111100000010110001010101000100111011101101010010110001010101000100111011101101010010110001010101000100111011101101010"
      );
    });

    describe("errors", () => {
      it("should the fromDecimalBaseToAnyBase utility throw when pass invalid base", () => {
        assert.throws(
          () => fromDecimalBaseToAnyBase("111", 1),
          /The base should be between 2 et 36./
        );
      });

      it("should the fromDecimalBaseToAnyBase utility throw when pass an empty input number", () => {
        assert.throws(
          () => fromDecimalBaseToAnyBase("", 2),
          /The input shouldn't have special charts or be empty./
        );
      });

      it("should the fromDecimalBaseToAnyBase utility throw when pass an input number have special charts", () => {
        assert.throws(
          () => fromDecimalBaseToAnyBase("14*4", 2),
          /The input shouldn't have special charts or be empty./
        );
      });
    });
  });
});
