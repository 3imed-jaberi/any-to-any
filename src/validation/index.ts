import {
  __Error_InputBase__,
  __Error_OutputBase__,
  __Error_InputNumber_Size__,
  __Error_InputNumber_Int__,
  __Error_InputNumber_Not_Special_Charts__,
  __Error_InputNumber_Less_Than_InputBase__
} from '../constants';

export function useValidation (
  inputNumber: string,
  InputBase: number,
  OutputBase: number
): [boolean, string?] {
  //
  const numbersInInput = inputNumber.match(/[0-9]/g),
  alphabetsInInput = inputNumber.match(/[A-Z]/g),
  pointOrVerguleInInput = inputNumber.match(/(\.|\,)/g); 

  //
  if (inputNumber.length === 0) {
    return [
      false,
      __Error_InputNumber_Size__
    ];
  }

  //
  if (InputBase < 2 || InputBase > 36) {
    return [
      false,
      __Error_InputBase__
    ];
  }

  //
  if (OutputBase < 2 || OutputBase > 36) {
    return [
      false,
      __Error_OutputBase__
    ];
  }

  //
  if (pointOrVerguleInInput) {
    return [
      false,
      __Error_InputNumber_Int__
    ];
  }

  //
  if (
    (
      !numbersInInput &&
      alphabetsInInput &&
      alphabetsInInput.length !== inputNumber.length
    ) ||
    (
      numbersInInput &&
      !alphabetsInInput &&
      numbersInInput.length !== inputNumber.length
    ) ||
    (
      numbersInInput &&
      alphabetsInInput &&
      (alphabetsInInput.length + numbersInInput.length) !== inputNumber.length
    )
  ) {
    return [
      false,
      __Error_InputNumber_Not_Special_Charts__
    ];
  }

  //
  for (let index = 0; index < inputNumber.length; index++) {
    if (+inputNumber[index] >= InputBase) {
      return [
        false,
        __Error_InputNumber_Less_Than_InputBase__
      ];
    }             
  }

  return [
    true,
    undefined
  ];
};
