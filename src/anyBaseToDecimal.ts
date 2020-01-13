
const anyBaseToDecimal = (InputNumber: string, InputBase: number): number => {

  let index: number = InputNumber.length - 1, result: number = 0, power: number = 1, unitConverted: number;
  
  for (index; index >= 0; index--) {

    let currentNumber: string = InputNumber[index];

    unitConverted = ( +currentNumber >= 0 &&  +currentNumber <= 9 ) ? +currentNumber :  (currentNumber.charCodeAt(0) - 55);

    result += unitConverted * power;
    power *= InputBase;   

  }

  return result;
};


export { anyBaseToDecimal as default };