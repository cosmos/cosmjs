import { Constructor, Field, Message, TypeDecorator, util } from "protobufjs";

import { Registry } from "./registry";

function getTypeName(typeUrl: string): string {
  const parts = typeUrl.split(".");
  return parts[parts.length - 1];
}

export function cosmosMessage(registry: Registry, typeUrl: string): TypeDecorator<any> {
  return (ctor: Constructor<Message<any>>) => {
    const typeName = getTypeName(typeUrl);
    const generatedType = util.decorateType(ctor, typeName);
    registry.register(typeUrl, generatedType);
  };
}

/**
 * Like PropertyDecorator from lib.es5.d.ts but without symbol support in propertyKey.
 */
export type FieldDecorator = (target: object, propertyKey: string) => void;

export const cosmosField = {
  boolean: (id: number): FieldDecorator => Field.d<boolean>(id, "bool"),

  string: (id: number): FieldDecorator => Field.d<string>(id, "string"),
  bytes: (id: number): FieldDecorator => Field.d<Uint8Array>(id, "bytes"),

  int64: (id: number): FieldDecorator => Field.d<number>(id, "int64"),
  uint64: (id: number): FieldDecorator => Field.d<number>(id, "uint64"),

  nested: (id: number, ctor: Constructor<Message<{}>>): FieldDecorator => Field.d(id, ctor),

  repeatedString: (id: number): FieldDecorator => Field.d<string[]>(id, "string", "repeated"),
  repeatedNested: (id: number, ctor: Constructor<Message<{}>>): FieldDecorator =>
    Field.d(id, ctor, "repeated"),
};
