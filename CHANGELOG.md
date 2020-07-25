# CHANGELOG

## HEAD

- @cosmjs/cosmwasm: Rename `CosmWasmClient.getNonce` method to `.getSequence`.
- @cosmjs/cosmwasm: Remove `RestClient` class in favour of new modular
  `LcdClient` class from @cosmjs/sdk38.
- @cosmjs/cosmwasm: Add `SigningCosmWasmClient.signAndPost` as a mid-level
  abstraction between `SigningCosmWasmClient.upload`/`.instantiate`/`.execute`
  and `.postTx`.
- @cosmjs/cosmwasm: Use `*PostTx*` types and helpers from @cosmjs/sdk38. Remove
  exported `PostTxResult`.
- @cosmjs/sdk38: Rename `CosmosClient.getNonce` method to `.getSequence`.
- @cosmjs/sdk38: Remove `RestClient` class in favour of new modular `LcdClient`
  class.
- @cosmjs/sdk38: Remove `Pen` type in favour of `OfflineSigner` and remove
  `Secp256k1Pen` class in favour of `Secp256k1Wallet` which takes an
  `OfflineSigner` instead of a `SigningCallback`.
- @cosmjs/sdk38: Rename `CosmosSdkAccount` to `BaseAccount` and export the type.
- @cosmjs/math: Add missing integer check to `Uint64.fromNumber`. Before
  `Uint64.fromNumber(1.1)` produced some result.
- @cosmjs/sdk38: Add `SigningCosmosClient.signAndPost` as a mid-level
  abstraction between `SigningCosmosClient.sendTokens` and `.postTx`.
- @cosmjs/sdk38: Export `PostTxFailure`/`PostTxSuccess` and type checkers
  `isPostTxFailure`/`isPostTxSuccess`; export `assertIsPostTxSuccess`.
