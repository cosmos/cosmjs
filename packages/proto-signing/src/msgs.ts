/* eslint-disable @typescript-eslint/naming-convention */
import { Message } from "protobufjs";

import { cosmosField, registered } from "./decorator";
import { Registry } from "./registry";

export const defaultRegistry = new Registry();

@registered(defaultRegistry, "/cosmos.Coin")
export class Coin extends Message {
  @cosmosField.string(1)
  public readonly denom?: string;

  @cosmosField.string(2)
  public readonly amount?: string;
}

@registered(defaultRegistry, "/cosmos.bank.MsgSend")
export class MsgSend extends Message {
  @cosmosField.bytes(1)
  public readonly from_address?: Uint8Array;

  @cosmosField.bytes(2)
  public readonly to_address?: Uint8Array;

  @cosmosField.repeatedMessage(3, Coin)
  public readonly amount?: readonly Coin[];
}

// TODO: move somewhere else as needed
@registered(defaultRegistry, "/cosmos.auth.BaseAccount")
export class BaseAccount extends Message {
  @cosmosField.bytes(1)
  public readonly address?: Uint8Array;

  @cosmosField.bytes(2)
  public readonly pub_key?: Uint8Array;

  @cosmosField.uint64(3)
  public readonly account_number?: Long | number;

  @cosmosField.uint64(4)
  public readonly sequence?: Long | number;
}
