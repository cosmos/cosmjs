#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

PROTO_DIR="./proto"
COSMOS_DIR="$PROTO_DIR/cosmos"
COSMOS_SDK_DIR="$COSMOS_DIR/cosmos-sdk"
ZIP_FILE="$COSMOS_DIR/tmp.zip"
REF=${REF:-"master"}
SUFFIX=${REF}

[[ $SUFFIX =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] && SUFFIX=${SUFFIX#v}

mkdir -p "$COSMOS_DIR"

wget -qO "$ZIP_FILE" "https://github.com/cosmos/cosmos-sdk/archive/$REF.zip"
unzip "$ZIP_FILE" "*.proto" -d "$COSMOS_DIR"
mv "$COSMOS_SDK_DIR-$SUFFIX" "$COSMOS_SDK_DIR"
rm "$ZIP_FILE"
