/// <reference types="long" />
import { Message } from "protobufjs";
import { Registry } from "./registry";
export declare const defaultRegistry: Registry;
export declare class Coin extends Message {
  readonly denom?: string;
  readonly amount?: string;
}
export declare class MsgSend extends Message {
  readonly from_address?: Uint8Array;
  readonly to_address?: Uint8Array;
  readonly amount?: readonly Coin[];
}
export declare class BaseAccount extends Message {
  readonly address?: Uint8Array;
  readonly pub_key?: Uint8Array;
  readonly account_number?: Long | number;
  readonly sequence?: Long | number;
}
