export function decimalToAnyBase (InputNumber: number, OutputBase: number): string { 
  let result: string = '', unitConverted: string, unitExtracted: number; 
  
  while (InputNumber !== 0) {
    unitExtracted = InputNumber % OutputBase;
    unitConverted = (unitExtracted >= 0 && unitExtracted <= 9) ? `${unitExtracted}` : String.fromCharCode(unitExtracted + 55);
    result = unitConverted + result;
    InputNumber = parseInt(`${InputNumber / OutputBase}`);
  }

  return result;
};