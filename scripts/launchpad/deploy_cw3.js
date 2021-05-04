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
  source: "https://crates.io/api/v1/crates/cw3-fixed-multisig/0.3.1/download",
  builder: "cosmwasm/rust-optimizer:0.10.4",
};

const initData = [
  {
    admin: alice.address0,
    label: "Multisig (1/3)",
    initMsg: {
      voters: [
        { addr: alice.address0, weight: 1 },
        { addr: alice.address1, weight: 1 },
        { addr: alice.address2, weight: 1 },
      ],
      required_weight: 1,
      max_voting_period: { height: 12345 },
    },
  },
  {
    admin: alice.address0,
    label: "Multisig (2/3)",
    initMsg: {
      voters: [
        { addr: alice.address0, weight: 1 },
        { addr: alice.address1, weight: 1 },
        { addr: alice.address2, weight: 1 },
      ],
      required_weight: 2,
      max_voting_period: { height: 12345 },
    },
  },
  {
    admin: alice.address0,
    label: "Multisig (uneven weights)",
    initMsg: {
      voters: [
        { addr: alice.address0, weight: 1 },
        { addr: alice.address1, weight: 2 },
        { addr: alice.address2, weight: 3 },
      ],
      required_weight: 3,
      max_voting_period: { height: 12345 },
    },
  },
];

async function main() {
  const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
  const client = new SigningCosmWasmClient(httpUrl, alice.address0, wallet);

  const wasm = fs.readFileSync(__dirname + "/contracts/cw3_fixed_multisig.wasm");
  const uploadReceipt = await client.upload(wasm, codeMeta, "Upload CW3 fixed multisig contract");
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  for (const { admin, initMsg, label } of initData) {
    const { contractAddress } = await client.instantiate(uploadReceipt.codeId, initMsg, label, {
      memo: `Create a CW3 instance for ${initMsg.symbol}`,
      admin: admin,
    });
    await client.sendTokens(contractAddress, [
      {
        amount: "1000",
        denom: "ucosm",
      },
    ]);
    console.info(`Contract instantiated for ${label} at ${contractAddress}`);
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
