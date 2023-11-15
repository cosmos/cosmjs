import { omitDefault } from "./omitdefault";

describe("omitDefault", () => {
  it("works for numbers", () => {
    expect(omitDefault(17)).toEqual(17);
    expect(omitDefault(0)).toEqual(undefined);
  });

  it("works for bigint", () => {
    expect(omitDefault(17n)).toEqual(17n);
    expect(omitDefault(0n)).toEqual(undefined);
  });

  it("works for boolean", () => {
    expect(omitDefault(true)).toEqual(true);
    expect(omitDefault(false)).toEqual(undefined);
  });

  it("works for strings", () => {
    expect(omitDefault("hi")).toEqual("hi");
    expect(omitDefault("")).toEqual(undefined);
  });
});
