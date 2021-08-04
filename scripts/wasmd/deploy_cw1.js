#!/usr/bin/env -S yarn node

/* eslint-disable @typescript-eslint/naming-convention */
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { GasPrice, calculateFee } = require("@cosmjs/stargate");
const fs = require("fs");

const endpoint = "http://localhost:26659";
const alice = {
  mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
  address0: "wasm14qemq0vw6y3gc3u3e0aty2e764u4gs5lndxgyk",
  // address1: "wasm1hhg2rlu9jscacku2wwckws7932qqqu8xm5ca8y",
  // address2: "wasm1xv9tklw7d82sezh9haa573wufgy59vmwnxhnsl",
  // address3: "wasm17yg9mssjenmc3jkqth6ulcwj9cxujrxxg9nmzk",
  // address4: "wasm1f7j7ryulwjfe9ljplvhtcaxa6wqgula3nh873j",
};

async function main() {
  const gasPrice = GasPrice.fromString("0.025ucosm");
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, { prefix: "wasm" });
  const client = await SigningCosmWasmClient.connectWithSigner(endpoint, wallet);

  const wasm = fs.readFileSync(__dirname + "/contracts/cw1_subkeys.wasm");
  const uploadFee = calculateFee(1_500_000, gasPrice);
  const uploadReceipt = await client.upload(
    alice.address0,
    wasm,
    uploadFee,
    "Upload CW1 subkeys contract",
  );
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  const initMsg = {
    admins: [alice.address0],
    mutable: true,
  };
  const label = "Subkey test";
  const instantiateFee = calculateFee(500_000, gasPrice);
  const { contractAddress } = await client.instantiate(
    alice.address0,
    uploadReceipt.codeId,
    initMsg,
    label,
    instantiateFee,
    {
      memo: `Create a CW1 instance for ${alice.address0}`,
      admin: alice.address0,
    },
  );
  const sendFee = calculateFee(80_000, gasPrice);
  await client.sendTokens(
    alice.address0,
    contractAddress,
    [
      {
        amount: "1000",
        denom: "ucosm",
      },
    ],
    sendFee,
  );
  console.info(`Contract instantiated for ${alice.address0} subkey at ${contractAddress}`);
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
