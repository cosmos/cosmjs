// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg || "condition is not truthy");
  }
}

export function assertDefinedAndNotNull<T>(value: T | undefined | null, msg?: string): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error(msg ?? "value is undefined or null");
  }
}
