#!/usr/bin/env -S yarn node

/* eslint-disable @typescript-eslint/naming-convention */
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { calculateFee, GasPrice } = require("@cosmjs/stargate");
const { fromRfc3339, toRfc3339 } = require("@cosmjs/encoding");
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

async function main() {
  const gasPrice = GasPrice.fromString("0.025ucosm");
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, { prefix: "wasm" });
  const client = await SigningCosmWasmClient.connectWithSigner(endpoint, wallet, {
    broadcastTimeoutMs: 7 * 60_000,
  });

  const wasm = fs.readFileSync(__dirname + "/contracts/373.wasm");
  const uploadFee = calculateFee(2_500_000, gasPrice);
  const uploadResult = await client.upload(alice.address0, wasm, uploadFee, "Upload 393 contract");
  console.info(`Upload succeeded. Result: ${JSON.stringify(uploadResult)}`);
  console.info("");

  const startTime = Date.now();
  const startHeight = await client.getHeight();
  console.log(`Start time: ${toRfc3339(new Date(startTime))}, start height: ${startHeight}`);

  const instantiateResult = await client.instantiate(
    alice.address0,
    uploadResult.codeId,
    {
      default_owner: "wasm1nsmzpc5u0lzg8t03pwt87uds244u50xpqfq2pu",
      height: 1000,
      width: 1000,
    },
    "awesome name service",
    calculateFee(5_810_214_151, gasPrice),
    {
      memo: `Create an instance`,
    },
  );
  console.info(
    `Contract instantiated at ${instantiateResult.contractAddress}: Result: ${JSON.stringify(
      instantiateResult,
    )}`,
  );
  const doneTime = Date.now();
  const doneHeight = await client.getHeight();
  console.log(`Done time: ${toRfc3339(new Date(doneTime))}, done height: ${doneHeight}`);
  const runtime = (doneTime - startTime) / 1000;
  console.info(`Instantiate call took ${runtime.toFixed(2)} seconds`);

  for (let height2 = startHeight; height2 <= doneHeight; height2++) {
    const height1 = height2 - 1;
    const [block1, block2] = await Promise.all([client.getBlock(height1), client.getBlock(height2)]);
    const date2 = fromRfc3339(block2.header.time);
    const date1 = fromRfc3339(block1.header.time);
    const blockTime = ((date2.getTime() - date1.getTime()) / 1000).toFixed(2);
    console.info(
      `Block ${height2} was created at ${block2.header.time}, ${blockTime} seconds after the previous block`,
    );
  }
}

main().then(
  () => {
    console.info("All done.");
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
