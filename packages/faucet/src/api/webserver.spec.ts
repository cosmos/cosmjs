import { makeCosmoshubPath } from "@cosmjs/stargate";
import { sleep } from "@cosmjs/utils";

import { Faucet } from "../faucet";
import { simappEnabled } from "../testutils";
import { TokenConfiguration } from "../tokenmanager";
import { ChainConstants, Webserver } from "./webserver";

const defaultTokenConfig: TokenConfiguration = {
  bankTokens: ["ucosm", "ustake"],
};
const defaultAddressPrefix = "cosmos";

const faucetMnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";

const testingPort = 62222;

(simappEnabled ? describe : describe.skip)("Webserver", () => {
  const pathBuilder = makeCosmoshubPath;

  const rpcUrl = "http://localhost:26658";
  let originalEnvVariable: string | undefined;

  beforeAll(() => {
    originalEnvVariable = process.env.FAUCET_CREDIT_AMOUNT_USTAKE;
    process.env.FAUCET_CREDIT_AMOUNT_USTAKE = "100000";
  });

  afterAll(() => {
    process.env.FAUCET_CREDIT_AMOUNT_USTAKE = originalEnvVariable;
  });

  it("can be constructed and started", async () => {
    const faucet = await Faucet.make(
      rpcUrl,
      defaultAddressPrefix,
      defaultTokenConfig,
      faucetMnemonic,
      pathBuilder,
      3,
      true,
    );
    expect(faucet).toBeTruthy();

    const constants: ChainConstants = {
      nodeUrl: rpcUrl,
      chainId: "no idea bro",
    };

    const server = new Webserver(faucet, constants);
    expect(server).toBeTruthy();
    server.start(testingPort);
    await sleep(2_000);

    const healthz = await fetch(`http://localhost:${testingPort}/healthz`);
    expect(healthz.ok);

    const status = await fetch(`http://localhost:${testingPort}/status`);
    expect(status.ok);
  });
});
