#!/usr/bin/env node

/* eslint-disable @typescript-eslint/naming-convention */
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm");
const { Secp256k1HdWallet } = require("@cosmjs/launchpad");
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
const unused = {
  address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
};
const guest = {
  address: "cosmos17d0jcz59jf68g52vq38tuuncmwwjk42u6mcxej",
};

const codeMeta = {
  source: "https://crates.io/api/v1/crates/cw-erc20/not-yet-released/download",
  builder: "cosmwasm/rust-optimizer:0.9.0",
};

const initMsg = {
  beneficiary: alice.address0,
  verifier: alice.address0,
};

async function main() {
  const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
  const client = new SigningCosmWasmClient(httpUrl, alice.address0, wallet);

  const wasm = fs.readFileSync(__dirname + "/contracts/hackatom.wasm");
  const uploadReceipt = await client.upload(wasm, codeMeta, "Upload hackatom contract");
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  const { contractAddress } = await client.instantiate(uploadReceipt.codeId, initMsg, initMsg.symbol, {
    memo: `Create a hackatom instance for ${initMsg.symbol}`,
    admin: alice.address0,
  });
  console.info(`Contract instantiated for ${initMsg.symbol} at ${contractAddress}`);
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
