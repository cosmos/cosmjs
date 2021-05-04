#!/usr/bin/env yarn node

/* eslint-disable @typescript-eslint/naming-convention */
const { Secp256k1HdWallet } = require("@cosmjs/amino");
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-launchpad");
const fs = require("fs");

const httpUrl = "http://localhost:1317";
const alice = {
  mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
  address0: "cosmos14qemq0vw6y3gc3u3e0aty2e764u4gs5le3hada",
  address1: "cosmos1hhg2rlu9jscacku2wwckws7932qqqu8x3gfgw0",
  address2: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
  address3: "cosmos17yg9mssjenmc3jkqth6ulcwj9cxujrxxzezwta",
  address4: "cosmos1f7j7ryulwjfe9ljplvhtcaxa6wqgula3etktce",
};

const codeMeta = {
  source: "https://crates.io/api/v1/crates/hackatom/not-yet-released/download",
  builder: "cosmwasm/rust-optimizer:0.9.1",
};

const inits = [
  {
    label: "From deploy_hackatom.js (0)",
    msg: {
      beneficiary: alice.address0,
      verifier: alice.address0,
    },
    admin: undefined,
  },
  {
    label: "From deploy_hackatom.js (1)",
    msg: {
      beneficiary: alice.address1,
      verifier: alice.address1,
    },
    admin: undefined,
  },
  {
    label: "From deploy_hackatom.js (2)",
    msg: {
      beneficiary: alice.address2,
      verifier: alice.address2,
    },
    admin: alice.address1,
  },
];

async function main() {
  const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
  const client = new SigningCosmWasmClient(httpUrl, alice.address0, wallet);

  const wasm = fs.readFileSync(__dirname + "/contracts/hackatom.wasm");
  const uploadReceipt = await client.upload(wasm, codeMeta, "Upload hackatom contract");
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  for (const { label, msg, admin } of inits) {
    const { contractAddress } = await client.instantiate(uploadReceipt.codeId, msg, label, {
      memo: `Create a hackatom instance in deploy_hackatom.js`,
      admin: admin,
    });
    console.info(`Contract instantiated at ${contractAddress}`);
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
