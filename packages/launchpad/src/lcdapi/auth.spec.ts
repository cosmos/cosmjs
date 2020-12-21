/* eslint-disable @typescript-eslint/naming-convention */
import {
  faucet,
  launchpad,
  makeRandomAddress,
  nonNegativeIntegerMatcher,
  pendingWithoutLaunchpad,
  unused,
} from "../testutils.spec";
import { AuthExtension, setupAuthExtension } from "./auth";
import { LcdClient } from "./lcdclient";

function makeAuthClient(apiUrl: string): LcdClient & AuthExtension {
  return LcdClient.withExtensions({ apiUrl }, setupAuthExtension);
}

describe("AuthExtension", () => {
  it("works for unused account without pubkey", async () => {
    pendingWithoutLaunchpad();
    const client = makeAuthClient(launchpad.endpoint);
    const { height, result } = await client.auth.account(unused.address);
    expect(height).toMatch(nonNegativeIntegerMatcher);
    expect(result).toEqual({
      type: "cosmos-sdk/Account",
      value: {
        address: unused.address,
        public_key: null, // not known to the chain
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
        account_number: unused.accountNumber.toString(),
        sequence: unused.sequence.toString(),
      },
    });
  });

  // This fails in the first test run if you forget to run `./scripts/launchpad/init.sh`
  it("has correct pubkey for faucet", async () => {
    pendingWithoutLaunchpad();
    const client = makeAuthClient(launchpad.endpoint);
    const { result } = await client.auth.account(faucet.address0);
    expect(result.value).toEqual(
      jasmine.objectContaining({
        public_key: faucet.pubkey0,
      }),
    );
  });

  // This property is used by CosmWasmClient.getAccount
  it("returns empty address for non-existent account", async () => {
    pendingWithoutLaunchpad();
    const client = makeAuthClient(launchpad.endpoint);
    const nonExistentAccount = makeRandomAddress();
    const { result } = await client.auth.account(nonExistentAccount);
    expect(result).toEqual({
      type: "cosmos-sdk/Account",
      value: jasmine.objectContaining({ address: "" }),
    });
  });
});
