import { ReactNode, Component } from 'react';
import { Idl } from '@project-serum/anchor';
import { IdlInstruction } from '@project-serum/anchor/dist/cjs/idl';
export declare type SystemSelected = 'context' | 'system' | 'idl' | 'token' | 'pda';
export declare type AccountsMeta = {
    publicKey: string;
    privateKey?: string;
};
export declare type AccountMetaState = Record<string, AccountsMeta>;
export declare type ArgsMetaState = Record<string, string>;
export declare type IDLParserState = {
    programAddress?: string;
    instructionSelected?: string;
    instructionIdl?: IdlInstruction;
    idl?: Idl;
    argsMeta: ArgsMetaState;
    accountsMeta: AccountMetaState;
};
export declare type SetArgsMetaState = {
    name: string;
    val: string;
};
export declare type SetAccountsMetaState = {
    name: string;
    data: AccountsMeta;
};
export declare type ParserProvider = {
    parser: IDLParserState;
    setInstruction: (instruc: string) => void;
    uploadIdl: (idl: Idl) => void;
    setArgsMeta: (args: SetArgsMetaState) => void;
    setAccountsMeta: (args: SetAccountsMetaState) => void;
    removeIdl: () => void;
};
declare type IDLContextProviderProps = {
    children: ReactNode;
};
declare const IDLParserContextProvider: ({ children }: IDLContextProviderProps) => JSX.Element;
export default IDLParserContextProvider;
export declare const withParser: (WrappedComponent: typeof Component) => import("react").ForwardRefExoticComponent<Pick<any, string | number | symbol> & import("react").RefAttributes<HTMLElement>>;
export declare const useParser: () => ParserProvider;
