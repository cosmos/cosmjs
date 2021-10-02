#!/bin/bash

# This must get from 2-3 different repos, fix the versions here:

COSMWASM_VERSION="v0.16.0"

curl -sS -L -O "https://github.com/CosmWasm/cosmwasm/releases/download/${COSMWASM_VERSION}/hackatom.wasm"
curl -sS -L -O "https://github.com/CosmWasm/cosmwasm/releases/download/${COSMWASM_VERSION}/ibc_reflect.wasm"

sha256sum *.wasm >checksums.sha256
