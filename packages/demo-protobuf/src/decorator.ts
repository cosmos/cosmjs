import { Constructor, Field, Message, TypeDecorator, util } from "protobufjs";

import { Registry } from "./registry";

export const myRegistry = new Registry();

function getTypeName(typeUrl: string): string {
  const parts = typeUrl.split(".");
  return parts[parts.length - 1];
}

function CosmosMessage(registry: Registry, typeUrl: string): TypeDecorator<any> {
  return (constructor: Constructor<Message<any>>) => {
    const typeName = getTypeName(typeUrl);
    const generatedType = util.decorateType(constructor, typeName);
    registry.register(typeUrl, generatedType);
  };
}

const CosmosField = {
  String: (id: number) => Field.d(id, "string"),
};

@CosmosMessage(myRegistry, "/demo.MsgDemo")
export class MsgDemo extends Message<{}> {
  @CosmosField.String(1)
  public readonly example: string = "";
}
