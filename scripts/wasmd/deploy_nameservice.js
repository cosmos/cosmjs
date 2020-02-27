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

const initFree = {
  name: "Free",
};
const initLuxury = {
  name: "Luxury",
  purchase_price: {
    denom: "ucosm",
    amount: "2000000",
  },
  transfer_price: {
    denom: "ucosm",
    amount: "1000000",
  },
};

async function main() {
  const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
  const client = new SigningCosmWasmClient(httpUrl, faucet.address, signBytes => pen.sign(signBytes));

  const wasm = fs.readFileSync(__dirname + "/contracts/cw-nameservice.wasm");
  const uploadReceipt = await client.upload(wasm, "Upload Name Service contract");
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  for (const initMsg of [initFree, initLuxury]) {
    const memo = `Create an nameservice instance for ${initMsg.name}`;
    const contractAddress = await client.instantiate(uploadReceipt.codeId, initMsg, memo);
    console.info(`Contract instantiated for ${initMsg.name} at ${contractAddress}`);
  }
}

main().then(
  () => {
    console.info("Done deploying nameservice instances.");
    process.exit(0);
  },
  error => {
    console.error(error);
    process.exit(1);
  },
);
