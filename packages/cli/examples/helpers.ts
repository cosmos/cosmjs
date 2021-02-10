import axios from "axios";
import * as fs from "fs";

import { Bip39, Random } from "@cosmjs/crypto";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-launchpad";
import { logs, GasPrice, Secp256k1HdWallet } from "@cosmjs/launchpad";

interface Options {
  httpUrl: string;
  networkId: string;
  feeToken: string;
  gasPrice: number;
  bech32prefix: string;
}

const defaultOptions: Options = {
  httpUrl: "https://lcd.demo-10.cosmwasm.com",
  networkId: "testing",
  feeToken: "ucosm",
  gasPrice: 0.025,
  bech32prefix: "cosmos",
};

const defaultFaucetUrl = "https://faucet.demo-10.cosmwasm.com/credit";

const connect = async (
  mnemonic: string,
  opts: Partial<Options>,
): Promise<{
  client: SigningCosmWasmClient;
  address: string;
}> => {
  const options: Options = { ...defaultOptions, ...opts };
  const gasPrice = GasPrice.fromString(`${options.gasPrice}${options.feeToken}`);
  const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic);
  const [{ address }] = await wallet.getAccounts();

  const client = new SigningCosmWasmClient(options.httpUrl, address, wallet, gasPrice);
  return { client, address };
};

// loadOrCreateMnemonic will try to load a mnemonic from the file.
// If missing, it will generate a random one and save to the file.
//
// This is not secure, but does allow simple developer access to persist a
// mnemonic between sessions
const loadOrCreateMnemonic = (filename: string): string => {
  try {
    const mnemonic = fs.readFileSync(filename, "utf8");
    return mnemonic.trim();
  } catch (err) {
    const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
    fs.writeFileSync(filename, mnemonic, "utf8");
    return mnemonic;
  }
};

const randomAddress = async (prefix: string): Promise<string> => {
  const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
  return mnemonicToAddress(prefix, mnemonic);
};

const mnemonicToAddress = async (prefix: string, mnemonic: string): Promise<string> => {
  const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic);
  const [{ address }] = await wallet.getAccounts();
  return address;
};

const downloadWasm = async (url: string): Promise<Uint8Array> => {
  const r = await axios.get(url, { responseType: "arraybuffer" });
  if (r.status !== 200) {
    throw new Error(`Download error: ${r.status}`);
  }
  return r.data;
};

const getAttibute = (logs: readonly logs.Log[], key: string): string | undefined =>
  logs[0].events[0].attributes.find((x) => x.key == key)?.value;
