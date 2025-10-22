import { fromHex } from "@cosmjs/encoding";

import { jCheckNonEmptyString, jCheckNonZeroNumber } from "./jsonchecks";

describe("jCheckNonEmptyString", () => {
  it("throws for wrong input type", () => {
    expect(() => jCheckNonEmptyString(0 as unknown as string)).toThrowError(/must be a string/i);
    expect(() => jCheckNonEmptyString(123 as unknown as string)).toThrowError(/must be a string/i);
    expect(() => jCheckNonEmptyString(false as unknown as string)).toThrowError(/must be a string/i);
    expect(() => jCheckNonEmptyString(true as unknown as string)).toThrowError(/must be a string/i);
    expect(() => jCheckNonEmptyString(fromHex("") as unknown as string)).toThrowError(/must be a string/i);
    expect(() => jCheckNonEmptyString(fromHex("aa") as unknown as string)).toThrowError(/must be a string/i);
  });

  it("throws for empty string", () => {
    expect(() => jCheckNonEmptyString("")).toThrowError(/must not be empty/i);
  });

  it("returns input otherwise", () => {
    expect(jCheckNonEmptyString("ab")).toEqual("ab");
  });
});

describe("jCheckNonZeroNumber", () => {
  it("throws for wrong input type", () => {
    expect(() => jCheckNonZeroNumber("" as unknown as number)).toThrowError(/must be a number/i);
    expect(() => jCheckNonZeroNumber("ab" as unknown as number)).toThrowError(/must be a number/i);
    expect(() => jCheckNonZeroNumber(false as unknown as number)).toThrowError(/must be a number/i);
    expect(() => jCheckNonZeroNumber(true as unknown as number)).toThrowError(/must be a number/i);
    expect(() => jCheckNonZeroNumber(fromHex("") as unknown as number)).toThrowError(/must be a number/i);
    expect(() => jCheckNonZeroNumber(fromHex("aa") as unknown as number)).toThrowError(/must be a number/i);
  });

  it("throws for zero number", () => {
    expect(() => jCheckNonZeroNumber(0)).toThrowError(/must not be zero/i);
    expect(() => jCheckNonZeroNumber(-0)).toThrowError(/must not be zero/i);
  });

  it("returns input otherwise", () => {
    expect(jCheckNonZeroNumber(17)).toEqual(17);
  });
});
