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

/**
 * Takes UTF-8 data and decodes it to a string.
 *
 * In lossy mode, the replacement character � is used to substitude invalid
 * encodings. By default lossy mode is off and invalid data will lead to exceptions.
 */
export function fromUtf8(data: Uint8Array, lossy = false): string {
  const fatal = !lossy;
  return new TextDecoder("utf-8", { fatal }).decode(data);
}
