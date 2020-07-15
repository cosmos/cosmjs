/* eslint-disable @typescript-eslint/naming-convention */
import { encodeBech32Pubkey } from "../pubkey";
import {
  faucet,
  makeRandomAddress,
  nonNegativeIntegerMatcher,
  pendingWithoutWasmd,
  unused,
  wasmd,
} from "../testutils.spec";
import { AuthExtension, setupAuthExtension } from "./auth";
import { LcdClient } from "./lcdclient";

function makeAuthClient(apiUrl: string): LcdClient & AuthExtension {
  return LcdClient.withExtensions({ apiUrl }, setupAuthExtension);
}

describe("AuthExtension", () => {
  it("works for unused account without pubkey", async () => {
    pendingWithoutWasmd();
    const client = makeAuthClient(wasmd.endpoint);
    const { height, result } = await client.auth.account(unused.address);
    expect(height).toMatch(nonNegativeIntegerMatcher);
    expect(result).toEqual({
      type: "cosmos-sdk/Account",
      value: {
        address: unused.address,
        public_key: "", // not known to the chain
        coins: [
          {
            amount: "1000000000",
            denom: "ucosm",
          },
          {
            amount: "1000000000",
            denom: "ustake",
          },
        ],
        account_number: unused.accountNumber,
        sequence: 0,
      },
    });
  });

  // This fails in the first test run if you forget to run `./scripts/wasmd/init.sh`
  it("has correct pubkey for faucet", async () => {
    pendingWithoutWasmd();
    const client = makeAuthClient(wasmd.endpoint);
    const { result } = await client.auth.account(faucet.address);
    expect(result.value).toEqual(
      jasmine.objectContaining({
        public_key: encodeBech32Pubkey(faucet.pubkey, "cosmospub"),
      }),
    );
  });

  // This property is used by CosmWasmClient.getAccount
  it("returns empty address for non-existent account", async () => {
    pendingWithoutWasmd();
    const client = makeAuthClient(wasmd.endpoint);
    const nonExistentAccount = makeRandomAddress();
    const { result } = await client.auth.account(nonExistentAccount);
    expect(result).toEqual({
      type: "cosmos-sdk/Account",
      value: jasmine.objectContaining({ address: "" }),
    });
  });
});
