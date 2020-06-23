/* eslint-disable @typescript-eslint/naming-convention */
import { Constructor, Field, FieldDecorator, Message, TypeDecorator, util } from "protobufjs";

import { Registry } from "./registry";

function getTypeName(typeUrl: string): string {
  const parts = typeUrl.split(".");
  return parts[parts.length - 1];
}

export function CosmosMessage(registry: Registry, typeUrl: string): TypeDecorator<any> {
  return (ctor: Constructor<Message<any>>) => {
    const typeName = getTypeName(typeUrl);
    const generatedType = util.decorateType(ctor, typeName);
    registry.register(typeUrl, generatedType);
  };
}

export const CosmosField = {
  Boolean: (id: number): FieldDecorator => Field.d<boolean>(id, "bool"),

  String: (id: number): FieldDecorator => Field.d<string>(id, "string"),
  Bytes: (id: number): FieldDecorator => Field.d<Uint8Array>(id, "bytes"),

  Int64: (id: number): FieldDecorator => Field.d<number>(id, "int64"),
  Uint64: (id: number): FieldDecorator => Field.d<number>(id, "uint64"),

  RepeatedString: (id: number): FieldDecorator => Field.d<string[]>(id, "string", "repeated"),
  Nested: (id: number, ctor: Constructor<Message>): FieldDecorator => Field.d(id, ctor),
};
