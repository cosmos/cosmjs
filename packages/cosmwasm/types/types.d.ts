export interface WasmData {
  readonly key: string;
  readonly val: string;
}
export interface Model {
  readonly key: Uint8Array;
  readonly val: Uint8Array;
}
export declare function parseWasmData({ key, val }: WasmData): Model;
/**
 * An object containing a parsed JSON document. The result of JSON.parse().
 * This doesn't provide any type safety over `any` but expresses intent in the code.
 */
export declare type JsonObject = any;
