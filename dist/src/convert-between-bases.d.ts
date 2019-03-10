import ConvertBetweenBases_Interface from "./convert-between-bases.interface";
declare class ConvertBetweenBases implements ConvertBetweenBases_Interface {
    private anyBaseToDecimal;
    private decimalToAnyBase;
    private validationsInput;
    main(InputNumber: string | number, InputBase: number, OutputBase: number): string;
}
export default ConvertBetweenBases;
