import { Coin } from "@cosmjs/proto-signing";
import { Message } from "protobufjs";
import { PageRequest, PageResponse } from "./pagination";
export declare class QueryAllBalancesRequest extends Message {
  readonly address?: Uint8Array;
  readonly pagination?: PageRequest;
}
export declare class QueryAllBalancesResponse extends Message {
  readonly balances?: readonly Coin[];
  readonly pagination?: PageResponse;
}
