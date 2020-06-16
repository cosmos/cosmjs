import protobuf from "protobufjs";
export declare type GeneratedType = {
  readonly create: (properties?: { [k: string]: any }) => protobuf.Message<{}>;
  readonly encode: (
    message:
      | protobuf.Message<{}>
      | {
          [k: string]: any;
        },
    writer?: protobuf.Writer,
  ) => protobuf.Writer;
  readonly decode: (reader: protobuf.Reader | Uint8Array, length?: number) => protobuf.Message<{}>;
};
export declare class Registry {
  private readonly types;
  constructor(customTypes?: Iterable<[string, GeneratedType]>);
  lookupType(name: string): GeneratedType | undefined;
}
