# CHANGELOG

## 0.23.0 (unreleased)

- @cosmjs/cli: Expose `HdPath` type.
- @cosmjs/cosmwasm: Rename `CosmWasmClient.postTx` method to `.broadcastTx`.
- @cosmjs/cosmwasm: Rename `FeeTable` type to `CosmWasmFeeTable`.
- @cosmjs/cosmwasm: `SigningCosmWasmClient` constructor now takes optional
  arguments `gasPrice` and `gasLimits` instead of `customFees` for easier
  customization.
- @cosmjs/cosmwasm: Rename `SigningCosmWasmClient.signAndPost` method to
  `.signAndBroadcast`.
- @cosmjs/cosmwasm: Use stricter type `Record<string, unknown>` for smart query,
  init, migrate and handle messages (in `WasmExtension.wasm.queryContractSmart`,
  `CosmWasmClient.queryContractSmart`, `SigningCosmWasmClient.instantiate`,
  `SigningCosmWasmClient.migrate`, `SigningCosmWasmClient.execute`).
- @cosmjs/crypto: Export new type alias `HdPath`.
- @cosmjs/crypto: Add `Secp256k1Signature.toFixedLength` method.
- @cosmjs/demo-staking: Remove package and supporting scripts.
- @cosmjs/encoding: Add `limit` parameter to `Bech32.encode` and `.decode`. The
  new default limit for decoding is infinity (was 90 before). Set it to 90 to
  create a strict decoder.
- @cosmjs/faucet: Environmental variable `FAUCET_FEE` renamed to
  `FAUCET_GAS_PRICE` and now only accepts one token. Environmental variable
  `FAUCET_GAS` renamed to `FAUCET_GAS_LIMIT`.
- @cosmjs/faucet: `/credit` API now expects `denom` (base token) instead of
  `ticker` (unit token). Environmental variables specifying credit amounts now
  need to use uppercase denom.
- @cosmjs/launchpad: Rename `FeeTable` type to `CosmosFeeTable` and export a new
  more generic type `FeeTable`.
- @cosmjs/launchpad: Add new class `GasPrice`, new helper type `GasLimits` and
  new helper function `buildFeeTable` for easier handling of gas prices and
  fees.
- @cosmjs/launchpad: Rename `CosmosClient.postTx` method to `.broadcastTx`.
- @cosmjs/launchpad: `SigningCosmosClient` constructor now takes optional
  arguments `gasPrice` and `gasLimits` instead of `customFees` for easier
  customization.
- @cosmjs/launchpad: Rename `SigningCosmosClient.signAndPost` method to
  `.signAndBroadcast`.
- @cosmjs/launchpad: Rename `PostTx`-related types to `BroadcastTxResult`,
  `BroadcastTxSuccess` and `BroadcastTxFailure` respectively, as well as helper
  functions `isBroadcastTxFailure`, `isBroadcastTxSuccess` and
  `assertIsBroadcastTxSuccess`.
- @cosmjs/launchpad: Export `isSearchByIdQuery`, `isSearchByHeightQuery`,
  `isSearchBySentFromOrToQuery` and `isSearchByTagsQuery`.
- @cosmjs/launchpad: Change type of `TxsResponse.logs` and
  `BroadcastTxsResponse.logs` to `unknown[]`.
- @cosmjs/launchpad: Export `StdSignDoc` and create helpers to make and
  serialize a `StdSignDoc`: `makeSignDoc` and `serializeSignDoc`.
- @cosmjs/launchpad: Let `OfflineSigner.sign` take an `StdSignDoc` instead of an
  encoded message and return a `SignResponse` that includes the document which
  was signed.
- @cosmjs/launchpad: Remove `PrehashType` and the prehash type argument in
  `OfflineSigner.sign` because the signer now needs to know how to serialize an
  `StdSignDoc`.
- @cosmjs/launchpad: Remove `makeSignBytes` in favour of `makeSignDoc` and
  `serializeSignDoc`.
- @cosmjs/launchpad: Create `WrappedTx`, `WrappedStdTx` and `isWrappedStdTx` to
  better represent the Amino tx interface. Deprecate `CosmosSdkTx`, which is an
  alias for `WrappedStdTx`.
- @cosmjs/launchpad: Add `makeStdTx` to create an `StdTx`.
- @cosmjs/launchpad-ledger: Add package supporting Ledger device integration for
  Launchpad. Two new classes are provided: `LedgerSigner` (for most use cases)
  and `LaunchpadLedger` for more fine-grained access.
- @cosmjs/math: Add `.multiply` method to `Decimal` class.
- @cosmjs/math: Deprecate `Uint32.fromBigEndianBytes` in favour of
  `Uint32.fromBytes`, which supports both big and little endian.
- @cosmjs/math: Deprecate `Uint64.fromBytesBigEndian` in favour of
  `Uint64.fromBytes`, which supports both big and little endian.
- @cosmjs/math: Add `Uint32.fromString`.
- @cosmjs/tendermint-rpc: Make `BroadcastTxCommitResponse.height` non-optional.
- @cosmjs/tendermint-rpc: Make `TxProof.proof.leafHash` non-optional because it
  is always set.
- @cosmjs/tendermint-rpc: Change type of `GenesisResponse.appState` to
  `Record<string, unknown> | undefined`.
- @cosmjs/tendermint-rpc: Remove obsolete `TxData.tags` and make `TxData.events`
  non-optional. Rename `Tag` to `Attribute`.
- @cosmjs/tendermint-rpc: Remove obsolete `BlockResultsResponse.beginBlock` and
  `.beginBlock`. The new `.beginBlockEvents` and `.endBlockEvents` now parse the
  events correctly.
- @cosmjs/tendermint-rpc: Remove trivial helpers `getTxEventHeight`,
  `getHeaderEventHeight` and `getBlockEventHeight` because they don't do
  anything else than accessing an object member.
- @cosmjs/tendermint-rpc: Add support for connecting to Tendermint RPC 0.34.
- @cosmjs/tendermint-rpc: Make `TxEvent.index` optional and deprecate it because
  it is not set anymore in Tendermint 0.34.
- @cosmjs/utils: Add `assertDefined`.
- @cosmjs/faucet: Rename binary from `cosmwasm-faucet` to `cosmos-faucet`.

## 0.22.3 (2020-09-15)

- @cosmjs/math: Add `Decimal.minus`.

## 0.22.2 (2020-08-11)

- @cosmjs/faucet: Log errors for failed send transactions.
- @cosmjs/faucet: Add config variable `FAUCET_MEMO`.
- @cosmjs/faucet: Add config variables `FAUCET_FEE` and `FAUCET_GAS`.
- @cosmjs/launchpad: Add `parseCoins` helper.

## 0.22.1 (2020-08-11)

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
