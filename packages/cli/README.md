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
const postResult = await client.postTx(signedTx);
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
// you can hand-copy a mnemonic here, but this is easiest for reuse between sessions
// it creates a random one first time, then reads it in the future
const mnemonic = loadOrCreateMnemonic("foo.key");
const {address, client} = await connect(mnemonic, {});
address

client.getAccount();
// if empty
hitFaucet(defaultFaucetUrl, address, "COSM")
client.getAccount();

// show all code and contracts
client.getCodes()

// query the first contract for first code
const contracts = await client.getContracts(1);
contracts
const info = await client.getContract(contracts[0].address)
info
info.initMsg

// see your balance here
smartQuery(client, addr, { balance: { address } })

// no money? no problem.
// let's make our own s**coin
const initMsg = { name: "Foo Coin", symbol: "FOO", decimals: 2, initial_balances: [{address, amount: "123456789"}]}
const foo = await client.instantiate(1, initMsg, "FOO");
foo
foo.logs[0].events[0]
const fooAddr = foo.contractAddress;

// we can also find this another way...
const fooAddr2 = await client.getContracts(1).then(contracts => contracts.filter(x => x.label == "FOO").map(x => x.address)[0])
[fooAddr, fooAddr2]

// now we have some cash
smartQuery(client, fooAddr, { balance: { address } })

const rcpt = await randomAddress("cosmos");
rcpt
smartQuery(client, fooAddr, { balance: { address: rcpt } })

const execMsg = { transfer: {recipient: rcpt, amount: "808"}}
const exec = await client.execute(fooAddr, execMsg);
exec
exec.logs[0].events[0]
smartQuery(client, fooAddr, { balance: { address: rcpt } })
```

## License

This package is part of the cosmwasm-js repository, licensed under the Apache
License 2.0 (see
[NOTICE](https://github.com/confio/cosmwasm-js/blob/master/NOTICE) and
[LICENSE](https://github.com/confio/cosmwasm-js/blob/master/LICENSE)).
