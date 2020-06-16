import protobuf from "protobufjs";
interface GeneratedType {
  readonly create: (properties?: { [k: string]: any }) => any;
  readonly encode: (
    message:
      | any
      | {
          [k: string]: any;
        },
    writer?: protobuf.Writer,
  ) => protobuf.Writer;
  readonly decode: (reader: protobuf.Reader | Uint8Array, length?: number) => any;
}
export declare class Registry {
  private readonly types;
  constructor(customTypes?: Iterable<[string, GeneratedType]>);
  lookupType(name: string): GeneratedType | undefined;
}
export {};
