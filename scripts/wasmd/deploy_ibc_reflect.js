#!/usr/bin/env -S yarn node

/* eslint-disable @typescript-eslint/naming-convention */
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { calculateFee, GasPrice } = require("@cosmjs/stargate");
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

const inits = [
  {
    label: "Instantiate IBC reflect",
    msg: {
      reflect_code_id: 222, // dummy value that will not work
    },
    admin: undefined,
  },
];

async function main() {
  const gasPrice = GasPrice.fromString("0.025ucosm");
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, { prefix: "wasm" });
  const client = await SigningCosmWasmClient.connectWithSigner(endpoint, wallet);

  const wasm = fs.readFileSync(__dirname + "/contracts/ibc_reflect.wasm");
  const uploadFee = calculateFee(2_500_000, gasPrice);
  const uploadReceipt = await client.upload(
    alice.address0,
    wasm,
    uploadFee,
    "Upload IBC reflect contract",
  );
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  const instantiateFee = calculateFee(900_000, gasPrice);
  for (const { label, msg, admin } of inits) {
    const { contractAddress } = await client.instantiate(
      alice.address0,
      uploadReceipt.codeId,
      msg,
      label,
      instantiateFee,
      {
        memo: `Create a ibc_reflect instance in deploy_ibc_reflect.js`,
        admin: admin,
      },
    );
    console.info(`Contract instantiated at ${contractAddress}`);
  }
}

main().then(
  () => {
    console.info("All done, have fun with IBC.");
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
