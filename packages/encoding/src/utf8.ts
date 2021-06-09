/* eslint-disable @typescript-eslint/naming-convention */
// Global symbols in both browsers and Node.js since v11
// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
// https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
// https://nodejs.org/docs/latest-v12.x/api/util.html#util_class_util_textencoder
// https://nodejs.org/docs/latest-v12.x/api/util.html#util_class_util_textdecoder
// See https://github.com/microsoft/TypeScript/issues/31535
declare const TextEncoder: any;
declare const TextDecoder: any;

export function toUtf8(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

export function fromUtf8(data: Uint8Array): string {
  return new TextDecoder("utf-8", { fatal: true }).decode(data);
}
