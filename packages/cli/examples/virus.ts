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

function traverseMap(map: Map<string, string>): string {
  const keys = Array.from(map.keys()).sort();
  let out = `Map {\n`;
  for (const key of keys) {
    const value = map.get(key)!;
    out += `  ${key} => ${value},\n`;
  }
  out += `}`;
  return out;
}

export function ellideMiddle(str: string, maxOutLen: number): string {
  if (str.length <= maxOutLen) {
    return str;
  }
  const ellide = "...";
  const frontLen = Math.ceil((maxOutLen - ellide.length) / 2);
  const tailLen = Math.floor((maxOutLen - ellide.length) / 2);
  return str.slice(0, frontLen) + ellide + str.slice(str.length - tailLen, str.length);
}

function shortAddr(address: string): string {
  return ellideMiddle(address, 25)
}

function mermaid(map: Map<string, string>): string {
  let out = "```mermaid\n";
  out += `graph LR;\n`;
  for (const [child, parent] of map.entries()) {
    out += `  ${shortAddr(parent)} --> ${shortAddr(child)};\n`;
  }
  out += "```";
  return out;
}

async function main(wasmPath: string) {
  const gasPrice = GasPrice.fromString("0.025ucosm");
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, { prefix: "wasm" });
  const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, { gasPrice });

  // Upload contract
  const wasm = fs.readFileSync(wasmPath);
  const uploadReceipt = await client.upload(alice.address0, wasm, "auto", "Upload virus contract");
  console.info("Upload succeeded. Receipt:", uploadReceipt);
  const codeId = uploadReceipt.codeId;
  console.info("Code ID:", codeId);

  // Instantiate
  const { contractAddress } = await client.instantiate(
    alice.address0,
    uploadReceipt.codeId,
    {},
    "My instance",
    "auto",
    { memo: `Create a virus instance` },
  );
  console.info(`Contract instantiated at: ${contractAddress}`);

  // Execute contract
  const spreadMsg = {
    spread: {
      parent_path: "",
      levels: 3,
    },
  };
  const result = await client.execute(alice.address0, contractAddress, spreadMsg, "auto");

  // console.info(`All events:`, result.events);

  const predictedAddresses = new Map<string, string>();
  const parents = new Map<string, string>();

  const wasmEvents = result.events.filter((event) => event.type === "wasm");
  for (const attrs of wasmEvents.map((event) => event.attributes)) {
    const parent = attrs.find((attr) => attr.key == "_contract_address")!.value;
    const path0 = attrs.find((attr) => attr.key == "path0")!.value;
    const path1 = attrs.find((attr) => attr.key == "path1")!.value;
    const predicted0 = attrs.find((attr) => attr.key == "predicted_address0")!.value;
    const predicted1 = attrs.find((attr) => attr.key == "predicted_address1")!.value;
    predictedAddresses.set(path0, predicted0);
    predictedAddresses.set(path1, predicted1);
    parents.set(predicted0, parent);
    parents.set(predicted1, parent);
  }
  console.info(`Predicted addresses:`, traverseMap(predictedAddresses));
  console.info(`Graph for GitHub:\n`, mermaid(parents));

  const actualAddresses = result.events
    .filter((event) => event.type === "instantiate")
    .flatMap((event) => event.attributes)
    .filter((attr) => attr.key === "_contract_address")
    .map((attr) => attr.value);
  console.info(`Actual addresses:`, actualAddresses);
}

const repoRoot = process.cwd() + "/../.."; // This assumes you are in `packages/cli`
const wasm = `${repoRoot}/scripts/wasmd/contracts/virus.wasm`;
await main(wasm);
console.info("The show is over.");
