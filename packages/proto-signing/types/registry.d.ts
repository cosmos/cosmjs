import Long from "long";
import protobuf from "protobufjs";
import { TxBody } from "./codec/cosmos/tx/v1beta1/tx";
import { Any } from "./codec/google/protobuf/any";
export interface GeneratedType {
  readonly encode: (
    message:
      | any
      | {
          [k: string]: any;
        },
    writer?: protobuf.Writer,
  ) => protobuf.Writer;
  readonly decode: (input: Uint8Array | protobuf.Reader, length?: number) => any;
  readonly fromJSON: (object: { [k: string]: any }) => any;
  readonly fromPartial: (object: { [k: string]: any }) => any;
  readonly toJSON: (
    message:
      | any
      | {
          [k: string]: any;
        },
  ) => unknown;
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
  readonly timeoutHeight?: Long;
  readonly extensionOptions?: Any[];
  readonly nonCriticalExtensionOptions?: Any[];
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
  decodeTxBody(txBody: Uint8Array): TxBody;
}
