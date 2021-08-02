import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import * as fs from "fs";

const rpcEndpoint = "http://localhost:26659";

// Example user from scripts/wasmd/README.md
const alice = {
  mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
  address0: "wasm14qemq0vw6y3gc3u3e0aty2e764u4gs5lndxgyk",
  address1: "wasm1hhg2rlu9jscacku2wwckws7932qqqu8xm5ca8y",
  address2: "wasm1xv9tklw7d82sezh9haa573wufgy59vmwnxhnsl",
  address3: "wasm17yg9mssjenmc3jkqth6ulcwj9cxujrxxg9nmzk",
  address4: "wasm1f7j7ryulwjfe9ljplvhtcaxa6wqgula3nh873j",
};

async function main(hackatomWasmPath: string) {
  const gasPrice = GasPrice.fromString("0.025ucosm");
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, { prefix: "wasm" });
  const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet);

  // Upload contract
  const wasm = fs.readFileSync(hackatomWasmPath);
  const uploadFee = calculateFee(1_500_000, gasPrice);
  const uploadReceipt = await client.upload(
    alice.address0,
    wasm,
    uploadFee,
    "Upload hackatom contract",
  );
  console.info("Upload succeeded. Receipt:", uploadReceipt);

  // Instantiate
  const instantiateFee = calculateFee(500_000, gasPrice);
  // This contract specific message is passed to the contract
  const msg = {
    beneficiary: alice.address1,
    verifier: alice.address0,
  };
  const { contractAddress } = await client.instantiate(
    alice.address0,
    uploadReceipt.codeId,
    msg,
    "My instance",
    instantiateFee,
    { memo: `Create a hackatom instance` },
  );
  console.info(`Contract instantiated at: `, contractAddress);

  // Execute contract
  const executeFee = calculateFee(300_000, gasPrice);
  const result = await client.execute(alice.address0, contractAddress, { release: {} }, executeFee);
  const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
  console.info("The `wasm` event emitted by the contract execution:", wasmEvent);
}

const repoRoot = process.cwd() + "/../.."; // This assumes you are in `packages/cli`
const hackatom = `${repoRoot}/scripts/wasmd/contracts/hackatom.wasm`;
await main(hackatom);
console.info("The show is over.");
