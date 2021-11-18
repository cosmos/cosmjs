import { coins, makeCosmoshubPath } from "@cosmjs/amino";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  assertIsBroadcastTxSuccess,
  calculateFee,
  GasPrice,
  MsgSendEncodeObject,
  SigningStargateClient,
} from "@cosmjs/stargate";

// Wallet
const mnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";
const path = makeCosmoshubPath(3);
const prefix = "cosmos";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { hdPaths: [path], prefix: prefix });
const [account] = await wallet.getAccounts();
console.log("Signer address:", account.address);

// Network config
const rpcEndpoint = "ws://localhost:26658";
const gasPrice = GasPrice.fromString("0.025ucosm");

// Setup client
const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

// Send transaction (using sendTokens)
{
  const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";
  const amount = coins(1234567, "ucosm");
  const sendMsg: MsgSendEncodeObject = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress: account.address,
      toAddress: recipient,
      amount: amount,
    },
  };
  const memo = "With simulate";
  const gasEstimation = await client.simulate(account.address, [sendMsg], memo);
  const fee = calculateFee(Math.floor(gasEstimation * 1.3), gasPrice);
  const result = await client.sendTokens(account.address, recipient, amount, fee, memo);
  assertIsBroadcastTxSuccess(result);
  console.log("Successfully broadcasted:", result);
}

// Send transaction (using signAndBroadcast)
{
  const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";
  const amount = coins(1234567, "ucosm");
  const sendMsg: MsgSendEncodeObject = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress: account.address,
      toAddress: recipient,
      amount: amount,
    },
  };
  const memo = "With simulate";
  const gasEstimation = await client.simulate(account.address, [sendMsg], memo);
  const fee = calculateFee(Math.floor(gasEstimation * 1.3), gasPrice);
  const result = await client.signAndBroadcast(account.address, [sendMsg], fee, memo);
  assertIsBroadcastTxSuccess(result);
  console.log("Successfully broadcasted:", result);
}

client.disconnect();
