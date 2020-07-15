// Global symbols in some environments
// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
// https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
/* eslint-disable-next-line @typescript-eslint/naming-convention */
declare const TextEncoder: any | undefined;
/* eslint-disable-next-line @typescript-eslint/naming-convention */
declare const TextDecoder: any | undefined;

function isValidUtf8(data: Uint8Array): boolean {
  const toStringAndBack = Buffer.from(Buffer.from(data).toString("utf8"), "utf8");
  return Buffer.compare(Buffer.from(data), toStringAndBack) === 0;
}

export function toUtf8(str: string): Uint8Array {
  // Browser and future nodejs (https://github.com/nodejs/node/issues/20365)
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(str);
  }

  // Use Buffer hack instead of nodejs util.TextEncoder to ensure
  // webpack does not bundle the util module for browsers.
  return new Uint8Array(Buffer.from(str, "utf8"));
}

export function fromUtf8(data: Uint8Array): string {
  // Browser and future nodejs (https://github.com/nodejs/node/issues/20365)
  if (typeof TextDecoder !== "undefined") {
    return new TextDecoder("utf-8", { fatal: true }).decode(data);
  }

  // Use Buffer hack instead of nodejs util.TextDecoder to ensure
  // webpack does not bundle the util module for browsers.
  // Buffer.toString has no fatal option
  if (!isValidUtf8(data)) {
    throw new Error("Invalid UTF8 data");
  }
  return Buffer.from(data).toString("utf8");
}
