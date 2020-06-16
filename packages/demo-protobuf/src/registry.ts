import protobuf from "protobufjs";

import { cosmos_sdk as cosmosSdk, google } from "./generated/codecimpl";

export type GeneratedType = {
  readonly create: (properties?: { [k: string]: any }) => protobuf.Message<{}>;
  readonly encode: (
    message: protobuf.Message<{}> | { [k: string]: any },
    writer?: protobuf.Writer,
  ) => protobuf.Writer;
  readonly decode: (reader: protobuf.Reader | Uint8Array, length?: number) => protobuf.Message<{}>;
};

export class Registry {
  private readonly types: Map<string, GeneratedType>;

  constructor(customTypes: Iterable<[string, GeneratedType]> = []) {
    this.types = new Map<string, GeneratedType>([
      ["/cosmos.Coin", (cosmosSdk.v1.Coin as unknown) as GeneratedType],
      ["/cosmos.bank.MsgSend", (cosmosSdk.x.bank.v1.MsgSend as unknown) as GeneratedType],
      ["/cosmos.tx.TxBody", (cosmosSdk.tx.v1.TxBody as unknown) as GeneratedType],
      ["/google.protobuf.Any", (google.protobuf.Any as unknown) as GeneratedType],
      ...customTypes,
    ]);
  }

  public lookupType(name: string): GeneratedType | undefined {
    return this.types.get(name);
  }
}
