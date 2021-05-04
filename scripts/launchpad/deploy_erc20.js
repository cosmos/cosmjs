#!/usr/bin/env yarn node

/* eslint-disable @typescript-eslint/naming-convention */
const { Secp256k1HdWallet } = require("@cosmjs/amino");
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-launchpad");
const fs = require("fs");

const httpUrl = "http://localhost:1317";
const alice = {
  mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
  address0: "cosmos14qemq0vw6y3gc3u3e0aty2e764u4gs5le3hada",
  address1: "cosmos1hhg2rlu9jscacku2wwckws7932qqqu8x3gfgw0",
  address2: "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5",
  address3: "cosmos17yg9mssjenmc3jkqth6ulcwj9cxujrxxzezwta",
  address4: "cosmos1f7j7ryulwjfe9ljplvhtcaxa6wqgula3etktce",
};
const unused = {
  address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
};
const guest = {
  address: "cosmos17d0jcz59jf68g52vq38tuuncmwwjk42u6mcxej",
};

const codeMeta = {
  source: "https://crates.io/api/v1/crates/cw-erc20/0.7.0/download",
  builder: "cosmwasm/rust-optimizer:0.10.4",
};

const initDataHash = {
  admin: undefined,
  initMsg: {
    decimals: 5,
    name: "Hash token",
    symbol: "HASH",
    initial_balances: [
      {
        address: alice.address0,
        amount: "11",
      },
      {
        address: alice.address1,
        amount: "11",
      },
      {
        address: alice.address2,
        amount: "11",
      },
      {
        address: alice.address3,
        amount: "11",
      },
      {
        address: alice.address4,
        amount: "11",
      },
      {
        address: unused.address,
        amount: "12812345",
      },
      {
        address: guest.address,
        amount: "22004000000",
      },
    ],
  },
};
const initDataIsa = {
  admin: undefined,
  initMsg: {
    decimals: 0,
    name: "Isa Token",
    symbol: "ISA",
    initial_balances: [
      {
        address: alice.address0,
        amount: "999999999",
      },
      {
        address: alice.address1,
        amount: "999999999",
      },
      {
        address: alice.address2,
        amount: "999999999",
      },
      {
        address: alice.address3,
        amount: "999999999",
      },
      {
        address: alice.address4,
        amount: "999999999",
      },
      {
        address: unused.address,
        amount: "42",
      },
    ],
  },
};
const initDataJade = {
  admin: alice.address1,
  initMsg: {
    decimals: 18,
    name: "Jade Token",
    symbol: "JADE",
    initial_balances: [
      {
        address: alice.address0,
        amount: "189189189000000000000000000", // 189189189 JADE
      },
      {
        address: alice.address1,
        amount: "189189189000000000000000000", // 189189189 JADE
      },
      {
        address: alice.address2,
        amount: "189189189000000000000000000", // 189189189 JADE
      },
      {
        address: alice.address3,
        amount: "189189189000000000000000000", // 189189189 JADE
      },
      {
        address: alice.address4,
        amount: "189189189000000000000000000", // 189189189 JADE
      },
      {
        address: guest.address,
        amount: "189500000000000000000", // 189.5 JADE
      },
    ],
  },
};

async function main() {
  const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
  const client = new SigningCosmWasmClient(httpUrl, alice.address0, wallet);

  const wasm = fs.readFileSync(__dirname + "/contracts/cw_erc20.wasm");
  const uploadReceipt = await client.upload(wasm, codeMeta, "Upload ERC20 contract");
  console.info(`Upload succeeded. Receipt: ${JSON.stringify(uploadReceipt)}`);

  for (const { initMsg, admin } of [initDataHash, initDataIsa, initDataJade]) {
    const { contractAddress } = await client.instantiate(uploadReceipt.codeId, initMsg, initMsg.symbol, {
      memo: `Create an ERC20 instance for ${initMsg.symbol}`,
      admin: admin,
    });
    console.info(`Contract instantiated for ${initMsg.symbol} at ${contractAddress}`);
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
