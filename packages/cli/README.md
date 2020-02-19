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
const { account_number, sequence } = (await client.authAccounts(faucetAddress)).result.value;

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

const signBytes = makeSignBytes([sendTokensMsg], defaultFee, defaultNetworkId, memo, account_number, sequence);
const signature = await pen.sign(signBytes);
const signedTx: types.StdTx = {
    msg: [sendTokensMsg],
    fee: defaultFee,
    memo: memo,
    signatures: [signature],
  }
const postResult = await client.postTx(marshalTx(signedTx));
```

## Extended helpers

The above code shows you the use of the API and various objects and is a great way to learn
how to embed cosmwasm-js into your project. However, if you just want a cli to perform some
quick queries on a chain, you can use an extended set of helpers:

1. Start a local wasmd blockchain, for example running the setup from `../../scripts/wasmd/start.sh`
2. Start with `./bin/cosmwasm-cli --init examples/helpers.ts` (note the new init file)
3. Deploy some erc20 contracts: `../../scripts/wasmd/init.sh`
4. Play around as in the following example code

```ts
const account = (await client.authAccounts(faucetAddress)).result.value;
account

// show all code and contracts
client.listCodeInfo()
client.listContractAddresses()

// query the first contract
const addr = (await client.listContractAddresses())[0]
const info = await client.getContractInfo(addr)
info.init_msg

// see your balance here
smartQuery(client, addr, { balance: { address: faucetAddress } })

// make a new contract
const initMsg = { name: "Foo Coin", symbol: "FOO", decimals: 2, initial_balances: [{address: faucetAddress, amount: "123456789"}]}
const foo = await instantiateContract(client, pen, 1, initMsg);

smartQuery(client, foo, { balance: { address: faucetAddress } })

const rcpt = await randomAddress();
rcpt
smartQuery(client, foo, { balance: { address: rcpt } })

const execMsg = { transfer: {recipient: rcpt, amount: "808"}}
const exec = await executeContract(client, pen, foo, execMsg);
exec
exec[0].events[0]
smartQuery(client, foo, { balance: { address: rcpt } })
```

## Other example codes

### Create random mnemonic and Cosmos address

```ts
const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
const pen = await Secp256k1Pen.fromMnemonic(mnemonic);
const pubkey = encodeSecp256k1Pubkey(pen.pubkey);
const address = pubkeyToAddress(pubkey, "cosmos");
```

## License

This package is part of the cosmwasm-js repository, licensed under the Apache
License 2.0 (see
[NOTICE](https://github.com/confio/cosmwasm-js/blob/master/NOTICE) and
[LICENSE](https://github.com/confio/cosmwasm-js/blob/master/LICENSE)).
