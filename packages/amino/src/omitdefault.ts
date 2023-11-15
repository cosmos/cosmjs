/**
 * Returns the given input. If the input is the default value
 * of protobuf, undefined is retunred. Use this when creating Amino JSON converters.
 */
export function omitDefault<T extends string | number | bigint | boolean>(input: T): T | undefined {
  switch (typeof input) {
    case "string":
      return input === "" ? undefined : input;
    case "number":
      return input === 0 ? undefined : input;
    case "bigint":
      return input === BigInt(0) ? undefined : input;
    case "boolean":
      return !input ? undefined : input;
    default:
      throw new Error(`Got unsupported type '${typeof input}'`);
  }
}
