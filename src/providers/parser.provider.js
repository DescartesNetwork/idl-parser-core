var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { Children, cloneElement, createContext, forwardRef, Component, useContext, useState, useCallback, useMemo, } from 'react';
import { IdlParser } from '../helpers';
const Context = createContext({});
const DEFAULT_IDL = {
    programAddress: '',
    instructionSelected: '',
    instructionIdl: undefined,
    idl: undefined,
    argsMeta: {},
    accountsMeta: {},
};
const IDLParserContextProvider = ({ children }) => {
    const [parserData, setParserData] = useState(DEFAULT_IDL);
    const uploadIdl = useCallback((idl) => {
        const nextData = JSON.parse(JSON.stringify(parserData));
        const programAddress = IdlParser.getProgramAddress(idl);
        nextData.idl = idl;
        nextData.programAddress = programAddress;
        return setParserData(Object.assign({}, nextData));
    }, [parserData]);
    const removeIdl = useCallback(() => setParserData(DEFAULT_IDL), []);
    const setInstruction = useCallback((instruction) => {
        var _a, _b;
        const nextData = JSON.parse(JSON.stringify(parserData));
        if (nextData.instructionSelected === instruction)
            return;
        const instructionIdl = (_b = (_a = parserData.idl) === null || _a === void 0 ? void 0 : _a.instructions) === null || _b === void 0 ? void 0 : _b.find((elm) => elm.name === instruction);
        nextData.instructionIdl = instructionIdl;
        nextData.instructionSelected = instruction;
        return setParserData(Object.assign({}, nextData));
    }, [parserData]);
    const setArgsMeta = useCallback((args) => {
        const nextData = JSON.parse(JSON.stringify(parserData));
        if (!!args) {
            const { name, val } = args;
            nextData.argsMeta = Object.assign(Object.assign({}, nextData.argsMeta), { [name]: val });
        }
        return setParserData(Object.assign({}, nextData));
    }, [parserData]);
    const setAccountsMeta = useCallback((args) => {
        const nextData = JSON.parse(JSON.stringify(parserData));
        if (!!args) {
            const { name, data } = args;
            nextData.accountsMeta = Object.assign(Object.assign({}, nextData.accountsMeta), { [name]: data });
        }
        return setParserData(Object.assign({}, nextData));
    }, [parserData]);
    const provider = useMemo(() => ({
        parser: parserData,
        setInstruction,
        uploadIdl,
        setArgsMeta,
        setAccountsMeta,
        removeIdl,
    }), [
        parserData,
        removeIdl,
        setAccountsMeta,
        setArgsMeta,
        setInstruction,
        uploadIdl,
    ]);
    return _jsx(Context.Provider, Object.assign({ value: provider }, { children: children }));
};
export default IDLParserContextProvider;
const IDLParserContextConsumer = ({ children, }) => {
    return (_jsx(Context.Consumer, { children: (value) => Children.map(children, (child) => cloneElement(child, Object.assign({}, value))) }));
};
export const withParser = (WrappedComponent) => {
    class HOC extends Component {
        render() {
            const _a = this.props, { forwardedRef } = _a, rest = __rest(_a, ["forwardedRef"]);
            return (_jsx(IDLParserContextConsumer, { children: _jsx(WrappedComponent, Object.assign({ ref: forwardedRef }, rest)) }));
        }
    }
    return forwardRef((props, ref) => (_jsx(HOC, Object.assign({}, props, { ref: ref }))));
};
export const useParser = () => useContext(Context);
