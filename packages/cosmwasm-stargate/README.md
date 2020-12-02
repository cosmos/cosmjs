# @cosmjs/cosmwasm-stargate

[![npm version](https://img.shields.io/npm/v/@cosmjs/cosmwasm-stargate.svg)](https://www.npmjs.com/package/@cosmjs/cosmwasm-stargate)

An SDK to build CosmWasm clients.

## Compatibility

| CosmWasm | x/wasm | @cosmjs/cosmwasm-stargate |
| -------- | ------ | ------------------------- |
| 0.12     | 0.12   | `^0.24.0`                 |

## Development

Updating Hackatom development contract in `src/testdata/contract.json`:

```sh
cd packages/cosmwasm-stargate
export HACKATOM_URL=https://github.com/CosmWasm/cosmwasm/releases/download/v0.12.0/hackatom.wasm
echo "{\"// source\": \"$HACKATOM_URL\", \"data\": \"$(curl -sS  --location $HACKATOM_URL | base64)\" }" | jq > src/testdata/contract.json
```

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/CosmWasm/cosmjs/blob/master/NOTICE) and
[LICENSE](https://github.com/CosmWasm/cosmjs/blob/master/LICENSE)).
