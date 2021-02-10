import { makeCosmoshubPath, Secp256k1HdWallet } from "@cosmjs/launchpad";

const mnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";

for (let i of [0, 1, 2, 3, 4]) {
  const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, makeCosmoshubPath(i), "cosmos");
  const [{ address, pubkey }] = await wallet.getAccounts();
  console.info(`Address ${i}: ${address}`);
  console.info(`Pubkey ${i}: ${toBase64(pubkey)}`);
}
