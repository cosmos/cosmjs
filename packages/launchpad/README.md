# @cosmjs/launchpad

[![npm version](https://img.shields.io/npm/v/@cosmjs/launchpad.svg)](https://www.npmjs.com/package/@cosmjs/launchpad)

A client library for the Cosmos SDK 0.37 (cosmoshub-3), 0.38 and 0.39
(Launchpad). See the article
[Launchpad — A pre-stargate stable version of the Cosmos SDK](https://blog.cosmos.network/launchpad-a-pre-stargate-stable-version-of-the-cosmos-sdk-e0c58d8c4e24)
to learn more about launchpad.

## Cosmos SDK module support

This client library supports connecting to standard Cosmos SDK modules as well
as custom modules. The modularity has two sides that are handled separately:

- Queries are for reading data from the chain;
- Messages are for writing data to chain as part of the transaction signing.

### Query support

@cosmjs/launchpad now has a flexible
[LcdClient](https://cosmwasm.github.io/cosmjs/latest/launchpad/classes/lcdclient.html),
which can be extended with all the standard Cosmos SDK modules in a type-safe
way. With

```ts
import { LcdClient } from "@cosmjs/launchpad";

const client = new LcdClient(apiUrl);
const response = await client.nodeInfo();
```

you only get access to blocks, transaction lists and node info. In order to sign
transactions, you need to setup the auth extension with:

```ts
import { LcdClient, setupAuthExtension } from "@cosmjs/launchpad";

const client = LcdClient.withExtensions({ apiUrl }, setupAuthExtension);
const { account_number, sequence } = (
  await client.auth.account(myAddress)
).result.value;
```

A full client can use all of the following extensions:

```ts
import {
  LcdClient,
  setupAuthExtension,
  setupBankExtension,
  setupDistributionExtension,
  setupGovExtension,
  setupMintExtension,
  setupSlashingExtension,
  setupStakingExtension,
  setupSupplyExtension,
} from "@cosmjs/launchpad";

const client = LcdClient.withExtensions(
  { apiUrl },
  setupAuthExtension,
  setupBankExtension,
  setupDistributionExtension,
  setupGovExtension,
  setupMintExtension,
  setupSlashingExtension,
  setupStakingExtension,
  setupSupplyExtension,
);

// Example queries
const balances = await client.bank.balances(myAddress);
const distParameters = await client.distribution.parameters();
const proposals = await client.gov.proposals();
const inflation = await client.mint.inflation();
const signingInfos = await client.slashing.signingInfos();
const redelegations = await client.staking.redelegations();
const supply = await client.supply.totalAll();
```

### Messages suppport

Every Amino-JSON compatible message can be used for the
[Msg](https://cosmwasm.github.io/cosmjs/latest/launchpad/interfaces/msg.html)
interface like this:

```ts
const voteMsg: Msg = {
  type: "cosmos-sdk/MsgVote",
  value: {
    proposal_id: proposalId,
    voter: faucet.address,
    option: "Yes",
  },
};
```

This is most flexible since you are not restricted to known messages, but gives
you very little type safety. For improved type safety, we added TypeScript
definitions for all common Cosmos SDK messages:

- MsgSend
- MsgMultiSend
- MsgVerifyInvariant
- MsgSetWithdrawAddress
- MsgWithdrawDelegatorReward
- MsgWithdrawValidatorCommission
- MsgFundCommunityPool
- MsgSubmitEvidence
- MsgSubmitProposal
- MsgVote
- MsgDeposit
- MsgUnjail
- MsgCreateValidator
- MsgEditValidator
- MsgDelegate
- MsgBeginRedelegate
- MsgUndelegate

Those can be signed and broadcast the manual way or by using a higher level
[SigningCosmosClient](https://cosmwasm.github.io/cosmjs/latest/launchpad/classes/signingcosmosclient.html):

```ts
import {
  coins,
  BroadcastTxResult,
  MsgSubmitProposal,
  OfflineSigner,
  SigningCosmosClient,
  StdFee,
} from "@cosmjs/launchpad";

async function publishProposal(
  apiUrl: string,
  signer: OfflineSigner,
): Promise<BroadcastTxResult> {
  const [{ address: authorAddress }] = await signer.getAccounts();

  const memo = "My first proposal on chain";
  const msg: MsgSubmitProposal = {
    type: "cosmos-sdk/MsgSubmitProposal",
    value: {
      content: {
        type: "cosmos-sdk/TextProposal",
        value: {
          description:
            "This proposal proposes to test whether this proposal passes",
          title: "Test Proposal",
        },
      },
      proposer: authorAddress,
      initial_deposit: coins(25000000, "ustake"),
    },
  };
  const fee: StdFee = {
    amount: coins(5000000, "ucosm"),
    gas: "89000000",
  };

  const client = new SigningCosmosClient(apiUrl, authorAddress, signer);
  return client.signAndBroadcast([msg], fee, memo);
}
```

### Custom modules

Both query and message support is implemented in a decentralized fashion, which
allows applications to add their extensions without changing CosmJS. As an
example we show how to build a client for a blockchain with a wasm module:

```ts
import { MsgExecuteContract, setupWasmExtension } from "@cosmjs/cosmwasm";
import {
  assertIsBroadcastTxResult,
  LcdClient,
  makeSignDoc,
  setupAuthExtension,
  StdFee,
  StdTx,
} from "@cosmjs/launchpad";

const client = LcdClient.withExtensions(
  { apiUrl },
  setupAuthExtension,
  // 👇 this extension can come from a chain-specific package or the application itself
  setupWasmExtension,
);

// 👇 this message type can come from a chain-specific package or the application itself
const msg: MsgExecuteContract = {
  type: "wasm/MsgExecuteContract",
  value: {
    sender: myAddress,
    contract: contractAddress,
    msg: wasmMsg,
    sent_funds: [],
  },
};

const fee: StdFee = {
  amount: coins(5000000, "ucosm"),
  gas: "89000000",
};
const memo = "Time for action";
const { account_number, sequence } = (
  await client.auth.account(myAddress)
).result.value;
const signDoc = makeSignDoc([msg], fee, apiUrl, memo, account_number, sequence);
const { signed, signature } = await signer.sign(myAddress, signDoc);
const signedTx = makeStdTx(signed, signature);
const result = await client.broadcastTx(signedTx);
assertIsBroadcastTxResult(result);
```

## Secure key storage

[Secp256k1HdWallet](https://cosmwasm.github.io/cosmjs/latest/launchpad/classes/secp256k1hdwallet.html)
supports securely encrypted serialization/deserialization using Argon2 for key
derivation and XChaCha20Poly1305 for authenticated encryption. It can be used as
easily as:

```ts
// generate an 18 word mnemonic
const wallet = await Secp256k1HdWallet.generate(18);
const serialized = await original.serialize("my password");

// serialized is encrypted and can now be stored in an application-specific way

const restored = await Secp256k1HdWallet.deserialize(serialized, "my password");
```

If you want to use really strong KDF parameters in a user interface, you should
offload the KDF execution to a separate thread in order to avoid freezing the
UI. This can be done in the advanced mode:

**Session 1 (main thread)**

```ts
const wallet = await Secp256k1HdWallet.generate(18);
```

**Session 1 (WebWorker)**

This operation can now run a couple of seconds without freezing the UI.

```ts
import { executeKdf } from "@cosmjs/launchpad";

// pass password to the worker

const strongKdfParams: KdfConfiguration = {
  algorithm: "argon2id",
  params: {
    outputLength: 32,
    opsLimit: 5000,
    memLimitKib: 15 * 1024,
  },
};
const encryptionKey = await executeKdf(password, strongKdfParams);

// pass encryptionKey to the main thread
```

**Session 1 (main thread)**

```ts
const serialized = await wallet.serializeWithEncryptionKey(
  encryptionKey,
  anyKdfParams,
);
```

**Session 2 (WebWorker)**

```ts
import { executeKdf, extractKdfConfiguration } from "@cosmjs/launchpad";

// pass serialized and password to the worker

const kdfConfiguration = extractKdfConfiguration(serialized);
const encryptionKey = await executeKdf(password, kdfConfiguration);

// pass encryptionKey to the main thread
```

**Session 2 (main thead)**

```ts
const restored = await Secp256k1HdWallet.deserializeWithEncryptionKey(
  serialized,
  encryptionKey,
);

// use restored for signing
```

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/CosmWasm/cosmjs/blob/master/NOTICE) and
[LICENSE](https://github.com/CosmWasm/cosmjs/blob/master/LICENSE)).
