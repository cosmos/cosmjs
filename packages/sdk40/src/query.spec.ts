import Long from "long";

/* eslint-disable @typescript-eslint/naming-convention */
import { Bech32, toAscii } from "@cosmjs/encoding";
import { Secp256k1Wallet } from "@cosmjs/launchpad";
import { cosmos, google } from "@cosmjs/proto-signing";
import { Client } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";

import { BaseAccount, Coin } from "./structs";

export function pendingWithoutSimapp(): void {
  if (!process.env.SIMAPP_ENABLED) {
    return pending("Set SIMAPP_ENABLED to enable Simapp based tests");
  }
}

const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

describe("query account", () => {
  it("decode account data for a genesis account", async () => {
    pendingWithoutSimapp();
    const tendermintUrl = "localhost:26657";
    const client = await Client.connect(tendermintUrl);

    const wallet = await Secp256k1Wallet.fromMnemonic(faucet.mnemonic);
    const [{ address }] = await wallet.getAccounts();
    const binAddress = Bech32.decode(address).data;

    // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L29-L32
    const accountKey = Uint8Array.from([1, ...binAddress]);

    const resp = await client.abciQuery({
      // we need the StoreKey for the module, not the module name
      // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L12
      path: "/store/acc/key",
      data: accountKey,
      prove: false,
    });

    assert(!resp.code);
    expect(resp.key).toEqual(accountKey);

    const envelope = google.protobuf.Any.decode(resp.value);
    expect(envelope.type_url).toEqual("/cosmos.auth.BaseAccount");
    const account = BaseAccount.decode(envelope.value);

    expect(account.address).toEqual(binAddress);
    expect(account.account_number).toEqual(Long.fromInt(1, true));
    expect(account.sequence).toEqual(Long.fromInt(0, true));
  });

  it("decode bank data for a genesis account", async () => {
    pendingWithoutSimapp();
    const tendermintUrl = "localhost:26657";
    const client = await Client.connect(tendermintUrl);

    const wallet = await Secp256k1Wallet.fromMnemonic(faucet.mnemonic);
    const [{ address }] = await wallet.getAccounts();
    const binAddress = Bech32.decode(address).data;

    // balance key is a bit tricker, using some prefix stores
    // https://github.com/cosmwasm/cosmos-sdk/blob/80f7ff62f79777a487d0c7a53c64b0f7e43c47b9/x/bank/keeper/view.go#L74-L77
    // ("balances", binAddress, denom)
    // it seem like prefix stores just do a dumb concat with the keys (no tricks to avoid overlap)
    // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L61-L64
    // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L37-L43
    const bankKey = Uint8Array.from([...toAscii("balances"), ...binAddress, ...toAscii("ucosm")]);

    const resp = await client.abciQuery({
      // we need the StoreKey for the module, in this case same as module name
      // https://github.com/cosmos/cosmos-sdk/blob/5a7e22022cc9dd2e2f9ea72742f3cf1444fe889a/x/bank/types/key.go#L14
      path: "/store/bank/key",
      data: bankKey,
      prove: false,
    });

    assert(!resp.code);
    expect(resp.key).toEqual(bankKey);
    expect(resp.value).toBeDefined();

    const balance = Coin.decode(resp.value);
    console.log(balance);
    expect(balance.denom).toEqual("ucosm");
    expect(balance.amount).toEqual("1000000000");
  });
});
