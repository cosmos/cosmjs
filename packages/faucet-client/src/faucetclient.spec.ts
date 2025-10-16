import { FaucetClient } from "./faucetclient";

const enabled = !!globalThis.process?.env.FAUCET_ENABLED;

describe("FaucetClient", () => {
  const faucetUrl = "http://localhost:8000";
  const primaryToken = "ucosm";
  const secondaryToken = "ustake";
  const defaultAddress = "wasm14qemq0vw6y3gc3u3e0aty2e764u4gs5lndxgyk";

  it("can be constructed", () => {
    // http
    expect(new FaucetClient("http://localhost:8000")).toBeTruthy();
    expect(new FaucetClient("http://localhost:8000/")).toBeTruthy();
    expect(new FaucetClient("http://localhost")).toBeTruthy();
    expect(new FaucetClient("http://localhost/")).toBeTruthy();
    // https
    expect(new FaucetClient("https://localhost:8000")).toBeTruthy();
    expect(new FaucetClient("https://localhost:8000/")).toBeTruthy();
    expect(new FaucetClient("https://localhost")).toBeTruthy();
    expect(new FaucetClient("https://localhost/")).toBeTruthy();
  });

  (enabled ? it : it.skip)("can be used to credit a wallet", async () => {
    const faucet = new FaucetClient(faucetUrl);
    await faucet.credit(defaultAddress, primaryToken);
  });

  (enabled ? it : it.skip)("can be used to credit a wallet with a different token", async () => {
    const faucet = new FaucetClient(faucetUrl);
    await faucet.credit(defaultAddress, secondaryToken);
  });

  (enabled ? it : it.skip)("throws for invalid ticker", async () => {
    const faucet = new FaucetClient(faucetUrl);
    await expect(faucet.credit(defaultAddress, "ETH")).rejects.toThrowError(/token is not available/i);
  });

  (enabled ? it : it.skip)("throws for invalid address", async () => {
    const faucet = new FaucetClient(faucetUrl);

    for (const address of ["be5cc2cc05db2cdb4313c18306a5157291cfdcd1", "1234L"]) {
      await expect(faucet.credit(address, primaryToken)).rejects.toThrowError(
        /address is not in the expected format for this chain/i,
      );
    }
  });
});
