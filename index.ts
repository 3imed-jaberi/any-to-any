import ConvertBetweenBases from './src/convert-between-bases';

export function Convert ( InputNumber:string|number , InputBase:number , OutputBase:number ) : string {
         return new ConvertBetweenBases().main(InputNumber,InputBase,OutputBase) ;
};



