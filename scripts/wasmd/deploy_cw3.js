#!/usr/bin/env yarn node

/* eslint-disable @typescript-eslint/naming-convention */
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const fs = require("fs");

const endpoint = "http://localhost:26659";
const alice = {
  mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
  address0: "wasm14qemq0vw6y3gc3u3e0aty2e764u4gs5lndxgyk",
  address1: "wasm1hhg2rlu9jscacku2wwckws7932qqqu8xm5ca8y",
  address2: "wasm1xv9tklw7d82sezh9haa573wufgy59vmwnxhnsl",
  address3: "wasm17yg9mssjenmc3jkqth6ulcwj9cxujrxxg9nmzk",
  address4: "wasm1f7j7ryulwjfe9ljplvhtcaxa6wqgula3nh873j",
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
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, { prefix: "wasm" });
  const client = await SigningCosmWasmClient.connectWithSigner(endpoint, wallet);

  const wasm = fs.readFileSync(__dirname + "/contracts/cw3_fixed_multisig.wasm");
  const uploadReceipt = await client.upload(
    alice.address0,
    wasm,
    codeMeta,
    "Upload CW3 fixed multisig contract",
  );
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  for (const { admin, initMsg, label } of initData) {
    const { contractAddress } = await client.instantiate(
      alice.address0,
      uploadReceipt.codeId,
      initMsg,
      label,
      {
        memo: `Create a CW3 instance for ${initMsg.symbol}`,
        admin: admin,
      },
    );
    await client.sendTokens(alice.address0, contractAddress, [
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
