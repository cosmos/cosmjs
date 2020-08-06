/// <reference types="long" />
import { Registry } from "@cosmjs/proto-signing";
import { Message } from "protobufjs";
export declare const defaultRegistry: Registry;
export declare class Coin extends Message {
  readonly denom?: string;
  readonly amount?: string;
}
export declare class BaseAccount extends Message {
  readonly address?: Uint8Array;
  readonly pub_key?: Uint8Array;
  readonly account_number?: Long | number;
  readonly sequence?: Long | number;
}
export declare class PageResponse extends Message {
  readonly next_key?: Uint8Array;
  readonly total?: Long | number;
}
export declare class QueryAllBalancesRequest extends Message {
  readonly address?: Uint8Array;
}
export declare class QueryAllBalancesResponse extends Message {
  readonly balances?: readonly Coin[];
  readonly pagination?: Uint8Array;
}
