import { Field, Message, Type } from "protobufjs";

import { Registry } from "./registry";

export const myRegistry = new Registry();

@Type.d("MsgDemo")
export class MsgDemo extends Message<{}> {
  @Field.d(1, "string")
  public readonly example: string = "";
}

myRegistry.register("/demo.MsgDemo", MsgDemo);
