import { coins, makeCosmoshubPath } from "@cosmjs/amino";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxSuccess,
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
const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, { gasPrice: gasPrice });

// Send transaction (using sendTokens with auto gas)
{
  const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";
  const amount = coins(1234567, "ucosm");
  const memo = "With simulate";
  const result = await client.sendTokens(account.address, recipient, amount, "auto", memo);
  assertIsDeliverTxSuccess(result);
  console.log("Successfully broadcasted:", result);
}

// Send transaction (using sendTokens with auto gas and custom multiplier)
{
  const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";
  const amount = coins(1234567, "ucosm");
  const memo = "With simulate";
  const result = await client.sendTokens(account.address, recipient, amount, 1.2, memo);
  assertIsDeliverTxSuccess(result);
  console.log("Successfully broadcasted:", result);
}

// Send transaction (using sendTokens with manual gas)
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
  const fee = calculateFee(Math.round(gasEstimation * 1.3), gasPrice);
  const result = await client.sendTokens(account.address, recipient, amount, fee, memo);
  assertIsDeliverTxSuccess(result);
  console.log("Successfully broadcasted:", result);
}

// Send transaction (using signAndBroadcast with auto gas)
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
  const result = await client.signAndBroadcast(account.address, [sendMsg], "auto", memo);
  assertIsDeliverTxSuccess(result);
  console.log("Successfully broadcasted:", result);
}

// Send transaction (using signAndBroadcast with auto gas and custom multiplier)
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
  const result = await client.signAndBroadcast(account.address, [sendMsg], 1.4, memo);
  assertIsDeliverTxSuccess(result);
  console.log("Successfully broadcasted:", result);
}

// Send transaction (using signAndBroadcast with manual gas)
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
  const fee = calculateFee(Math.round(gasEstimation * 1.3), gasPrice);
  const result = await client.signAndBroadcast(account.address, [sendMsg], fee, memo);
  assertIsDeliverTxSuccess(result);
  console.log("Successfully broadcasted:", result);
}

client.disconnect();
