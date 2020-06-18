import { TypeDecorator } from "protobufjs";
import { Registry } from "./registry";
export declare function CosmosMessage(registry: Registry, typeUrl: string): TypeDecorator<any>;
export declare const CosmosField: {
  String: (id: number) => import("protobufjs").FieldDecorator;
};
