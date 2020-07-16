import protobuf from "protobufjs";
import { cosmos, google } from "./generated/codecimpl";
export interface GeneratedType {
  readonly create: (properties?: { [k: string]: any }) => any;
  readonly encode: (
    message:
      | any
      | {
          [k: string]: any;
        },
    writer?: protobuf.Writer,
  ) => protobuf.Writer;
  readonly decode: (reader: protobuf.Reader | Uint8Array, length?: number) => any;
}
export interface EncodeObject {
  readonly typeUrl: string;
  readonly value: any;
}
export interface DecodeObject {
  readonly typeUrl: string;
  readonly value: Uint8Array;
}
export interface TxBodyValue {
  readonly messages: readonly EncodeObject[];
  readonly memo?: string;
  readonly timeoutHeight?: number;
  readonly extensionOptions?: google.protobuf.IAny[];
  readonly nonCriticalExtensionOptions?: google.protobuf.IAny[];
}
export declare class Registry {
  private readonly types;
  constructor(customTypes?: Iterable<[string, GeneratedType]>);
  register(typeUrl: string, type: GeneratedType): void;
  lookupType(typeUrl: string): GeneratedType | undefined;
  private lookupTypeWithError;
  encode({ typeUrl, value }: EncodeObject): Uint8Array;
  encodeTxBody(txBodyFields: TxBodyValue): Uint8Array;
  decode({ typeUrl, value }: DecodeObject): any;
  decodeTxBody(txBody: Uint8Array): cosmos.tx.TxBody;
}
