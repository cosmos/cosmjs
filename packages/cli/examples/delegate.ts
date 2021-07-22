import {
  coin,
  coins,
  makeSignDoc,
  makeStdTx,
  CosmosClient,
  MsgDelegate,
  Secp256k1HdWallet,
} from "@cosmjs/launchpad";

const wallet = await Secp256k1HdWallet.fromMnemonic(
  "enlist hip relief stomach skate base shallow young switch frequent cry park",
);
const [{ address: senderAddress }] = await wallet.getAccounts();

const client = new CosmosClient("http://localhost:1317");

const msg: MsgDelegate = {
  type: "cosmos-sdk/MsgDelegate",
  value: {
    delegator_address: senderAddress,
    // To get the proper validator address, start the demo chain (./scripts/launchpad/start.sh), then run:
    //   curl http://localhost:1317/staking/validators | jq '.result[0].operator_address'
    validator_address: "cosmosvaloper1yfkkk04ve8a0sugj4fe6q6zxuvmvza8r3arurr",
    amount: coin(300000, "ustake"),
  },
};
const fee = {
  amount: coins(2000, "ucosm"),
  gas: "180000", // 180k
};
const memo = "Use your power wisely";

const chainId = await client.getChainId();
console.log("Connected to chain:", chainId);

const { accountNumber, sequence } = await client.getSequence(senderAddress);
console.log("Account/sequence:", accountNumber, sequence);

const signDoc = makeSignDoc([msg], fee, chainId, memo, accountNumber, sequence);
const { signed, signature } = await wallet.signAmino(senderAddress, signDoc);
const signedTx = makeStdTx(signed, signature);

const result = await client.broadcastTx(signedTx);
console.log("Broadcast result:", result);
