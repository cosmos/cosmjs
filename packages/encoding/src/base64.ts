import * as base64js from "base64-js";

export function toBase64(data: Uint8Array): string {
  return base64js.fromByteArray(data);
}

export function fromBase64(base64String: string): Uint8Array {
  if (!base64String.match(/^[a-zA-Z0-9+/]*={0,2}$/)) {
    throw new Error("Invalid base64 string format");
  }
  return base64js.toByteArray(base64String);
}
