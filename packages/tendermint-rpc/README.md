# @cosmjs/tendermint-rpc

![typescript](https://img.shields.io/npm/types/@cosmjs/tendermint-rpc.svg)
[![npm version](https://img.shields.io/npm/v/@cosmjs/tendermint-rpc.svg)](https://www.npmjs.com/package/@cosmjs/tendermint-rpc)
[![license](https://img.shields.io/npm/l/@cosmjs/tendermint-rpc.svg)](https://github.com/cosmos/cosmjs/blob/v0.35.0/LICENSE)
![minimum node version](https://img.shields.io/node/v/@cosmjs/tendermint-rpc.svg)
![minified size](https://img.shields.io/bundlephobia/min/@cosmjs/tendermint-rpc.svg)
![monthly downloads](https://img.shields.io/npm/dm/@cosmjs/tendermint-rpc.svg)

This package provides a type-safe wrapper around
[Tendermint RPC](https://docs.tendermint.com/master/rpc/). Notably, all binary
data is passed in and out as `Uint8Array`, and this module is responsible for
the hex/base64 encoding/decoding depending on the field and version of
Tendermint. Also handles converting numbers to and from strings.

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/cosmos/cosmjs/blob/main/NOTICE) and
[LICENSE](https://github.com/cosmos/cosmjs/blob/main/LICENSE)).
