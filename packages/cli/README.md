# @cosmwasm/cli

[![npm version](https://img.shields.io/npm/v/@cosmwasm/cli.svg)](https://www.npmjs.com/package/@cosmwasm/cli)

## Installation and first run

The `cosmwasm-cli` executable is available via npm. We recommend local
installations to your demo project. If you don't have one yet, just
`mkdir cosmwasm-cli-installation && cd cosmwasm-cli-installation && yarn init --yes`.

### locally with yarn

```
$ yarn add @cosmwasm/cli --dev
$ ./node_modules/.bin/cosmwasm-cli
```

### locally with npm

```
$ npm install @cosmwasm/cli --save-dev
$ ./node_modules/.bin/cosmwasm-cli
```

### globally with yarn

```
$ yarn global add @cosmwasm/cli
$ cosmwasm-cli
```

### globally with npm

```
$ npm install -g @cosmwasm/cli
$ cosmwasm-cli
```

## Getting started

1. Install `@cosmwasm/cli` and run `cosmwasm-cli` as shown above
2. Start a local wasmd blockchain
3. Start with `./bin/cosmwasm-cli --init examples/local_faucet.ts`
4. Play around as in the following example code

```ts
// Get account information
const account = (await client.authAccounts(faucetAddress)).result.value;

// Craft a send transaction
const emptyAddress = Bech32.encode("cosmos", Random.getBytes(20));
const memo = "My first contract on chain";
const sendTokensMsg: types.MsgSend = {
  type: "cosmos-sdk/MsgSend",
  value: {
    from_address: faucetAddress,
    to_address: emptyAddress,
    amount: [
      {
        denom: "ucosm",
        amount: "1234567",
      },
    ],
  },
};

const signBytes = makeSignBytes([sendTokensMsg], defaultFee, defaultNetworkId, memo, account) as SignableBytes;
const rawSignature = await wallet.createTransactionSignature(signer, signBytes, PrehashType.Sha256);
const signature = encodeSecp256k1Signature(signer.pubkey.data, rawSignature);
const signedTx: types.StdTx = {
    msg: [sendTokensMsg],
    fee: defaultFee,
    memo: memo,
    signatures: [signature],
  }
const postResult = await client.postTx(marshalTx(signedTx));
```

## License

This package is part of the cosmwasm-js repository, licensed under the Apache
License 2.0 (see
[NOTICE](https://github.com/confio/cosmwasm-js/blob/master/NOTICE) and
[LICENSE](https://github.com/confio/cosmwasm-js/blob/master/LICENSE)).
