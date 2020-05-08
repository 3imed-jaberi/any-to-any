import { anyBaseToDecimal , decimalToAnyBase } from './conversion';
import { isValidInput } from './validation';

function Convert (InputNumber: string | number, InputBase: number, OutputBase: number): string {
  InputNumber = `${InputNumber}`.toUpperCase();
  isValidInput(InputNumber, InputBase, OutputBase);

  return (
    InputBase === OutputBase ? InputNumber : (
      (() => {
        let signe = InputNumber.charAt(0) === '-' ? '-' : '';
        InputNumber = signe.length !== 0 ? InputNumber.substr(1, InputNumber.length): InputNumber;

        return InputBase === 10 ? `${signe}${decimalToAnyBase(parseInt(InputNumber, 10), OutputBase)}` : (
          OutputBase === 10 ? 
            `${signe}${anyBaseToDecimal(`${InputNumber}`, InputBase)}` :
            `${signe}${decimalToAnyBase(anyBaseToDecimal(`${InputNumber}`, InputBase), OutputBase)}`
        )
      })()
    )
  );
};

export { Convert, Convert as default};

// For CommonJS default export support 
module.exports = Convert;
module.exports.Convert = Convert;
module.exports.default = Convert;
