#!/bin/bash

# This must get from 2-3 different repos, fix the versions here:

COSMWASM_VERSION="v0.14.0"
PLUS_VERSION="v0.6.0"

curl -L -O "https://github.com/CosmWasm/cosmwasm/releases/download/${COSMWASM_VERSION}/hackatom.wasm"

curl -L -O "https://github.com/CosmWasm/cosmwasm-plus/releases/download/${PLUS_VERSION}/cw1_subkeys.wasm"
curl -L -O "https://github.com/CosmWasm/cosmwasm-plus/releases/download/${PLUS_VERSION}/cw3_fixed_multisig.wasm"

sha256sum *.wasm >checksums.sha256
