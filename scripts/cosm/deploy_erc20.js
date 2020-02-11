#!/usr/bin/env node

/* eslint-disable @typescript-eslint/camelcase */
const { CosmWasmClient, encodeSecp256k1Signature, Secp256k1Pen } = require("@cosmwasm/sdk");
const fs = require("fs");

const httpUrl = "http://localhost:1317";
const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};
const unusedAccount = "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u";

const initMsgAsh = {
  decimals: 5,
  name: "Ash token",
  symbol: "ASH",
  initial_balances: [
    {
      address: faucet.address,
      amount: "11",
    },
    {
      address: unusedAccount,
      amount: "12812345",
    },
  ],
};
const initMsgBash = {
  decimals: 0,
  name: "Bash Token",
  symbol: "BASH",
  initial_balances: [
    {
      address: faucet.address,
      amount: "999999999",
    },
    {
      address: unusedAccount,
      amount: "42",
    },
  ],
};
const initMsgCash = {
  decimals: 18,
  name: "Cash Token",
  symbol: "CASH",
  initial_balances: [
    {
      address: faucet.address,
      amount: "189189189000000000000000000", // 189189189 CASH
    },
  ],
};

async function main() {
  const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
  const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, async signBytes => {
    return encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
  });

  const wasm = fs.readFileSync(__dirname + "/contracts/cw-erc20.wasm");
  const codeId = await client.upload(wasm, "Upload ERC20 contract");
  console.info(`Upload succeeded. Code ID is ${codeId}`);

  for (const initMsg of [initMsgAsh, initMsgBash, initMsgCash]) {
    const memo = `Create an ERC20 instance for ${initMsg.symbol}`;
    const contractAddress = await client.instantiate(codeId, initMsg, memo);
    console.info(`Contract instantiated for ${initMsg.symbol} at ${contractAddress}`);
  }
}

main().then(
  () => {
    console.info("All done, let the coins flow.");
    process.exit(0);
  },
  error => {
    console.error(error);
    process.exit(1);
  },
);
