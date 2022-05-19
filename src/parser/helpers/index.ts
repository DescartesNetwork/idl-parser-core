import { Idl } from "@project-serum/anchor";

export const fileToBase64 = (
  file: File,
  callBack: (result: string | ArrayBuffer | null) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    if (reader.result) callBack(reader.result);
  };
};

export class IdlParser {
  static getProgramAddress(IdlData: Idl) {
    return IdlData.metadata.address || "";
  }
  static getTypeOfParam(type: any): string {
    if (typeof type === "string") return type;

    if (type?.["defined"]) return type["defined"];
    if (type?.["option"]) return IdlParser.getTypeOfParam(type["option"]);
    if (type?.["vec"]) return `${IdlParser.getTypeOfParam(type["vec"])} []`;
    if (type?.["array"]) {
      if (Array.isArray(type?.["array"]))
        return `${type?.["array"][0]} [${type?.["array"][1]}]`;
      return `${IdlParser.getTypeOfParam(type["array"])} []`;
    }
    return "-";
  }
}
