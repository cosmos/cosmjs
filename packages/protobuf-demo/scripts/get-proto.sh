#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

PROTO_DIR="./proto"
COSMOS_DIR="$PROTO_DIR/cosmos"

mkdir -p $COSMOS_DIR

svn export "https://github.com/cosmos/cosmos-sdk/trunk" "$COSMOS_DIR/cosmos-sdk"
# svn export "https://github.com/cosmos/cosmos-sdk/tags/v0.38.4" "$COSMOS_DIR/cosmos-sdk"
