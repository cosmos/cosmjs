# @cosmjs/cosmwasm

![typescript](https://img.shields.io/npm/types/@cosmjs/cosmwasm.svg)
[![npm version](https://img.shields.io/npm/v/@cosmjs/cosmwasm.svg)](https://www.npmjs.com/package/@cosmjs/cosmwasm)
[![license](https://img.shields.io/npm/l/@cosmjs/cosmwasm.svg)](https://github.com/cosmos/cosmjs/blob/v0.38.0/LICENSE)
![minimum node version](https://img.shields.io/node/v/@cosmjs/cosmwasm.svg)
![minified size](https://img.shields.io/bundlephobia/min/@cosmjs/cosmwasm.svg)
![monthly downloads](https://img.shields.io/npm/dm/@cosmjs/cosmwasm.svg)

An SDK to build CosmWasm clients.

## Compatibility

| CosmWasm        | x/wasm    | @cosmjs/cosmwasm-stargate |
| --------------- | --------- | ------------------------- |
| 0.16-1.0.0-beta | 0.21-0.23 | `^0.28.0`                 |
| 0.16-1.0.0-beta | 0.21-0.23 | `^0.27.0`                 |
| 0.16-1.0.0-beta | 0.18-0.20 | `^0.26.0`                 |
| 0.14            | 0.16      | `^0.25.0`                 |
| 0.13            | 0.14-0.15 | `^0.24.0`                 |

## Development

Updating Hackatom development contract in `src/testdata/contract.json`:

```sh
cd packages/cosmwasm-stargate
export HACKATOM_URL=https://github.com/CosmWasm/cosmwasm/releases/download/v1.0.0-beta/hackatom.wasm
echo "{\"// source\": \"$HACKATOM_URL\", \"data\": \"$(curl -sS  --location $HACKATOM_URL | base64 | tr -d '[:space:]')\" }" | jq > src/testdata/contract.json
```

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/cosmos/cosmjs/blob/main/NOTICE) and
[LICENSE](https://github.com/cosmos/cosmjs/blob/main/LICENSE)).
