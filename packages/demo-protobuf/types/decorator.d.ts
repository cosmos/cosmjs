import { Constructor, Message, TypeDecorator } from "protobufjs";
import { Registry } from "./registry";
export declare function cosmosMessage(registry: Registry, typeUrl: string): TypeDecorator<any>;
/**
 * Like PropertyDecorator from lib.es5.d.ts but without symbol support in propertyKey.
 */
export declare type FieldDecorator = (target: object, propertyKey: string) => void;
export declare const cosmosField: {
  boolean: (id: number) => FieldDecorator;
  string: (id: number) => FieldDecorator;
  bytes: (id: number) => FieldDecorator;
  int64: (id: number) => FieldDecorator;
  uint64: (id: number) => FieldDecorator;
  message: (id: number, ctor: Constructor<Message<{}>>) => FieldDecorator;
  repeatedString: (id: number) => FieldDecorator;
  repeatedMessage: (id: number, ctor: Constructor<Message<{}>>) => FieldDecorator;
};
