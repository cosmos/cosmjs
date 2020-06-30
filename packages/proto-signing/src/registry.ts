/* eslint-disable @typescript-eslint/camelcase */
import protobuf from "protobufjs";

import { cosmos_sdk as cosmosSdk, google } from "./generated/codecimpl";

export interface GeneratedType {
  readonly create: (properties?: { [k: string]: any }) => any;
  readonly encode: (message: any | { [k: string]: any }, writer?: protobuf.Writer) => protobuf.Writer;
  readonly decode: (reader: protobuf.Reader | Uint8Array, length?: number) => any;
}

export type EncodeObject = {
  readonly typeUrl: string;
  readonly value: any;
};

export type DecodeObject = {
  readonly typeUrl: string;
  readonly value: Uint8Array;
};

export type TxBodyValue = {
  readonly messages: readonly EncodeObject[];
  readonly memo?: string;
  readonly timeoutHeight?: number;
  readonly extensionOptions?: readonly any[];
  readonly nonCriticalExtensionOptions?: readonly any[];
};

const defaultTypeUrls = {
  cosmosCoin: "/cosmos.Coin",
  cosmosMsgSend: "/cosmos.bank.MsgSend",
  cosmosTxBody: "/cosmos.tx.TxBody",
  googleAny: "/google.protobuf.Any",
};

export class Registry {
  private readonly types: Map<string, GeneratedType>;

  constructor(customTypes: Iterable<[string, GeneratedType]> = []) {
    const { cosmosCoin, cosmosMsgSend, cosmosTxBody, googleAny } = defaultTypeUrls;
    this.types = new Map<string, GeneratedType>([
      [cosmosCoin, cosmosSdk.v1.Coin],
      [cosmosMsgSend, cosmosSdk.x.bank.v1.MsgSend],
      [cosmosTxBody, cosmosSdk.tx.v1.TxBody],
      [googleAny, google.protobuf.Any],
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
    const created = type.create(value);
    return type.encode(created).finish();
  }

  public encodeTxBody(txBodyFields: TxBodyValue): Uint8Array {
    const TxBody = this.lookupTypeWithError(defaultTypeUrls.cosmosTxBody);
    const Any = this.lookupTypeWithError(defaultTypeUrls.googleAny);

    const wrappedMessages = txBodyFields.messages.map((message) => {
      const messageBytes = this.encode(message);
      return Any.create({
        type_url: message.typeUrl,
        value: messageBytes,
      });
    });
    const txBody = TxBody.create({
      ...txBodyFields,
      messages: wrappedMessages,
    });
    return TxBody.encode(txBody).finish();
  }

  public decode({ typeUrl, value }: DecodeObject): any {
    if (typeUrl === defaultTypeUrls.cosmosTxBody) {
      return this.decodeTxBody(value);
    }
    const type = this.lookupTypeWithError(typeUrl);
    return type.decode(value);
  }

  public decodeTxBody(txBody: Uint8Array): cosmosSdk.tx.v1.TxBody {
    const TxBody = this.lookupTypeWithError(defaultTypeUrls.cosmosTxBody);
    const decodedTxBody = TxBody.decode(txBody);

    return {
      ...decodedTxBody,
      messages: decodedTxBody.messages.map(({ type_url: typeUrl, value }: google.protobuf.IAny) => {
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
