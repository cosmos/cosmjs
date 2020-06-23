import { Constructor, Message, TypeDecorator } from "protobufjs";
import { Registry } from "./registry";
export declare function CosmosMessage(registry: Registry, typeUrl: string): TypeDecorator<any>;
/**
 * Like PropertyDecorator from lib.es5.d.ts but without symbol support in propertyKey.
 */
export declare type FieldDecorator = (target: object, propertyKey: string) => void;
export declare const CosmosField: {
  Boolean: (id: number) => FieldDecorator;
  String: (id: number) => FieldDecorator;
  Bytes: (id: number) => FieldDecorator;
  Int64: (id: number) => FieldDecorator;
  Uint64: (id: number) => FieldDecorator;
  RepeatedString: (id: number) => FieldDecorator;
  Nested: (id: number, ctor: Constructor<Message<{}>>) => FieldDecorator;
};
