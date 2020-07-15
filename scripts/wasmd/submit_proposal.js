#!/usr/bin/env node

/* eslint-disable @typescript-eslint/camelcase */
const { coins, Secp256k1Wallet, SigningCosmosClient, makeSignBytes } = require("@cosmjs/sdk38");

const httpUrl = "http://localhost:1317";
const alice = {
  mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
  address0: "cosmos14qemq0vw6y3gc3u3e0aty2e764u4gs5le3hada",
};

const defaultFee = {
  amount: coins(25000, "ucosm"),
  gas: "1500000", // 1.5 million
};

async function submitProposal(client, wallet) {
  const chainId = await client.getChainId();
  const proposalMsg = {
    type: "cosmos-sdk/MsgSubmitProposal",
    value: {
      content: {
        type: "cosmos-sdk/TextProposal",
        value: {
          description: "This proposal proposes to test whether this proposal passes",
          title: "Test Proposal",
        },
      },
      proposer: alice.address0,
      initial_deposit: coins(25000000, "ustake"),
    },
  };
  const proposalMemo = "Test proposal for wasmd";
  const { accountNumber: proposalAccountNumber, sequence: proposalSequence } = await client.getNonce();
  const proposalSignBytes = makeSignBytes(
    [proposalMsg],
    defaultFee,
    chainId,
    proposalMemo,
    proposalAccountNumber,
    proposalSequence,
  );
  const proposalSignature = await wallet.sign(alice.address0, proposalSignBytes);
  const proposalTx = {
    msg: [proposalMsg],
    fee: defaultFee,
    memo: proposalMemo,
    signatures: [proposalSignature],
  };
  return client.postTx(proposalTx);
}

async function submitVote(client, wallet, proposalId) {
  const chainId = await client.getChainId();
  const voteMsg = {
    type: "cosmos-sdk/MsgVote",
    value: {
      proposal_id: proposalId,
      voter: alice.address0,
      option: "Yes",
    },
  };
  const voteMemo = "Test vote for wasmd";
  const { accountNumber: voteAccountNumber, sequence: voteSequence } = await client.getNonce();
  const voteSignBytes = makeSignBytes(
    [voteMsg],
    defaultFee,
    chainId,
    voteMemo,
    voteAccountNumber,
    voteSequence,
  );
  const voteSignature = await wallet.sign(alice.address0, voteSignBytes);
  const voteTx = {
    msg: [voteMsg],
    fee: defaultFee,
    memo: voteMemo,
    signatures: [voteSignature],
  };
  return client.postTx(voteTx);
}

async function main() {
  const wallet = await Secp256k1Wallet.fromMnemonic(alice.mnemonic);
  const client = new SigningCosmosClient(httpUrl, alice.address0, wallet, {});

  const proposalReceipt = await submitProposal(client, wallet);
  console.info(`Proposal submission succeeded. Receipt: ${JSON.stringify(proposalReceipt)}`);

  const proposalId = proposalReceipt.logs[0].events
    .find(({ type }) => type === "submit_proposal")
    .attributes.find(({ key }) => key === "proposal_id").value;
  const voteReceipt = await submitVote(client, wallet, proposalId);
  console.info(`Vote succeeded. Receipt: ${JSON.stringify(voteReceipt)}`);
}

main().then(
  () => {
    console.info("Done submitting proposal.");
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
