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

// these grpc query types come from:
// https://github.com/cosmos/cosmos-sdk/blob/69bbb8b327c3cfb967d969bcadeb9b0aef144df6/proto/cosmos/bank/query.proto#L40-L55

export class PageResponse extends Message {
  // next_key is the key to be passed to PageRequest.key to
  // query the next page most efficiently
  @cosmosField.bytes(1)
  public readonly next_key?: Uint8Array;

  // total is total number of results available if PageRequest.count_total
  // was set, its value is undefined otherwise
  @cosmosField.uint64(2)
  public readonly total?: Long | number;
}

export class QueryAllBalancesRequest extends Message {
  @cosmosField.bytes(1)
  public readonly address?: Uint8Array;
}

export class QueryAllBalancesResponse extends Message {
  @cosmosField.repeatedMessage(1, Coin)
  public readonly balances?: readonly Coin[];

  @cosmosField.message(2, PageResponse)
  public readonly pagination?: Uint8Array;
}
