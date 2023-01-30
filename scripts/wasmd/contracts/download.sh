#!/bin/bash

# This must get from 2-3 different repos, fix the versions here:

COSMWASM_VERSION="v1.2.1"

curl -sS -L -O "https://github.com/CosmWasm/cosmwasm/releases/download/${COSMWASM_VERSION}/hackatom.wasm"
curl -sS -L -O "https://github.com/CosmWasm/cosmwasm/releases/download/${COSMWASM_VERSION}/ibc_reflect.wasm"
curl -sS -L -O "https://github.com/CosmWasm/cosmwasm/releases/download/${COSMWASM_VERSION}/virus.wasm"

sha256sum *.wasm >checksums.sha256
