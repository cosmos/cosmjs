# Using the Mask

This assumes you have already run through the sample in the [README](./README.md).
And have an initialized account. You can use any connect method (sharing with cli,
customize blockchain) if you want. We will show uploading mask and using it
on the Demo Net.

Start with `./bin/cosmwasm-cli --init examples/helpers.ts examples/mask.ts`
(note the addition of `examples/mask.ts`)

Ensure the account is set up:

```ts
// you can hand-copy a mnemonic here, but this is easiest for reuse between sessions
// it creates a random one first time, then reads it in the future
const mnemonic = loadOrCreateMnemonic("foo.key");
const {address, client} = await connect(mnemonic, {});
address
client.getAccount();
```

We will use [mask v0.1.0](https://github.com/CosmWasm/cosmwasm-examples/tree/mask-0.1.0/mask),
the hash is [defined here](https://github.com/CosmWasm/cosmwasm-examples/blob/mask-0.1.0/mask/hash.txt):
`1f50bbff503fd9c7bfe713bbf42b309cf88ef299fa76e0242051c9a7e25649a3`. The following will check if
it is already uploaded:

```ts
const hash = "1f50bbff503fd9c7bfe713bbf42b309cf88ef299fa76e0242051c9a7e25649a3"
client.getCodes().then(codes => codes.filter(x => x.checksum === hash))
```

If it is not uploaded, we will upload it:

```ts
// Either download the code
const wasmUrl = "https://github.com/CosmWasm/cosmwasm-examples/blob/mask-0.1.0/mask/contract.wasm?raw=true";
const wasm = await downloadWasm(wasmUrl);

// Or load from local file
const wasmFile = ".../cosmwasm-examples/mask/contract.wasm"
const wasm = fs.readFileSync(wasmFile);

// Then upload it
const up = await client.upload(wasm, { source: "https://crates.io/api/v1/crates/cw-mask/0.1.0/download", builder: "confio/cosmwasm-opt:0.7.3"});
up
up.logs[0].events[0]
```

Now, make an instance (as above):

```ts
// get the proper codeId
const codes = await client.getCodes()
const codeId = codes.filter(x => x.checksum === hash).map(x => x.id)[0]

// instantiate one contract
const maskResp = await client.instantiate(codeId, {}, "My Mask");
const mask = maskResp.contractAddress;

// You can also find the contractAddress later (in a future session), like:
const contracts = await client.getContracts(codeId);
const mask = contracts.filter(x => x.label == "My Mask").map(x => x.address)[0];
```

Now, let's use the mask. To do so, we need to load it up with some tokens
(both native and ERC20 - from the contract you deployed last time).

```ts
client.sendTokens(mask, [{amount: "500000", "denom": "ucosm"}])
client.getAccount(mask)

// get the foo contract again...
const ercId = 1; // from earlier example, change this if different on your network
const ercs = await client.getContracts(ercId);
const foo = ercs.filter(x => x.label == "FOO").map(x => x.address)[0];

// send some erc tokens to the mask as before
smartQuery(client, foo, { balance: { address: mask } })
const ercMsg = { transfer: {recipient: mask, amount: "800000"}}
client.execute(foo, ercMsg);
smartQuery(client, foo, { balance: { address: mask } })
```

Now, let's send some tokens from it:

```ts
const rand = await randomAddress("cosmos");
client.getAccount(rand)
client.getAccount(mask)

const callSend: HandleMsg = { reflectmsg: { msgs: [sendMsg(mask, rand, [{amount: "80000", denom: "ucosm"}])]}};
client.execute(mask, callSend)
client.getAccount(rand)
client.getAccount(mask)
```

And call the ERC20 contract from it:

```ts
smartQuery(client, foo, { balance: { address: rand } })
smartQuery(client, foo, { balance: { address: mask } })

const callContract: HandleMsg = { reflectmsg: { msgs: [contractMsg(foo, {transfer: {"amount": "80000", "recipient": rand}})]}};
client.execute(mask, callContract)
smartQuery(client, foo, { balance: { address: rand } })
smartQuery(client, foo, { balance: { address: mask } })
```

And now... let's use OpaqueMsg to call into native blockchain messages.
Here we will trigger a staking command. This is an "opaque" command, so neither cosmwams-js
nor the cosmwasm contract understands it. It is passed verbatim from the client to
the wasmd blockchain (reflected by mask, so using the mask address).

To view this properly, we will have to use the cli tooling:

```sh
TODO
```

To create such a message, we need to produce the amino json encoding of a staking message.
That does involve a bit of investigation, but looks like:

```json
TODO
```

```ts
const staking = {}
const callOpaque: HandleMsg = { reflectmsg: { msgs: [opaqueMsg(staking)]}};
client.execute(mask, callOpaque)
```

Now validate this with the CLI tooling:
```sh
TODO
```
