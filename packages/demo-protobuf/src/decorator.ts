import { Field, Message, Type } from "protobufjs";

import { GeneratedType, Registry } from "./registry";

export const myRegistry = new Registry();

function CosmosMessage(registry: Registry, typeUrl: string) {
  return (generatedType: GeneratedType) => {
    registry.register(typeUrl, generatedType);
  };
}

@CosmosMessage(myRegistry, "/demo.MsgDemo")
@Type.d("MsgDemo")
export class MsgDemo extends Message<{}> {
  @Field.d(1, "string")
  public readonly example: string = "";
}
