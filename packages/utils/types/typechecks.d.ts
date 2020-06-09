/**
 * Checks if data is a non-null object (i.e. matches the TypeScript object type)
 */
export declare function isNonNullObject(data: unknown): data is object;
/**
 * Checks if data is an Uint8Array. Note: Buffer is treated as not a Uint8Array
 */
export declare function isUint8Array(data: unknown): data is Uint8Array;
