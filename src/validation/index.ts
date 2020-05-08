import { __Error_InputBase__, __Error_OutputBase__, __Error_InputNumber_Size__, __Error_InputNumber_Int__, __Error_InputNumber_Not_Special_Charts__, __Error_InputNumber_Less_Than_InputBase__ } from '../constants';


export function isValidInput (InputNumber: string, InputBase: number, OutputBase: number): string | boolean {
  if (InputNumber.charAt(0) === '-') InputNumber = InputNumber.slice(1);
  let NumbersInInput = InputNumber.match(/[0-9]/g),
  AlphabetsInInput = InputNumber.match(/[A-Z]/g),
  pointOrVerguleInInput = InputNumber.match(/(\.|\,)/g); 
  const msgError = (InputBase < 2 || InputBase > 36) ? __Error_InputBase__ : (
    (OutputBase < 2 || OutputBase > 36) ? __Error_OutputBase__ : (
      (InputNumber.length === 0) ? __Error_InputNumber_Size__ : (
        pointOrVerguleInInput ? __Error_InputNumber_Int__ : (
          (
            (!NumbersInInput && AlphabetsInInput && AlphabetsInInput.length !== InputNumber.length) ||
            (NumbersInInput && !AlphabetsInInput  && NumbersInInput.length !== InputNumber.length) ||
            (NumbersInInput && AlphabetsInInput && (AlphabetsInInput.length + NumbersInInput.length) !== InputNumber.length)
          ) ? __Error_InputNumber_Not_Special_Charts__ : (
            (() => {
              for (let index = 0; index < InputNumber.length; index++) {
                if (+InputNumber[index] >= InputBase) return __Error_InputNumber_Less_Than_InputBase__;             
              }
            })()
          )
        )
      )
    )
  );

  if(msgError) throw new Error(msgError);

  return true;
};