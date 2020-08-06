/// <reference types="long" />
import { Message } from "protobufjs";
export declare class PageRequest extends Message {}
export declare class PageResponse extends Message {
  readonly nextKey?: Uint8Array;
  readonly total?: Long | number;
}
