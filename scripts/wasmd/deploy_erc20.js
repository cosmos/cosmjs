#!/usr/bin/env node

/* eslint-disable @typescript-eslint/camelcase */
const { SigningCosmWasmClient, Secp256k1Pen } = require("@cosmwasm/sdk");
const fs = require("fs");

const httpUrl = "http://localhost:1317";
const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  address0: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
  address1: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
  address2: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
  address3: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx",
  address4: "cosmos1hsm76p4ahyhl5yh3ve9ur49r5kemhp2r0dcjvx",
};
const unused = {
  address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
};
const guest = {
  address: "cosmos17d0jcz59jf68g52vq38tuuncmwwjk42u6mcxej",
};

const codeMeta = {
  source: "https://not-yet-published.cw-erc20",
  builder: "confio/cosmwasm-opt:0.7.3",
};

const initMsgHash = {
  decimals: 5,
  name: "Hash token",
  symbol: "HASH",
  initial_balances: [
    {
      address: faucet.address0,
      amount: "11",
    },
    {
      address: faucet.address1,
      amount: "11",
    },
    {
      address: faucet.address2,
      amount: "11",
    },
    {
      address: faucet.address3,
      amount: "11",
    },
    {
      address: faucet.address4,
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
      address: faucet.address0,
      amount: "999999999",
    },
    {
      address: faucet.address1,
      amount: "999999999",
    },
    {
      address: faucet.address2,
      amount: "999999999",
    },
    {
      address: faucet.address3,
      amount: "999999999",
    },
    {
      address: faucet.address4,
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
      address: faucet.address0,
      amount: "189189189000000000000000000", // 189189189 JADE
    },
    {
      address: faucet.address1,
      amount: "189189189000000000000000000", // 189189189 JADE
    },
    {
      address: faucet.address2,
      amount: "189189189000000000000000000", // 189189189 JADE
    },
    {
      address: faucet.address3,
      amount: "189189189000000000000000000", // 189189189 JADE
    },
    {
      address: faucet.address4,
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
  const client = new SigningCosmWasmClient(httpUrl, faucet.address0, (signBytes) => pen.sign(signBytes));

  const wasm = fs.readFileSync(__dirname + "/contracts/cw-erc20.wasm");
  const uploadReceipt = await client.upload(wasm, codeMeta, "Upload ERC20 contract");
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  for (const initMsg of [initMsgHash, initMsgIsa, initMsgJade]) {
    const memo = `Create an ERC20 instance for ${initMsg.symbol}`;
    const { contractAddress } = await client.instantiate(uploadReceipt.codeId, initMsg, initMsg.symbol, memo);
    console.info(`Contract instantiated for ${initMsg.symbol} at ${contractAddress}`);
  }
}

main().then(
  () => {
    console.info("All done, let the coins flow.");
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
