import { makeCosmoshubPath } from "@cosmjs/amino";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsBroadcastTxSuccess, SigningStargateClient } from "@cosmjs/stargate";

const mnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";
const path = makeCosmoshubPath(3);
const prefix = "cosmos";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { hdPaths: [path], prefix: prefix });
const [account] = await wallet.getAccounts();
console.log("Signer address:", account.address);

const rpcEndpoint = "ws://localhost:26658";
const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";
const amount = {
  denom: "ucosm",
  amount: "1234567",
};
const result = await client.sendTokens(account.address, recipient, [amount], "Have fun with your star coins");
assertIsBroadcastTxSuccess(result);
console.log("Successfully broadcasted:", result);

client.disconnect();
