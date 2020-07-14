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
    validator_address: "cosmosvaloper1gjvanqxc774u6ed9thj4gpn9gj5zus5u32enqn",
    amount: coin(300000, "ustake"),
  },
};
const fee = {
  amount: coins(2000, "ucosm"),
  gas: "120000", // 120k
};
const memo = "Use your power wisely";

const chainId = await client.getChainId();
console.log("Connected to chain:", chainId);

const { accountNumber, sequence } = await client.getNonce(senderAddress);
console.log("Account/sequence:", accountNumber, sequence);

const signBytes = makeSignBytes([msg], fee, chainId, memo, accountNumber, sequence);
const signature = await wallet.sign(senderAddress, signBytes);
const signedTx: StdTx = {
  msg: [msg],
  fee: fee,
  memo: memo,
  signatures: [signature],
};

const result = await client.postTx(signedTx);
console.log("Post result:", result);
