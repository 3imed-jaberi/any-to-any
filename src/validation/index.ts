import {
  __Error_InputBase__, 
  __Error_OutputBase__, 
  __Error_InputNumber_Size__, 
  __Error_InputNumber_Int__, 
  __Error_InputNumber_Not_Special_Charts__,
  __Error_InputNumber_Less_Than_InputBase__
} from '../constants';



const validationsInput = (InputNumber: string, InputBase: number, OutputBase: number): string|boolean => {

  if (InputNumber.charAt(0) === '-'){
    InputNumber = InputNumber.slice(1);
  }
  
  if ( InputBase < 2 || InputBase > 36  ) {
    return __Error_InputBase__ ;       
  }else if ( OutputBase < 2 || OutputBase > 36 ) {
    return __Error_OutputBase__;
  }else if ( typeof InputNumber === 'string' ){
    if (InputNumber.length === 0){
      return __Error_InputNumber_Size__;        
    }else{
      let NumbersInInput = InputNumber.match(/[0-9]/g) ;
      let AlphabetsInInput = InputNumber.match(/[A-z]/g) ;
      let pointOrVerguleInInput = InputNumber.match(/(\.|\,)/g); 
      if (pointOrVerguleInInput !== null ) {
        return __Error_InputNumber_Int__; 
      }else if (
        ( NumbersInInput === null && AlphabetsInInput !== null && AlphabetsInInput.length !== InputNumber.length )
                                                        ||
        ( NumbersInInput !== null && AlphabetsInInput === null && NumbersInInput.length !== InputNumber.length )
                                                        ||
        ( NumbersInInput !== null && AlphabetsInInput !== null && (AlphabetsInInput.length + NumbersInInput.length) !== InputNumber.length )
      ){
        return __Error_InputNumber_Not_Special_Charts__;
      }else{
        for (let index = 0; index < InputNumber.length; index++) {
          if ( +InputNumber[index] >= InputBase ) {
            return __Error_InputNumber_Less_Than_InputBase__;        
          }                                 
        };
      };    
    };
  };
  
  return true;
};


export { validationsInput as default };