#!/usr/bin/env node

/* eslint-disable @typescript-eslint/naming-convention */
const { encodeSecp256k1Pubkey, makeCosmoshubPath, Secp256k1HdWallet } = require("@cosmjs/launchpad");

const prefix = "wasm";
const accountsToCreate = [
  {
    mnemonic:
      "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
    accountNumbers: [0, 1, 2, 3, 4],
  },
  {
    mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
    accountNumbers: [0, 1, 2, 3, 4],
  },
  {
    mnemonic: "remain fragile remove stamp quiz bus country dress critic mammal office need",
    accountNumbers: [0, 1, 2, 3, 4],
  },
  {
    mnemonic: "oyster design unusual machine spread century engine gravity focus cave carry slot",
    accountNumbers: [0],
  },
  {
    mnemonic: "degree tackle suggest window test behind mesh extra cover prepare oak script",
    accountNumbers: [0],
  },

  {
    mnemonic: "example indicate trick cereal hub fix civil host kiss version bird dash",
    accountNumbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
];

async function main() {
  for (const { mnemonic, accountNumbers } of accountsToCreate) {
    const wallets = await Promise.all(
      accountNumbers.map((accountNumber) =>
        Secp256k1HdWallet.fromMnemonic(mnemonic, makeCosmoshubPath(accountNumber), prefix),
      ),
    );
    const accounts = (await Promise.all(wallets.map((wallet) => wallet.getAccounts()))).map(
      (accountsForWallet) => accountsForWallet[0],
    );

    console.info("=".repeat(process.stdout.columns));
    console.info("mnemonic:", mnemonic);
    for (const { address, pubkey } of accounts) {
      console.info("-".repeat(process.stdout.columns));
      console.info("pubkey:", encodeSecp256k1Pubkey(pubkey).value);
      console.info("address:", address);
    }
  }
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
