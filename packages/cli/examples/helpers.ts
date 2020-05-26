interface Options {
  httpUrl: string;
  networkId: string;
  feeToken: string;
  gasPrice: number;
  bech32prefix: string;
};

const defaultOptions: Options = {
  httpUrl: "https://lcd.demo-08.cosmwasm.com",
  networkId: "testing",
  feeToken: "ucosm",
  gasPrice: 0.025,
  bech32prefix: "cosmos",
}

const defaultFaucetUrl = "https://faucet.demo-08.cosmwasm.com/credit";

const buildFeeTable = (feeToken: string, gasPrice: number): FeeTable => {
  const stdFee = (gas: number, denom: string, price: number) => {
    const amount = Math.floor(gas * price);
    return {
      amount: [{ amount: amount.toString(), denom: denom }],
      gas: gas.toString(),
    }
  };

  return {
    upload: stdFee(1000000, feeToken, gasPrice),
    init: stdFee(500000, feeToken, gasPrice),
    exec: stdFee(200000, feeToken, gasPrice),
    send: stdFee(80000, feeToken, gasPrice),
  }
};

// TODO: hit faucet
// if (config.faucetUrl) {
//   const acct = await client.getAccount();
//   if (!acct?.balance?.length) {
//     await ky.post(config.faucetUrl, { json: { ticker: "COSM", address } });
//   }
// }

const penAddress = (pen: Secp256k1Pen, prefix: string): string => {
  const pubkey = encodeSecp256k1Pubkey(pen.pubkey);
  return pubkeyToAddress(pubkey, prefix);
}

const connect = async (mnemonic: string, opts: Partial<Options>): Promise<{
  client: SigningCosmWasmClient,
  address: string,
}> => {
  const options: Options = {...defaultOptions, ...opts};
  const feeTable = buildFeeTable(options.feeToken, options.gasPrice);
  const pen = await Secp256k1Pen.fromMnemonic(mnemonic);
  const address = penAddress(pen, options.bech32prefix);

  const client = new SigningCosmWasmClient(options.httpUrl, address, signBytes => pen.sign(signBytes), feeTable);
  return {client, address};
};

// smartQuery assumes the content is proper JSON data and parses before returning it
async function smartQuery(client: CosmWasmClient, addr: string, query: object): Promise<any> {
  return client.queryContractSmart(addr, query);
}

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
}

const hitFaucet = async (faucetUrl: string, address: string, ticker: string): Promise<void> => {
  const r = await axios.post(defaultFaucetUrl, { ticker, address });
  console.log(r.status);
  console.log(r.data);
}

const randomAddress = async (prefix: string): Promise<string> => {
  const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
  return mnemonicToAddress(prefix, mnemonic);
}

const mnemonicToAddress = async (prefix: string, mnemonic: string): Promise<string> => {
  const pen = await Secp256k1Pen.fromMnemonic(mnemonic);
  const pubkey = encodeSecp256k1Pubkey(pen.pubkey);
  return pubkeyToAddress(pubkey, prefix);
}

const downloadWasm = async (url: string): Promise<Uint8Array> => {
  const r = await axios.get(url, { responseType: "arraybuffer"});
  if (r.status !== 200) {
    throw new Error(`Download error: ${r.status}`);
  }
  return r.data;
}

const getAttibute = (logs: readonly logs.Log[], key: string): string|undefined =>
  logs[0].events[0].attributes.find(x => x.key == key)?.value
