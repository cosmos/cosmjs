import protobuf from "protobufjs";
export declare class Registry {
  private readonly types;
  constructor(customTypes?: readonly [string, protobuf.Type][]);
  lookupType(name: string): protobuf.Type | undefined;
}
