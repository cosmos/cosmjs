#!/usr/bin/env node

/* eslint-disable @typescript-eslint/camelcase */
const { Encoding } = require("@iov/encoding");
const {
  encodeSecp256k1Signature,
  makeSignBytes,
  marshalTx,
  logs,
  RestClient,
  Secp256k1Pen,
} = require("@cosmwasm/sdk");
const fs = require("fs");

const httpUrl = "http://localhost:1317";
const networkId = "testing";
const defaultFee = {
  amount: [
    {
      amount: "5000",
      denom: "ucosm",
    },
  ],
  gas: "1000000", // one million
};
const faucetMnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";
const faucetAddress = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6";
const unusedAccount = "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u";

async function uploadContract(client, pen, wasm) {
  const memo = "Upload ERC20 contract";
  const storeCodeMsg = {
    type: "wasm/store-code",
    value: {
      sender: faucetAddress,
      wasm_byte_code: Encoding.toBase64(wasm),
      source: "",
      builder: "",
    },
  };

  const account = (await client.authAccounts(faucetAddress)).result.value;
  const signBytes = makeSignBytes([storeCodeMsg], defaultFee, networkId, memo, account);
  const signature = encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
  const signedTx = {
    msg: [storeCodeMsg],
    fee: defaultFee,
    memo: memo,
    signatures: [signature],
  };
  return client.postTx(marshalTx(signedTx));
}

async function instantiateContract(client, pen, codeId, msg, transferAmount) {
  const memo = "Create an ERC20 instance";
  const instantiateContractMsg = {
    type: "wasm/instantiate",
    value: {
      sender: faucetAddress,
      code_id: codeId.toString(),
      init_msg: msg,
      init_funds: transferAmount || [],
    },
  };
  const account = (await client.authAccounts(faucetAddress)).result.value;
  const signBytes = makeSignBytes([instantiateContractMsg], defaultFee, networkId, memo, account);
  const signature = encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
  const signedTx = {
    msg: [instantiateContractMsg],
    fee: defaultFee,
    memo: memo,
    signatures: [signature],
  };
  return client.postTx(marshalTx(signedTx));
}

async function main() {
  const pen = await Secp256k1Pen.fromMnemonic(faucetMnemonic);
  const client = new RestClient(httpUrl);

  const wasm = fs.readFileSync(__dirname + "/contracts/cw-erc20.wasm");
  const uploadResult = await uploadContract(client, pen, wasm);
  if (uploadResult.code) {
    throw new Error(`Uploading failed with code: ${uploadResult.code}; log: '${uploadResult.raw_log}'`);
  }
  const codeIdAttr = logs.findAttribute(logs.parseLogs(uploadResult.logs), "message", "code_id");
  const codeId = Number.parseInt(codeIdAttr.value, 10);
  console.info(`Upload succeeded. Code ID is ${codeId}`);

  const initMsgAsh = {
    decimals: 5,
    name: "Ash token",
    symbol: "ASH",
    initial_balances: [
      {
        address: faucetAddress,
        amount: "11",
      },
      {
        address: unusedAccount,
        amount: "12812345",
      },
    ],
  };
  const initMsgBash = {
    decimals: 0,
    name: "Bash Token",
    symbol: "BASH",
    initial_balances: [
      {
        address: faucetAddress,
        amount: "999999999",
      },
      {
        address: unusedAccount,
        amount: "42",
      },
    ],
  };
  const initMsgCash = {
    decimals: 18,
    name: "Cash Token",
    symbol: "CASH",
    initial_balances: [
      {
        address: faucetAddress,
        amount: "189189189000000000000000000", // 189189189 CASH
      },
    ],
  };
  for (const initMsg of [initMsgAsh, initMsgBash, initMsgCash]) {
    const initResult = await instantiateContract(client, pen, codeId, initMsg);
    if (initResult.code) {
      throw new Error(`Instantiation failed with code: ${initResult.code}; log: '${initResult.raw_log}'`);
    }
    const instantiationLogs = logs.parseLogs(initResult.logs);
    const contractAddress = logs.findAttribute(instantiationLogs, "message", "contract_address").value;
    console.info(`Contract instantiated for ${initMsg.symbol} at ${contractAddress}`);
  }
}

main().then(
  () => {
    console.info("All done, let the coins flow.");
    process.exit(0);
  },
  error => {
    console.error(error);
    process.exit(1);
  },
);
