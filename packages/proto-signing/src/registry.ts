/* eslint-disable @typescript-eslint/naming-convention */
import Long from "long";
import protobuf from "protobufjs";

import { MsgSend } from "./codec/cosmos/bank/v1beta1/tx";
import { Coin } from "./codec/cosmos/base/v1beta1/coin";
import { TxBody } from "./codec/cosmos/tx/v1beta1/tx";
import { Any } from "./codec/google/protobuf/any";

export interface GeneratedType {
  readonly encode: (message: any | { [k: string]: any }, writer?: protobuf.Writer) => protobuf.Writer;
  readonly decode: (input: Uint8Array | protobuf.Reader, length?: number) => any;
  readonly fromJSON: (object: { [k: string]: any }) => any;
  readonly fromPartial: (object: { [k: string]: any }) => any;
  readonly toJSON: (message: any | { [k: string]: any }) => unknown;
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

const defaultTypeUrls = {
  cosmosCoin: "/cosmos.base.v1beta1.Coin",
  cosmosMsgSend: "/cosmos.bank.v1beta1.MsgSend",
  cosmosTxBody: "/cosmos.tx.v1beta1.TxBody",
  googleAny: "/google.protobuf.Any",
};

export class Registry {
  private readonly types: Map<string, GeneratedType>;

  public constructor(customTypes: Iterable<[string, GeneratedType]> = []) {
    const { cosmosCoin, cosmosMsgSend } = defaultTypeUrls;
    this.types = new Map<string, GeneratedType>([
      [cosmosCoin, Coin],
      [cosmosMsgSend, MsgSend],
      ...customTypes,
    ]);
  }

  public register(typeUrl: string, type: GeneratedType): void {
    this.types.set(typeUrl, type);
  }

  public lookupType(typeUrl: string): GeneratedType | undefined {
    return this.types.get(typeUrl);
  }

  private lookupTypeWithError(typeUrl: string): GeneratedType {
    const type = this.lookupType(typeUrl);
    if (!type) {
      throw new Error(`Unregistered type url: ${typeUrl}`);
    }
    return type;
  }

  public encode({ typeUrl, value }: EncodeObject): Uint8Array {
    if (typeUrl === defaultTypeUrls.cosmosTxBody) {
      return this.encodeTxBody(value);
    }
    const type = this.lookupTypeWithError(typeUrl);
    const created = type.fromPartial(value);
    return Uint8Array.from(type.encode(created).finish());
  }

  public encodeTxBody(txBodyFields: TxBodyValue): Uint8Array {
    const wrappedMessages = txBodyFields.messages.map((message) => {
      const messageBytes = this.encode(message);
      return Any.fromJSON({
        typeUrl: message.typeUrl,
        value: messageBytes,
      });
    });
    const txBody = TxBody.fromPartial({
      ...txBodyFields,
      messages: wrappedMessages,
    });
    return Uint8Array.from(TxBody.encode(txBody).finish());
  }

  public decode({ typeUrl, value }: DecodeObject): any {
    if (typeUrl === defaultTypeUrls.cosmosTxBody) {
      return this.decodeTxBody(value);
    }
    const type = this.lookupTypeWithError(typeUrl);
    const decoded = type.decode(value);
    Object.entries(decoded).forEach(([key, val]: [string, any]) => {
      if (typeof Buffer !== "undefined" && typeof Buffer.isBuffer !== "undefined" && Buffer.isBuffer(val)) {
        decoded[key] = Uint8Array.from(val);
      }
    });
    return decoded;
  }

  public decodeTxBody(txBody: Uint8Array): TxBody {
    const decodedTxBody = TxBody.decode(txBody);

    return {
      ...decodedTxBody,
      messages: decodedTxBody.messages.map(({ typeUrl: typeUrl, value }: Any) => {
        if (!typeUrl) {
          throw new Error("Missing type_url in Any");
        }
        if (!value) {
          throw new Error("Missing value in Any");
        }
        return this.decode({ typeUrl, value });
      }),
    };
  }
}
