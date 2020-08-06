import { Coin, cosmosField } from "@cosmjs/proto-signing";
import { Message } from "protobufjs";

import { PageRequest, PageResponse } from "./pagination";

// these grpc query types come from:
// https://github.com/cosmos/cosmos-sdk/blob/69bbb8b327c3cfb967d969bcadeb9b0aef144df6/proto/cosmos/bank/query.proto#L40-L55

export class QueryAllBalancesRequest extends Message {
  @cosmosField.bytes(1)
  public readonly address?: Uint8Array;

  @cosmosField.message(2, PageRequest)
  public readonly pagination?: PageRequest;
}

export class QueryAllBalancesResponse extends Message {
  @cosmosField.repeatedMessage(1, Coin)
  public readonly balances?: readonly Coin[];

  @cosmosField.message(2, PageResponse)
  public readonly pagination?: PageResponse;
}
