/* eslint-disable @typescript-eslint/camelcase */
import {
  logs
} from "@cosmwasm/sdk";

const defaultHttpUrl = "http://localhost:1317";
const defaultNetworkId = "testing";
const defaultFee: types.StdFee = {
  amount: [
    {
      amount: "5000",
      denom: "ucosm",
    },
  ],
  gas: "890000",
};

const faucetMnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";
const faucetAddress = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6";

const pen = await Secp256k1Pen.fromMnemonic(faucetMnemonic);
const client = new RestClient(defaultHttpUrl);

const networkId = "testing";


// helper functions
const instantiateContract = async (initClient: RestClient, initPen: Secp256k1Pen, codeId: number, msg: object, transferAmount?: types.Coin[]): Promise<string> => {
  const memo = "Create an ERC20 instance";
  const sender = pubkeyToAddress({ "type": types.pubkeyType.secp256k1, "value": toBase64(initPen.pubkey)}, "cosmos");
  const instantiateContractMsg = {
    type: "wasm/instantiate",
    value: {
      sender: sender,
      code_id: codeId.toString(),
      init_msg: msg,
      init_funds: transferAmount || [],
    },
  };
  const account = (await initClient.authAccounts(faucetAddress)).result.value;
  const signBytes = makeSignBytes([instantiateContractMsg], defaultFee, networkId, memo, account);
  const signature = await initPen.sign(signBytes);
  const signedTx = {
    msg: [instantiateContractMsg],
    fee: defaultFee,
    memo: memo,
    signatures: [signature],
  };
  const result = await initClient.postTx(signedTx);
  if (result.code) {
    throw new Error(`Failed tx: (${result.code}): ${result.raw_log}`)
  }
  const instantiationLogs = logs.parseLogs(result.logs);
  const contractAddress = logs.findAttribute(instantiationLogs, "message", "contract_address").value;
  return contractAddress;
}

// helper functions
const executeContract = async (execClient: RestClient, execPen: Secp256k1Pen, contractAddr: string, msg: object, transferAmount?: types.Coin[]): Promise<readonly logs.Log[]> => {
  const memo = "Create an ERC20 instance";
  const sender = pubkeyToAddress({ "type": types.pubkeyType.secp256k1, "value": toBase64(execPen.pubkey)}, "cosmos");
  const instantiateContractMsg = {
    type: "wasm/execute",
    value: {
      sender: sender,
      contract: contractAddr,
      msg: msg,
      sent_funds: transferAmount || [],
    },
  };
  const account = (await execClient.authAccounts(faucetAddress)).result.value;
  const signBytes = makeSignBytes([instantiateContractMsg], defaultFee, networkId, memo, account);
  const signature = await execPen.sign(signBytes);
  const signedTx = {
    msg: [instantiateContractMsg],
    fee: defaultFee,
    memo: memo,
    signatures: [signature],
  };
  const result = await execClient.postTx(signedTx);
  if (result.code) {
    throw new Error(`Failed tx: (${result.code}): ${result.raw_log}`)
  }
  const execLogs = logs.parseLogs(result.logs);
  return execLogs;
}

// smartQuery assumes the content is proper JSON data and parses before returning it
const smartQuery = async (client: RestClient, addr: string, query: object): Promise<any> => {
  const bin = await client.queryContractSmart(addr, query);
  return JSON.parse(fromUtf8(bin));
}


const randomAddress = async (): Promise<string> => {
  const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
  const randomPen = await Secp256k1Pen.fromMnemonic(mnemonic);
  const pubkey = encodeSecp256k1Pubkey(randomPen.pubkey);
  return pubkeyToAddress(pubkey, "cosmos");
}
