import { Constructor, Field, Message, TypeDecorator, util } from "protobufjs";

import { Registry } from "./registry";

function getTypeName(typeUrl: string): string {
  const parts = typeUrl.split(".");
  return parts[parts.length - 1];
}

export function CosmosMessage(registry: Registry, typeUrl: string): TypeDecorator<any> {
  return (constructor: Constructor<Message<any>>) => {
    const typeName = getTypeName(typeUrl);
    const generatedType = util.decorateType(constructor, typeName);
    registry.register(typeUrl, generatedType);
  };
}

export const CosmosField = {
  String: (id: number) => Field.d(id, "string"),
};
