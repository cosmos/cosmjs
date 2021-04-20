import { makeCosmoshubPath, Secp256k1HdWallet } from "@cosmjs/amino";
import { toBase64 } from "@cosmjs/encoding";

const mnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";

const accountNumbers = [0, 1, 2, 3, 4];
const hdPaths = accountNumbers.map(makeCosmoshubPath);
const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { hdPaths: hdPaths });
const accounts = await wallet.getAccounts();
accounts.forEach(({ address, pubkey }, i) => {
  console.info(`Address ${i}: ${address}`);
  console.info(`Pubkey ${i}: ${toBase64(pubkey)}`);
});
