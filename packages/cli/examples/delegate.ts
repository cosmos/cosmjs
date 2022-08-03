import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  coin,
  MsgDelegateEncodeObject,
  SigningStargateClient,
  calculateFee,
  assertIsDeliverTxSuccess,
  GasPrice,
} from "@cosmjs/stargate";

// Wallet
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
  "enlist hip relief stomach skate base shallow young switch frequent cry park",
);
const [{ address: signerAddress }] = await wallet.getAccounts();
console.log("Signer address:", signerAddress);

// Network config
const rpcEndpoint = "ws://localhost:26658";
const gasPrice = GasPrice.fromString("0.025ucosm");

// Setup client
const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

// Send delegate transaction
const msg: MsgDelegateEncodeObject = {
  typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
  value: {
    delegatorAddress: signerAddress,
    // To get the proper validator address, start the demo chain (./scripts/simapp44/start.sh), then run:
    //   curl http://localhost:1318/staking/validators | jq '.result[0].operator_address'
    validatorAddress: "cosmosvaloper1urk9gy7cfws0ak9x5nu7lx4un9n6gqkrp230jk",
    amount: coin(300000, "ustake"),
  },
};
const fee = calculateFee(180_000, gasPrice);
const memo = "Use your power wisely";

const chainId = await client.getChainId();
console.log("Connected to chain:", chainId);

const result = await client.signAndBroadcast(signerAddress, [msg], fee, memo);
console.log("Broadcast result:", result);

assertIsDeliverTxSuccess(result);
console.log("Successfully broadcasted:", result);

client.disconnect();
