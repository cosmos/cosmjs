#!/usr/bin/env node

/* eslint-disable @typescript-eslint/naming-convention */
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm");
const { coins, Secp256k1Wallet } = require("@cosmjs/sdk38");
const fs = require("fs");

const httpUrl = "http://localhost:1317";
const alice = {
  mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
  address0: "cosmos14qemq0vw6y3gc3u3e0aty2e764u4gs5le3hada",
};

const codeMeta = {
  source: "", // not intended to be published
  builder: "cosmwasm/rust-optimizer:0.8.0",
};

// To get the proper validator address, run the demo chain (./scripts/wasmd/start.sh), then run:
//   curl http://localhost:1317/staking/validators | jq '.result[0].operator_address'
const bounty = {
  label: "Bounty",
  initMsg: {
    name: "Bounty",
    symbol: "BOUNTY",
    decimals: 3,
    validator: "cosmosvaloper1fa7hj49pf8uzc4m0lw5swjhhl5th2484gvnlpv",
    exit_tax: "0.005", // 0.5 %
    min_withdrawal: "7",
  },
};

const fees = {
  upload: {
    amount: coins(25000, "ucosm"),
    gas: "1500000", // 1.5 million
  },
};

async function main() {
  const wallet = await Secp256k1Wallet.fromMnemonic(alice.mnemonic);
  const client = new SigningCosmWasmClient(httpUrl, alice.address0, wallet, fees);

  const wasm = fs.readFileSync(__dirname + "/contracts/staking.wasm");
  const uploadReceipt = await client.upload(wasm, codeMeta, "Upload Staking code");
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  for (const { label, initMsg } of [bounty]) {
    const { contractAddress } = await client.instantiate(uploadReceipt.codeId, initMsg, label, {
      memo: `Create an staking instance "${label}"`,
    });
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
