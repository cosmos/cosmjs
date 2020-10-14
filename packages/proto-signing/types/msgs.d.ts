import { Message } from "protobufjs";
import { Registry } from "./registry";
export declare const defaultRegistry: Registry;
export declare class Coin extends Message {
  readonly denom?: string;
  readonly amount?: string;
}
export declare class MsgSend extends Message {
  readonly from_address?: string;
  readonly to_address?: string;
  readonly amount?: readonly Coin[];
}
