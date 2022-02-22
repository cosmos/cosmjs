# @cosmjs/cli

[![npm version](https://img.shields.io/npm/v/@cosmjs/cli.svg)](https://www.npmjs.com/package/@cosmjs/cli)

## Installation and first run

The `cosmjs-cli` executable is available via npm. We recommend local
installations to your demo project. If you don't have one yet, just
`mkdir cosmjs-cli-installation && cd cosmjs-cli-installation && yarn init --yes`.

### locally with yarn

```
$ yarn add @cosmjs/cli --dev
$ ./node_modules/.bin/cosmjs-cli
```

### locally with npm

```
$ npm install @cosmjs/cli --save-dev
$ ./node_modules/.bin/cosmjs-cli
```

### globally with yarn

```
$ yarn global add @cosmjs/cli
$ cosmjs-cli
```

### globally with npm

```
$ npm install -g @cosmjs/cli
$ cosmjs-cli
```

## Getting started

1. Install `@cosmjs/cli` and run `cosmjs-cli` as shown above
2. Start a local wasmd blockchain
3. Start with `./bin/cosmjs-cli --init examples/local_faucet.ts`
4. Play around as in the following example code

```ts
// Get account information
const account = await client.getAccount(faucetAddress);

// Craft a send transaction
const emptyAddress = Bech32.encode("cosmos", Random.getBytes(20));
const memo = "My very first tx!";
const msgSend = {
  fromAddress: faucetAddress,
  toAddress: emptyAddress,
  amount: coins(1234, "ucosm"),
};

const msgAny = {
  typeUrl: "/cosmos.bank.v1beta1.MsgSend",
  value: msgSend,
};

// Broadcast and sign the transaction
const broadcastResult = await client.signAndBroadcast(
  faucetAddress,
  [msgAny],
  defaultFee,
  memo,
);
```

## Extended helpers

The above code shows you the use of the API and various objects and is a great
way to learn how to embed cosmjs into your project. However, if you just want a
cli to perform some quick queries on a chain, you can use an extended set of
helpers:

Start with `./bin/cosmjs-cli --init examples/helpers.ts`

(This points to the Demonet at https://lcd.demo-08.cosmwasm.com for ease of use.
Other networks, look below)

Setup Account:

```ts
// you can hand-copy a mnemonic here, but this is easiest for reuse between sessions
// it creates a random one first time, then reads it in the future
const mnemonic = loadOrCreateMnemonic("foo.key");
const { address, client } = await connect(mnemonic, {});
address;

client.getAccount();
// if empty - this only works with CosmWasm
hitFaucet(defaultFaucetUrl, address, "COSM");
client.getAccount();
```

View contracts:

```ts
// show all code and contracts
client.getCodes();

// query the first contract for first code
const contracts = await client.getContracts(1);
contracts;
const info = await client.getContract(contracts[0].address);
info;
info.initMsg;

// see your balance here
client.queryContractSmart(addr, { balance: { address } });
```

Instantiate and use ERC20 contract:

```ts
// no money? no problem.
// let's make our own s**coin - replace "FOO" with something else to avoid duplicates
const initMsg = {
  name: "Foo Coin",
  symbol: "FOO",
  decimals: 2,
  initial_balances: [{ address, amount: "123456789" }],
};
const foo = await client.instantiate(1, initMsg, "FOO");
foo;
foo.logs[0].events[0];
const fooAddr = foo.contractAddress;

// we can also find this another way...
const fooAddr2 = await client
  .getContracts(1)
  .then(
    (contracts) =>
      contracts.filter((x) => x.label == "FOO").map((x) => x.address)[0],
  )[(fooAddr, fooAddr2)];

// now we have some cash
client.queryContractSmart(fooAddr, { balance: { address } });

const rcpt = await randomAddress("cosmos");
rcpt;
client.queryContractSmart(fooAddr, { balance: { address: rcpt } });

const execMsg = { transfer: { recipient: rcpt, amount: "808" } };
const exec = await client.execute(fooAddr, execMsg);
exec;
exec.logs[0].events[0];
client.queryContractSmart(fooAddr, { balance: { address: rcpt } });
```

Or just send tokens:

```ts
client.getAccount(rcpt);

const sent = await client.sendTokens(rcpt, [
  { amount: "1234", denom: "ucosm" },
]);
sent;
foo.logs[0].events[0];
```

### Use Custom Network

All the network info can be configured inside the last argument to connect. To
see how to connect to the Regen Testnet, try this. (Note you need to use
`.editor` in the repl to allow multi-line commands. Alternative is to place
entire `regenOptions` on one line.

Run `./bin/cosmjs-cli --init examples/helpers.ts`

```ts
.editor
const regenOptions = {
  httpUrl: "https://regen-lcd.vitwit.com/",
  networkId: "kontraua",
  feeToken: "utree",
  gasPrice: 0.025,
  bech32prefix: "xrn:",
}
^D

const mnemonic = loadOrCreateMnemonic("regen.key");
const {address, client} = await connect(mnemonic, regenOptions);
address

// check some random genesis account
client.getAccount("xrn:1pdfr7xuckj6lhdphdde6peres9ufwgpsv87mag")

// your own account is undefined unless you did this before
client.getAccount()
```

Hit the faucet with your address (in browser): https://regen.vitwit.com/faucet
then continue in node

```ts
// should have tokens now
client.getAccount();
```

At this point you can continue all the other behaviors from above, looking at
codes, etc. Do note that the ERC contract is code `5` on this network (instead
of `1` above).

### Importing keys from `wasmcli`

If you are using the go commands and have tokens there, you may want to reuse
the same account. (If you don't know what this is, just skip this section). You
can reuse the mnemonic between the Go tooling and the Node.js tooling, but this
violates all security protocols - only use this for testnets. In the future we
will offer proper encrypted key management for cosmjs.

(You can replace `wasmcli` with `xrncli` and use `regenOptions` if you wish to
use that testnet)

Create a new key - note mnemonic and address

```sh
$ wasmcli keys add demo2

- name: demo2
  type: local
  address: cosmos1d4ut3z9c0kplgz5ma9t6ee637tagjqfyu4sxyl
  pubkey: cosmospub1addwnpepqtagg2smk2zvj77xaslej2wevwz7jft0q5hj5yuwvek3r6z0ufjtxnde4rq
  mnemonic: ""
  threshold: 0
  pubkeys: []


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

cousin nephew vintage label empty sunny cargo mushroom photo side clarify sleep solid entire deal tattoo vehicle record discover arrive sting staff salt uncle
```

Save mnemonic to a file

```sh
echo "cousin nephew vintage label empty sunny cargo mushroom photo side clarify sleep solid entire deal tattoo vehicle record discover arrive sting staff salt uncle" > wasmcli.key
```

Load it up in cosmjs: `./bin/cosmjs-cli --init examples/helpers.ts`

```ts
const mnemonic = loadOrCreateMnemonic("wasmcli.key");
const { address, client } = await connect(mnemonic, regenOptions);

// this should match what you got on the cli - showing compatibility
address;
```

Once you have access to the same key as in the cli, you can use those tokens to
play with contracts.

## Diving into Contracts

Check out the [mask documentation](./MASK.md) to view how to use some custom
helpers to upload code and use non-trivial contracts with proper types.

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/cosmos/cosmjs/blob/main/NOTICE) and
[LICENSE](https://github.com/cosmos/cosmjs/blob/main/LICENSE)).
