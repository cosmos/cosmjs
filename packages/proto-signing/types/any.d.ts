/**
 * Decodes a serialized [google.protobuf.Any](https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/any.proto)
 * and returns the components.
 */
export declare function decodeAny(
  serialized: Uint8Array,
): {
  readonly typeUrl: string;
  readonly value: Uint8Array;
};
