#!/usr/bin/env node

/* eslint-disable @typescript-eslint/camelcase */
const { SigningCosmWasmClient, Secp256k1Pen } = require("@cosmwasm/sdk");
const fs = require("fs");

const httpUrl = "http://localhost:1317";
const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};
const unused = {
  address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
};
const guest = {
  address: "cosmos17d0jcz59jf68g52vq38tuuncmwwjk42u6mcxej",
};

const codeMeta = {
  source: "https://crates.io/api/v1/crates/cw-erc20/0.2.0/download",
  builder: "confio/cosmwasm-opt:0.7.0",
};

const initMsgHash = {
  decimals: 5,
  name: "Hash token",
  symbol: "HASH",
  initial_balances: [
    {
      address: faucet.address,
      amount: "11",
    },
    {
      address: unused.address,
      amount: "12812345",
    },
    {
      address: guest.address,
      amount: "22004000000",
    },
  ],
};
const initMsgIsa = {
  decimals: 0,
  name: "Isa Token",
  symbol: "ISA",
  initial_balances: [
    {
      address: faucet.address,
      amount: "999999999",
    },
    {
      address: unused.address,
      amount: "42",
    },
  ],
};
const initMsgJade = {
  decimals: 18,
  name: "Jade Token",
  symbol: "JADE",
  initial_balances: [
    {
      address: faucet.address,
      amount: "189189189000000000000000000", // 189189189 JADE
    },
    {
      address: guest.address,
      amount: "189500000000000000000", // 189.5 JADE
    },
  ],
};

async function main() {
  const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
  const client = new SigningCosmWasmClient(httpUrl, faucet.address, signBytes => pen.sign(signBytes));

  const wasm = fs.readFileSync(__dirname + "/contracts/cw-erc20.wasm");
  const uploadReceipt = await client.upload(wasm, codeMeta, "Upload ERC20 contract");
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  for (const initMsg of [initMsgHash, initMsgIsa, initMsgJade]) {
    const memo = `Create an ERC20 instance for ${initMsg.symbol}`;
    const contractAddress = await client.instantiate(uploadReceipt.codeId, initMsg, initMsg.symbol, memo);
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
