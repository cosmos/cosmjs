import { base64 } from "@scure/base";

export function toBase64(data: Uint8Array): string {
  return base64.encode(data);
}

export function fromBase64(base64String: string): Uint8Array {
  if (!base64String.match(/^[a-zA-Z0-9+/]*={0,2}$/)) {
    throw new Error("Invalid base64 string format");
  }
  return base64.decode(base64String);
}
