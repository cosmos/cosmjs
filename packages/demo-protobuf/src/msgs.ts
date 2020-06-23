import { Message } from "protobufjs";

import { cosmosField, cosmosMessage } from "./decorator";
import { Registry } from "./registry";

export const defaultRegistry = new Registry();

@cosmosMessage(defaultRegistry, "/cosmos.Coin")
export class Coin extends Message<{}> {
  @cosmosField.string(1)
  public readonly denom?: string;

  @cosmosField.string(2)
  public readonly amount?: string;
}

@cosmosMessage(defaultRegistry, "/cosmos.bank.MsgSend")
export class MsgSend extends Message<{}> {
  @cosmosField.bytes(1)
  public readonly from_address?: Uint8Array;

  @cosmosField.bytes(2)
  public readonly to_address?: Uint8Array;

  @cosmosField.repeatedMessage(3, Coin)
  public readonly amount?: readonly Coin[];
}
