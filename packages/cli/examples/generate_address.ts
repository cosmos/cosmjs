import { encodeSecp256k1Pubkey, Secp256k1HdWallet } from "@cosmjs/amino";

// Configs
const prefix = "osmo";
const words = 12;

const wallet = await Secp256k1HdWallet.generate(words, { prefix });
const mnemonic = wallet.mnemonic;
const [{ address, pubkey }] = await wallet.getAccounts();

console.info("mnemonic:", mnemonic);
console.info("pubkey:", encodeSecp256k1Pubkey(pubkey));
console.info("address:", address);
