import { Idl } from '@project-serum/anchor';
export declare const fileToBase64: (file: File, callBack: (result: string | ArrayBuffer | null) => void) => void;
export declare class IdlParser {
    static getProgramAddress(IdlData: Idl): any;
    static getTypeOfParam(type: any): string;
}
