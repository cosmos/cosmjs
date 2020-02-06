import { wrapInAsyncFunction } from "./async";

describe("async", () => {
  it("can convert wrap code in async function", () => {
    expect(wrapInAsyncFunction("")).toMatch(/\(async \(\) => {\s+}\)\(\)/);
    expect(wrapInAsyncFunction("  ")).toMatch(/\(async \(\) => {\s+}\)\(\)/);
    expect(wrapInAsyncFunction("\n")).toMatch(/\(async \(\) => {\s+}\)\(\)/);
    expect(wrapInAsyncFunction(" \n ")).toMatch(/\(async \(\) => {\s+}\)\(\)/);

    // locals become globals
    expect(wrapInAsyncFunction("var a = 1;")).toMatch(/\(async \(\) => {\s+a = 1;\s+}\)\(\)/);
    expect(wrapInAsyncFunction("const a = Date.now();")).toMatch(
      /\(async \(\) => {\s+a = Date.now\(\);\s+}\)\(\)/,
    );

    // expressions
    expect(wrapInAsyncFunction("1")).toMatch(/\(async \(\) => {\s+return 1;\s+}\)\(\)/);
    expect(wrapInAsyncFunction("1;")).toMatch(/\(async \(\) => {\s+return 1;;\s+}\)\(\)/);
    expect(wrapInAsyncFunction("a+b")).toMatch(/\(async \(\) => {\s+return a\+b;\s+}\)\(\)/);
    expect(wrapInAsyncFunction("a++")).toMatch(/\(async \(\) => {\s+return a\+\+;\s+}\)\(\)/);
    expect(wrapInAsyncFunction("Date.now()")).toMatch(/\(async \(\) => {\s+return Date.now\(\);\s+}\)\(\)/);
    expect(wrapInAsyncFunction("(1)")).toMatch(/\(async \(\) => {\s+return \(1\);\s+}\)\(\)/);

    // multiple statements
    expect(wrapInAsyncFunction("var a = 1; var b = 2;")).toMatch(
      /\(async \(\) => {\s+a = 1;\s+b = 2;\s+}\)\(\)/,
    );
    expect(wrapInAsyncFunction("var a = 1; a")).toMatch(/\(async \(\) => {\s+a = 1;\s+return a;\s+}\)\(\)/);

    // comments
    expect(wrapInAsyncFunction("/* abcd */")).toMatch(/\(async \(\) => {\s+\/\* abcd \*\/\s+}\)\(\)/);
    expect(wrapInAsyncFunction("// abcd")).toMatch(/\(async \(\) => {\s+\/\/ abcd\s+}\)\(\)/);
  });
});
