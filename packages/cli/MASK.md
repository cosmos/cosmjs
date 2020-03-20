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
```

TODO: using it with proper types
