import { cosmosField } from "@cosmjs/proto-signing";
import { Message } from "protobufjs";

export class PageRequest extends Message {
  // TODO: implement
}

export class PageResponse extends Message {
  // next_key is the key to be passed to PageRequest.key to
  // query the next page most efficiently
  @cosmosField.bytes(1)
  public readonly nextKey?: Uint8Array;

  // total is total number of results available if PageRequest.count_total
  // was set, its value is undefined otherwise
  @cosmosField.uint64(2)
  public readonly total?: Long | number;
}
