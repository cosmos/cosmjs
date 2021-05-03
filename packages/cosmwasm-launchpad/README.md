# @cosmjs/cosmwasm-launchpad

[![npm version](https://img.shields.io/npm/v/@cosmjs/cosmwasm-launchpad.svg)](https://www.npmjs.com/package/@cosmjs/cosmwasm-launchpad)

An SDK to build CosmWasm clients.

## Compatibility

| CosmWasm  | x/wasm    | @cosmjs/cosmwasm-launchpad |
| --------- | --------- | -------------------------- |
| 0.10-0.11 | 0.10-0.11 | `^0.23.0`                  |
| 0.10      | 0.10      | `^0.22.0`                  |
| 0.9       | 0.9       | `^0.21.0`                  |
| 0.8       | 0.8       | `^0.20.1`                  |

## Development

Updating Hackatom development contract in `src/testdata/contract.json`:

```sh
cd packages/cosmwasm-launchpad
export HACKATOM_URL=https://github.com/CosmWasm/cosmwasm/releases/download/v0.11.0-alpha4/hackatom.wasm
echo "{\"// source\": \"$HACKATOM_URL\", \"data\": \"$(curl -sS  --location $HACKATOM_URL | base64 | tr -d '[:space:]')\" }" | jq > src/testdata/contract.json
```

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/cosmos/cosmjs/blob/main/NOTICE) and
[LICENSE](https://github.com/cosmos/cosmjs/blob/main/LICENSE)).
