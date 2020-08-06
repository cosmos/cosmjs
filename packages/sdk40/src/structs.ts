/* eslint-disable @typescript-eslint/naming-convention */
import { cosmosField, cosmosMessage, Registry } from "@cosmjs/proto-signing";
import { Message } from "protobufjs";

export const defaultRegistry = new Registry();

@cosmosMessage(defaultRegistry, "/cosmos.Coin")
export class Coin extends Message {
  @cosmosField.string(1)
  public readonly denom?: string;

  @cosmosField.string(2)
  public readonly amount?: string;
}

@cosmosMessage(defaultRegistry, "/cosmos.auth.BaseAccount")
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
