/* eslint-disable @typescript-eslint/naming-convention */
import { Message } from "protobufjs";

import { cosmosField } from "./decorator";

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
