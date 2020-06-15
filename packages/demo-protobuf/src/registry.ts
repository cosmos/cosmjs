import protobuf from "protobufjs";

import { cosmos_sdk as cosmosSdk, google } from "./generated/codecimpl";

export class Registry {
  private readonly types: Map<string, protobuf.Type>;

  constructor(customTypes: readonly [string, protobuf.Type][] = []) {
    this.types = new Map<string, protobuf.Type>([
      ["/cosmos.Coin", (cosmosSdk.v1.Coin as unknown) as protobuf.Type],
      ["/cosmos.bank.MsgSend", (cosmosSdk.x.bank.v1.MsgSend as unknown) as protobuf.Type],
      ["/cosmos.tx.TxBody", (cosmosSdk.tx.v1.TxBody as unknown) as protobuf.Type],
      ["/google.protobuf.Any", (google.protobuf.Any as unknown) as protobuf.Type],
      ...customTypes,
    ]);
  }

  public lookupType(name: string): protobuf.Type | undefined {
    return this.types.get(name);
  }
}
