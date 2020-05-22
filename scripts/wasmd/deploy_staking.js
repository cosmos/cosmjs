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

const codeMeta = {
  source: "", // not intended to be published
  builder: "cosmwasm/rust-optimizer:0.8.0",
};

const bounty = {
  label: "Bounty",
  initMsg: {
    name: "Bounty",
    symbol: "BOUNTY",
    decimals: 3,
    validator: "cosmosvaloper1ea5cpmcj2vf5d0xwurncx7zdnmkuc6eq696h9a", // cosmosvaloper17mggn4znyeyg25wd7498qxl7r2jhgue8u4qjcq
    exit_tax: "0.005", // 0.5 %
    min_withdrawal: "7",
  },
};

async function main() {
  const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
  const client = new SigningCosmWasmClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));

  const wasm = fs.readFileSync(__dirname + "/contracts/staking.wasm");
  const uploadReceipt = await client.upload(wasm, codeMeta, "Upload Staking code");
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  for (const { label, initMsg } of [bounty]) {
    const memo = `Create an staking instance "${label}"`;
    const { contractAddress } = await client.instantiate(uploadReceipt.codeId, initMsg, label, memo);
    console.info(`Contract "${label}" instantiated at ${contractAddress}`);
  }
}

main().then(
  () => {
    console.info("Done deploying staking instances.");
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
