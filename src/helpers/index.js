var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const fileToBase64 = (file, callBack) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => __awaiter(void 0, void 0, void 0, function* () {
        if (reader.result)
            callBack(reader.result);
    });
};
export class IdlParser {
    static getProgramAddress(IdlData) {
        return IdlData.metadata.address || '';
    }
    static getTypeOfParam(type) {
        if (typeof type === 'string')
            return type;
        if (type === null || type === void 0 ? void 0 : type['defined'])
            return type['defined'];
        if (type === null || type === void 0 ? void 0 : type['option'])
            return IdlParser.getTypeOfParam(type['option']);
        if (type === null || type === void 0 ? void 0 : type['vec'])
            return `${IdlParser.getTypeOfParam(type['vec'])} []`;
        if (type === null || type === void 0 ? void 0 : type['array']) {
            if (Array.isArray(type === null || type === void 0 ? void 0 : type['array']))
                return `${type === null || type === void 0 ? void 0 : type['array'][0]} [${type === null || type === void 0 ? void 0 : type['array'][1]}]`;
            return `${IdlParser.getTypeOfParam(type['array'])} []`;
        }
        return '-';
    }
}
