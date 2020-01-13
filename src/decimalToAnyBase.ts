
const decimalToAnyBase = (InputNumber: number, OutputBase: number): string => { 

  let result: string = '', unitConverted: string, unitExtracted: number ; 

  do {
    unitExtracted = InputNumber % OutputBase;
    unitConverted = ( unitExtracted >= 0 && unitExtracted <= 9 ) ? `${unitExtracted}` : String.fromCharCode(unitExtracted + 55);

    result = unitConverted + result;
    InputNumber = parseInt(`${InputNumber / OutputBase}`);
  }
  while (InputNumber !== 0);

  return result ;    
};


export { decimalToAnyBase as default };