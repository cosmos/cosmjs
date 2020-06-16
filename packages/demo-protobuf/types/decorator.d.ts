import { Message } from "protobufjs";
import { Registry } from "./registry";
export declare const myRegistry: Registry;
export declare class MsgDemo extends Message<{}> {
  readonly example: string;
}
