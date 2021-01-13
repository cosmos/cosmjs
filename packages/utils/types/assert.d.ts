export declare function assert(condition: any, msg?: string): asserts condition;
export declare function assertDefinedAndNotNull<T>(
  value: T | undefined | null,
  msg?: string,
): asserts value is T;
