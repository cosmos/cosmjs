import { Slip10RawIndex } from "@iov/crypto";

export function debugPath(path: readonly Slip10RawIndex[]): string {
  return path.reduce((current, component): string => {
    const componentString = component.isHardened()
      ? `${component.toNumber() - 2 ** 31}'`
      : component.toString();
    return current + "/" + componentString;
  }, "m");
}
