
const anyBaseToDecimal = (InputNumber: string, InputBase: number): number => {

  let index :number = InputNumber.length - 1, result :number = 0, power :number = 1, unitConverted :number;
    
  for (index; index >= 0; index--) {                
    unitConverted = (
      InputNumber.charAt(index) >= '0' 
                && 
      InputNumber.charAt(index) <= '9' 
    ) ? 
    parseInt(InputNumber.charAt(index)) 
                : 
    InputNumber.charAt(index).charCodeAt(0) - 55;

    result += unitConverted * power;
    power *= InputBase;   
  }

  return result;
};


export { anyBaseToDecimal as default };