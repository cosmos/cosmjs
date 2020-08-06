/* eslint-disable @typescript-eslint/naming-convention */
import { Bech32 } from "@cosmjs/encoding";
import { Secp256k1Wallet } from "@cosmjs/launchpad";
import { Client } from "@cosmjs/tendermint-rpc";
import Long from "long";

import { getAccount, getBalance, getUnverifiedAllBalances } from "./query";
import { BaseAccount } from "./structs";

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

    const envelope = await getAccount(client, address);

    expect(envelope.type_url).toEqual("/cosmos.auth.BaseAccount");
    const account = BaseAccount.decode(envelope.value);

    expect(account.address).toEqual(Bech32.decode(address).data);
    expect(account.account_number).toEqual(Long.fromInt(1, true));
    expect(account.sequence).toEqual(Long.fromInt(0, true));
  });

  it("decode bank data for a genesis account", async () => {
    pendingWithoutSimapp();
    const tendermintUrl = "localhost:26657";
    const client = await Client.connect(tendermintUrl);

    const wallet = await Secp256k1Wallet.fromMnemonic(faucet.mnemonic);
    const [{ address }] = await wallet.getAccounts();

    const balance = await getBalance(client, address, "ucosm");
    expect(balance.denom).toEqual("ucosm");
    expect(balance.amount).toEqual("1000000000");
  });

  it("gets all balances for genesis account using grpc types", async () => {
    pendingWithoutSimapp();
    const tendermintUrl = "localhost:26657";
    const client = await Client.connect(tendermintUrl);

    const wallet = await Secp256k1Wallet.fromMnemonic(faucet.mnemonic);
    const [{ address }] = await wallet.getAccounts();

    const balance = await getUnverifiedAllBalances(client, address);
    expect(balance.length).toEqual(2);
    expect(balance[0].denom).toEqual("ucosm");
    expect(balance[0].amount).toEqual("1000000000");
    expect(balance[1].denom).toEqual("ustake");
    expect(balance[1].amount).toEqual("1000000000");
  });
});
