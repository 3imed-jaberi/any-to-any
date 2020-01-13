import { anyBaseToDecimal , decimalToAnyBase } from './conversion';
import { isValidInput } from './validation';



const Convert = ( InputNumber: string|number, InputBase: number, OutputBase: number ): string  => {

  if (typeof InputNumber === 'string'){
    InputNumber = `${InputNumber}`.toUpperCase();
  }


  let isValid: string | boolean = isValidInput(`${InputNumber}`, InputBase, OutputBase);
  if (typeof isValid == 'string'){
    return isValid ;
  }

  if (`${InputNumber}`.length === 2 &&  `${InputNumber}`.charAt(0) === '-' && `${InputNumber}`.charAt(1) === '0'){
    return '0' ;
  }else{
    if ( InputBase === OutputBase ) {
      return `${InputNumber}`;
    }else{
      let signe: string = '-';
      InputNumber = `${InputNumber}`; 

      if (InputNumber.charAt(0) === signe) {
        InputNumber = InputNumber.substr(1, InputNumber.length) ;
      }else{
        signe = '' ;
      };

      if (InputBase === 10) {
        return `${signe}${decimalToAnyBase(+InputNumber, OutputBase)}`;
      }else{
        if ( OutputBase === 10 ) {                                
            return `${signe}${anyBaseToDecimal(`${InputNumber}`, InputBase)}`;
        }else {
          return `${signe}${decimalToAnyBase(anyBaseToDecimal(`${InputNumber}`, InputBase), OutputBase)}`;         
        };
      };
    };    
  };
};


export { Convert as default };