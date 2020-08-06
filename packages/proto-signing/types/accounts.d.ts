/// <reference types="long" />
import { Message } from "protobufjs";
export declare class BaseAccount extends Message {
  readonly address?: Uint8Array;
  readonly pub_key?: Uint8Array;
  readonly account_number?: Long | number;
  readonly sequence?: Long | number;
}
