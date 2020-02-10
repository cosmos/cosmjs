## Setup

```sh
node ./scripts/cosm/deploy_erc20.js
```

## Make account

```sh
cd packages/cli
./bin/cosmwasm-cli --init examples/helpers.ts
```

Now, check it and init/execute contracts:

```js
const account = (await client.authAccounts(faucetAddress)).result.value;
account

client.listCodeInfo()
client.listContractAddresses()

// query this contract
const addr = (await client.listContractAddresses())[0]
const info = await client.getContractInfo(addr)
info.init_msg

// try some actions
client.queryContractSmart(addr, { balance: { address: faucetAddress } })

// make a new contract
```
