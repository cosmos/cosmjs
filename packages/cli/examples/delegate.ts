const wallet = await Secp256k1Wallet.fromMnemonic(
  "enlist hip relief stomach skate base shallow young switch frequent cry park",
);
const [{ address: senderAddress }] = await wallet.getAccounts();

const client = new CosmosClient("http://localhost:1317");

const msg: MsgDelegate = {
  type: "cosmos-sdk/MsgDelegate",
  value: {
    delegator_address: senderAddress,
    // To get the proper validator address, start the demo chain (./scripts/wasmd/start.sh), then run:
    //   curl http://localhost:1317/staking/validators | jq '.result[0].operator_address'
    validator_address: "cosmosvaloper103c7vm0c5mz85ecdy4ldftk4a3ydcyp2sscqrz",
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

const signBytes = makeSignBytes([msg], fee, chainId, memo, accountNumber, sequence);
const signature = await wallet.sign(senderAddress, signBytes);
const signedTx: StdTx = {
  msg: [msg],
  fee: fee,
  memo: memo,
  signatures: [signature],
};

const result = await client.broadcastTx(signedTx);
console.log("Broadcast result:", result);
