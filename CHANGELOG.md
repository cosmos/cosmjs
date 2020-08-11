# CHANGELOG

## 0.22.1 (unreleased)

- @cosmjs/cli: Import `encodeAminoPubkey`, `encodeBech32Pubkey`,
  `decodeAminoPubkey` and `decodeBech32Pubkey` by default.
- @cosmjs/launchpad: Add ed25519 support to `encodeBech32Pubkey`.
- @cosmjs/launchpad: Add `encodeAminoPubkey` and `decodeAminoPubkey`.
- @cosmjs/utils: Add `arrayContentEquals`.
- @cosmjs/faucet: Add config variables `FAUCET_ADDRESS_PREFIX` and
  `FAUCET_TOKENS`.
- @cosmjs/faucet: Remove broken chain ID from `cosmwasm-faucet generate`.

## 0.22.0 (2020-08-03)

- @cosmjs/cli: Now supports HTTPs URLs for `--init` code sources.
- @cosmjs/cli: Now supports adding code directly via `--code`.
- @cosmjs/cosmwasm: Rename `CosmWasmClient.getNonce` method to `.getSequence`.
- @cosmjs/cosmwasm: Remove `RestClient` class in favour of new modular
  `LcdClient` class from @cosmjs/sdk38.
- @cosmjs/cosmwasm: Add `SigningCosmWasmClient.signAndPost` as a mid-level
  abstraction between `SigningCosmWasmClient.upload`/`.instantiate`/`.execute`
  and `.postTx`.
- @cosmjs/cosmwasm: Use `*PostTx*` types and helpers from @cosmjs/sdk38. Remove
  exported `PostTxResult`.
- @cosmjs/cosmwasm: `ContractDetails` was removed in favour of just `Contract`.
  The missing `init_msg` is now available via the contract's code history (see
  `getContractCodeHistory`).
- @cosmjs/cosmwasm: Remove `SigningCallback` in favour of the `OfflineSigner`
  interface.
- @cosmjs/sdk38: Rename `CosmosClient.getNonce` method to `.getSequence`.
- @cosmjs/sdk38: Remove `RestClient` class in favour of new modular `LcdClient`
  class.
- @cosmjs/sdk38: Remove `Pen` type in favour of `OfflineSigner` and remove
  `Secp256k1Pen` class in favour of `Secp256k1Wallet` which takes an
  `OfflineSigner` instead of a `SigningCallback`.
- @cosmjs/sdk38: Rename `CosmosSdkAccount` to `BaseAccount` and export the type.
- @cosmjs/sdk38: `BaseAccount` now uses `number | string` as the type for
  `account_number` and `sequence`. The new helpers `uint64ToNumber` and
  `uint64ToString` allow you to normalize the mixed input.
- @cosmjs/sdk38: `BaseAccount` now uses `string | PubKey | null` as the type for
  `public_key`. The new helper `normalizePubkey` allows you to normalize the
  mixed input.
- @cosmjs/math: Add missing integer check to `Uint64.fromNumber`. Before
  `Uint64.fromNumber(1.1)` produced some result.
- @cosmjs/sdk38: Add `SigningCosmosClient.signAndPost` as a mid-level
  abstraction between `SigningCosmosClient.sendTokens` and `.postTx`.
- @cosmjs/sdk38: Export `PostTxFailure`/`PostTxSuccess` and type checkers
  `isPostTxFailure`/`isPostTxSuccess`; export `assertIsPostTxSuccess`.
- @cosmjs/sdk38: `Secp256k1Wallet`s can now be generated randomly with
  `Secp256k1Wallet.generate(n)` where `n` is 12, 15, 18, 21 or 24 mnemonic
  words.
- @cosmjs/sdk38: The new `Secp256k1Wallet.serialize` and `.deserialize` allow
  encrypted serialization of the wallet.
- @cosmjs/sdk38: Remove the obsolete `upload`, `init`, `exec` properties from
  `FeeTable`. @cosmjs/cosmwasm has its own `FeeTable` with those properties.
- @cosmjs/sdk38: Rename package to @cosmjs/launchpad.
