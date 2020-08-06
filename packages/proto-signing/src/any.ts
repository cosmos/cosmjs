import { google } from "./generated/codecimpl";

/**
 * Decodes a serialized [google.protobuf.Any](https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/any.proto)
 * and returns the components.
 */
export function decodeAny(serialized: Uint8Array): { readonly typeUrl: string; readonly value: Uint8Array } {
  const envelope = google.protobuf.Any.decode(serialized);
  return {
    typeUrl: envelope.type_url,
    value: envelope.value,
  };
}
