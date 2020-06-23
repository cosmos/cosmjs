import { Constructor, FieldDecorator, Message, TypeDecorator } from "protobufjs";
import { Registry } from "./registry";
export declare function CosmosMessage(registry: Registry, typeUrl: string): TypeDecorator<any>;
export declare const CosmosField: {
  Boolean: (id: number) => FieldDecorator;
  String: (id: number) => FieldDecorator;
  Bytes: (id: number) => FieldDecorator;
  Int64: (id: number) => FieldDecorator;
  Uint64: (id: number) => FieldDecorator;
  RepeatedString: (id: number) => FieldDecorator;
  Nested: (id: number, ctor: Constructor<Message>) => FieldDecorator;
};
