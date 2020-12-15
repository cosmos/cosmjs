#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

PROTO_DIR="./proto"

COSMOS_DIR="$PROTO_DIR/cosmos"
COSMOS_SDK_DIR="$COSMOS_DIR/cosmos-sdk"
COSMOS_SDK_ZIP_FILE="$COSMOS_DIR/tmp.zip"
COSMOS_REF=${COSMOS_REF:-"master"}
COSMOS_SUFFIX=${COSMOS_REF}
[[ $COSMOS_SUFFIX =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-.+)?$ ]] && COSMOS_SUFFIX=${COSMOS_SUFFIX#v}

COSMWASM_DIR="$PROTO_DIR/cosmwasm"
WASMD_DIR="$COSMWASM_DIR/wasmd"
WASMD_ZIP_FILE="$COSMWASM_DIR/tmp.zip"
WASM_REF=${WASM_REF:-"master"}
WASM_SUFFIX=${WASM_REF}
[[ $WASM_SUFFIX =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-.+)?$ ]] && WASM_SUFFIX=${WASM_SUFFIX#v}

mkdir -p "$COSMOS_DIR"
wget -qO "$COSMOS_SDK_ZIP_FILE" "https://github.com/cosmos/cosmos-sdk/archive/$COSMOS_REF.zip"
unzip "$COSMOS_SDK_ZIP_FILE" "*.proto" -d "$COSMOS_DIR"
mv "$COSMOS_SDK_DIR-$COSMOS_SUFFIX" "$COSMOS_SDK_DIR"
rm "$COSMOS_SDK_ZIP_FILE"

mkdir -p "$COSMWASM_DIR"
wget -qO "$WASMD_ZIP_FILE" "https://github.com/cosmwasm/wasmd/archive/$WASM_REF.zip"
unzip "$WASMD_ZIP_FILE" "*.proto" -d "$COSMWASM_DIR"
mv "$WASMD_DIR-$WASM_SUFFIX" "$WASMD_DIR"
rm "$WASMD_ZIP_FILE"
