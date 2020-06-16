import protobuf from "protobufjs";

import { cosmos_sdk as cosmosSdk, google } from "./generated/codecimpl";

interface GeneratedType {
  readonly create: (properties?: { [k: string]: any }) => any;
  readonly encode: (message: any | { [k: string]: any }, writer?: protobuf.Writer) => protobuf.Writer;
  readonly decode: (reader: protobuf.Reader | Uint8Array, length?: number) => any;
}

export class Registry {
  private readonly types: Map<string, GeneratedType>;

  constructor(customTypes: Iterable<[string, GeneratedType]> = []) {
    this.types = new Map<string, GeneratedType>([
      ["/cosmos.Coin", cosmosSdk.v1.Coin],
      ["/cosmos.bank.MsgSend", cosmosSdk.x.bank.v1.MsgSend],
      ["/cosmos.tx.TxBody", cosmosSdk.tx.v1.TxBody],
      ["/google.protobuf.Any", google.protobuf.Any],
      ...customTypes,
    ]);
  }

  public register(name: string, type: GeneratedType): void {
    this.types.set(name, type);
  }

  public lookupType(name: string): GeneratedType | undefined {
    return this.types.get(name);
  }
}
