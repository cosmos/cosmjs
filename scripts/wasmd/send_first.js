#!/usr/bin/env node

/* eslint-disable @typescript-eslint/naming-convention */
const { Random } = require("@cosmjs/crypto");
const { Bech32 } = require("@cosmjs/encoding");
const { coins, Secp256k1Wallet, SigningCosmosClient, assertIsPostTxSuccess } = require("@cosmjs/sdk38");

const httpUrl = "http://localhost:1317";
const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  address0: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

async function main() {
  const wallet = await Secp256k1Wallet.fromMnemonic(faucet.mnemonic);
  const client = new SigningCosmosClient(httpUrl, faucet.address0, wallet);
  const recipient = Bech32.encode("cosmos", Random.getBytes(20));
  const amount = coins(226644, "ucosm");
  const memo = "Ensure chain has my pubkey";
  const sendResult = await client.sendTokens(recipient, amount, memo);
  assertIsPostTxSuccess(sendResult);
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
