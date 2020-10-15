/* eslint-disable @typescript-eslint/naming-convention */
import { Message } from "protobufjs";

import { cosmosField, registered } from "./decorator";
import { Registry } from "./registry";

export const defaultRegistry = new Registry();

@registered(defaultRegistry, "/cosmos.base.v1beta1.Coin")
export class Coin extends Message {
  @cosmosField.string(1)
  public readonly denom?: string;

  @cosmosField.string(2)
  public readonly amount?: string;
}

@registered(defaultRegistry, "/cosmos.bank.v1beta1.MsgSend")
export class MsgSend extends Message {
  @cosmosField.string(1)
  public readonly from_address?: string;

  @cosmosField.string(2)
  public readonly to_address?: string;

  @cosmosField.repeatedMessage(3, Coin)
  public readonly amount?: readonly Coin[];
}
