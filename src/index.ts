import anyBaseToDecimal from './anyBaseToDecimal';
import decimalToAnyBase from './decimalToAnyBase';
import validationsInput from './validation';



const main = ( InputNumber: string|number, InputBase: number, OutputBase: number ): string  => {

  if (typeof InputNumber === "string"){
    InputNumber = InputNumber.toString().toUpperCase();
  }
  
  let isValid:string = validationsInput(InputNumber.toString(),InputBase,OutputBase);

  if ( isValid !== "true" ){
          return isValid ;
  }

  if ( InputNumber.toString().length === 2 &&  InputNumber.toString().charAt(0) === "-" && InputNumber.toString().charAt(1) === "0" ){
    return "0" ;
  }else{
    if ( InputBase === OutputBase ) {
      return InputNumber.toString() ;
    }else{
      let signe:string = "-" ;

      InputNumber = (typeof InputNumber === "number" ) ? InputNumber.toString() : InputNumber ;   
      if ( InputNumber.charAt(0) === "-" ) {
        InputNumber = InputNumber.substr(1, InputNumber.length) ;
      }else{
        signe = "" ;
      };

      if ( InputBase === 10 ) {
        InputNumber = (typeof InputNumber === "string") ? parseInt(InputNumber) : InputNumber ;
        return signe+decimalToAnyBase(InputNumber,OutputBase);
      }else{
        if ( OutputBase === 10 ) {                                
            return signe+anyBaseToDecimal(InputNumber.toString(),InputBase).toString();
        }else {
          InputNumber = (typeof InputNumber === "string") ? anyBaseToDecimal(InputNumber,InputBase): anyBaseToDecimal(InputNumber,InputBase) ;
          return signe+decimalToAnyBase( InputNumber , OutputBase) ;            
        };
      };
    };    
  };
};


export { main as default };