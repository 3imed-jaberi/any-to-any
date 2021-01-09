export function anyBaseToDecimal (InputNumber: string, InputBase: number) {
  let index = InputNumber.length - 1,
  result = 0, power = 1,
  unitConverted;
  
  for (index; index >= 0; index--) {
    let currentNumber = InputNumber[index];
    unitConverted = (+currentNumber >= 0 &&  +currentNumber <= 9) 
      ? +currentNumber 
      : (currentNumber.charCodeAt(0) - 55);
    result += unitConverted * power;
    power *= InputBase;
  }

  return result;
};
