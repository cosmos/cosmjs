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
