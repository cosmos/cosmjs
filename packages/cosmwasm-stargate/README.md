# @cosmjs/cosmwasm-stargate

[![npm version](https://img.shields.io/npm/v/@cosmjs/cosmwasm-stargate.svg)](https://www.npmjs.com/package/@cosmjs/cosmwasm-stargate)

An SDK to build CosmWasm clients.

## Compatibility

| CosmWasm | x/wasm    | @cosmjs/cosmwasm-stargate |
| -------- | --------- | ------------------------- |
| 0.14     | 0.16      | `^0.25.0`                 |
| 0.13     | 0.14-0.15 | `^0.24.0`                 |

## Development

Updating Hackatom development contract in `src/testdata/contract.json`:

```sh
cd packages/cosmwasm-stargate
export HACKATOM_URL=https://github.com/CosmWasm/cosmwasm/releases/download/v0.14.0/hackatom.wasm
echo "{\"// source\": \"$HACKATOM_URL\", \"data\": \"$(curl -sS  --location $HACKATOM_URL | base64 | tr -d '[:space:]')\" }" | jq > src/testdata/contract.json
```

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/cosmos/cosmjs/blob/main/NOTICE) and
[LICENSE](https://github.com/cosmos/cosmjs/blob/main/LICENSE)).
