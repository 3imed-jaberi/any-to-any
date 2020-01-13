
const validationsInput = (InputNumber: string, InputBase: number, OutputBase: number): string|boolean => {

  if (InputNumber.charAt(0) === '-'){
    InputNumber = InputNumber.slice(1);
  }
  
  if ( InputBase < 2 || InputBase > 36  ) {
    return 'Error InputBase : the input base should be between 2 et 36 ..';       
  }else if ( OutputBase < 2 || OutputBase > 36 ) {
    return 'Error OutputBase : the output base should be between 2 et 36 ..';
  }else if ( typeof InputNumber === 'string' ){
    if (InputNumber.length === 0){
      return 'Error InputNumber : the input number should be not empty string ..';        
    }else{
      let NumbersInInput = InputNumber.match(/[0-9]/g) ;
      let AlphabetsInInput = InputNumber.match(/[A-z]/g) ;
      let pointOrVerguleInInput = InputNumber.match(/(\.|\,)/g); 
      if (pointOrVerguleInInput !== null ) {
        return 'Error InputNumber : the input number should be Integer or not possesses < \',\' or \'.\' >  .. '; 
      }else if (
        ( NumbersInInput === null && AlphabetsInInput !== null && AlphabetsInInput.length !== InputNumber.length )
                                                        ||
        ( NumbersInInput !== null && AlphabetsInInput === null && NumbersInInput.length !== InputNumber.length )
                                                        ||
        ( NumbersInInput !== null && AlphabetsInInput !== null && (AlphabetsInInput.length + NumbersInInput.length) !== InputNumber.length )
      ){
        return 'Error InputNumber : the input number should be not possesses special charts ..';        
      }else{
        for (let index = 0; index < InputNumber.length; index++) {
          if ( +InputNumber[index] >= InputBase ) {
            return 'Error InputNumber : each unit in the input number should be less than or equal the input base ..';        
          }                                 
        };
      };    
    };
  };
  
  return true;
};


export { validationsInput as default };