import { join } from "path";

import { TsRepl } from "./tsrepl";

const tsConfigPath = join(__dirname, "..", "tsconfig_repl.json");

describe("TsRepl", () => {
  it("can be constructed", () => {
    const noCode = new TsRepl(tsConfigPath, "");
    expect(noCode).toBeTruthy();

    const jsCode = new TsRepl(tsConfigPath, "const a = 'foo'");
    expect(jsCode).toBeTruthy();

    const tsCode = new TsRepl(tsConfigPath, "const a: string = 'foo'");
    expect(tsCode).toBeTruthy();
  });

  it("can be started", async () => {
    {
      const server = await new TsRepl(tsConfigPath, "").start();
      expect(server).toBeTruthy();
    }
    {
      const server = await new TsRepl(tsConfigPath, "const a = 'foo'").start();
      expect(server).toBeTruthy();
    }
    {
      const server = await new TsRepl(tsConfigPath, "const a: string = 'foo'").start();
      expect(server).toBeTruthy();
    }
  });

  it("errors when starting with broken TypeScript", async () => {
    await new TsRepl(tsConfigPath, "const a: string = 123;")
      .start()
      .then(() => fail("must not resolve"))
      .catch((e) => expect(e).toMatch(/is not assignable to type 'string'/));

    await new TsRepl(tsConfigPath, "const const const;")
      .start()
      .then(() => fail("must not resolve"))
      .catch((e) => expect(e).toMatch(/Variable declaration expected./));
  });

  it("can be started with top level await", async () => {
    {
      const server = await new TsRepl(tsConfigPath, "await 1").start();
      expect(server).toBeTruthy();
    }
    {
      const server = await new TsRepl(tsConfigPath, "await 1 + await 2").start();
      expect(server).toBeTruthy();
    }
  });
});
