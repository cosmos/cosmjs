// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg || "condition is not truthy");
  }
}
