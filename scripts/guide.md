## Setup

Start chain:

```sh
./scripts/cosm/start.sh
```

```sh
cd packages/cli
./bin/cosmwasm-cli --init examples/helpers.ts
```

```js
const account = (await client.authAccounts(faucetAddress)).result.value;
account

client.listCodeInfo()
client.listContractAddresses()
```

## Deploy Contract

```sh
node ./scripts/cosm/deploy_erc20.js
```

## Make account


Now, check it and init/execute contracts:

```js
// see it is now deployed
client.listCodeInfo()
client.listContractAddresses()

// query this contract
const addr = (await client.listContractAddresses())[0]
const info = await client.getContractInfo(addr)
info.init_msg

// try some actions
client.queryContractSmart(addr, { balance: { address: faucetAddress } })

// make a new contract
const initMsg = { name: "Foo Coin", symbol: "FOO", decimals: 2, initial_balances: [{address: faucetAddress, amount: "123456789"}]}
const foo = await instantiateContract(client, pen, 1, initMsg);

client.queryContractSmart(foo, { balance: { address: faucetAddress } })

const rcpt = await randomAddress();
rcpt
client.queryContractSmart(foo, { balance: { address: rcpt } })

const execMsg = { transfer: {recipient: rcpt, amount: "808"}}
const exec = await executeContract(client, pen, foo, execMsg);
exec
client.queryContractSmart(foo, { balance: { address: rcpt } })


// TODO: unused account
// TODO: execute and send tokens
```
