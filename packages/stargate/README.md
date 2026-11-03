# @cosmjs/stargate

![typescript](https://img.shields.io/npm/types/@cosmjs/stargate.svg)
[![npm version](https://img.shields.io/npm/v/@cosmjs/stargate.svg)](https://www.npmjs.com/package/@cosmjs/stargate)
[![license](https://img.shields.io/npm/l/@cosmjs/stargate.svg)](https://github.com/cosmos/cosmjs/blob/v0.35.0/LICENSE)
![minimum node version](https://img.shields.io/node/v/@cosmjs/stargate.svg)
![minified size](https://img.shields.io/bundlephobia/min/@cosmjs/stargate.svg)
![monthly downloads](https://img.shields.io/npm/dm/@cosmjs/stargate.svg)

Client libraries for querying Cosmos SDK chains and signing and broadcasting
transactions. Use `StargateClient` for read-only queries and
`SigningStargateClient` with an offline signer for transactions.

## Compatibility

Current releases are not limited to the Cosmos SDK versions in the historical
table below. Later releases added support for newer protobuf types and RPC
backends:

- CosmJS 0.31 upgraded its protobuf types to include Cosmos SDK 0.46/0.47 and
  IBC v7 types.
- CosmJS 0.32 added CometBFT 0.38 auto-detection to `StargateClient.connect` and
  `SigningStargateClient.connectWithSigner`.
- CosmJS 0.37 added a dedicated CometBFT 1.x client to handle differences from
  the CometBFT 0.38 RPC API.

See the [changelog](https://github.com/cosmos/cosmjs/blob/main/CHANGELOG.md) for
release-specific additions and migration notes. RPC compatibility and support
for a chain's module messages are separate concerns: custom modules can require
additional protobuf types and signing registry entries.

### Connecting to a chain

Pass a Tendermint/CometBFT RPC endpoint to `StargateClient.connect` or
`SigningStargateClient.connectWithSigner`, not a Cosmos SDK REST or gRPC
endpoint. The current
[`connectComet` implementation](https://github.com/cosmos/cosmjs/blob/main/packages/tendermint-rpc/src/tendermintclient.ts)
selects a client for Tendermint/CometBFT 0.37, CometBFT 0.38 or CometBFT 1.x
based on the node's reported version. This does not imply support for every
chain's custom modules.

See the [API reference](https://cosmos.github.io/cosmjs/latest/stargate/) for
client methods and options.

### Historical compatibility (CosmJS 0.29 and earlier)

This table documents older releases; it is not the compatibility matrix for the
current version.

| CosmJS version                  | Supported Cosmos SDK version(s) |
| ------------------------------- | ------------------------------- |
| ^0.29.0                         | 0.44.x, 0.45.x, 0.46.x          |
| ^0.28.0                         | 0.42.x, 0.44.x, 0.45.x          |
| ^0.27.0                         | 0.42.x, 0.44.x, 0.45.x          |
| ^0.26.0                         | 0.42.x                          |
| ^0.25.0                         | 0.42.x                          |
| ^0.24.0                         | 0.40.x, 0.41.x, 0.42.x          |
| ^0.24.0-alpha.14                | 0.40.0                          |
| ^0.24.0-alpha.8                 | 0.40.0-rc3                      |
| 0.24.0-alpha.2 – 0.24.0-alpha.7 | 0.40.0-rc2                      |
| 0.24.0-alpha.1                  | 0.40.0-rc1                      |

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/cosmos/cosmjs/blob/main/NOTICE) and
[LICENSE](https://github.com/cosmos/cosmjs/blob/main/LICENSE)).
