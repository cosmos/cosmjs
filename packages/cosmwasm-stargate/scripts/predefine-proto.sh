#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

GENERATED_DIR="./tmp"
ROOT_PROTO_DIR="./proto/cosmwasm/wasmd"
WASM_PROTO_DIR="$ROOT_PROTO_DIR/x/wasm"

mkdir -p "$GENERATED_DIR"
# Can't use --sparse for some reason. Seems related to https://github.com/protobufjs/protobuf.js/issues/1165
yarn pbjs \
  -t static-module \
  --es6 \
  -w commonjs \
  -o "$GENERATED_DIR/codecimpl.js" \
  --no-beautify \
  --no-delimited \
  --no-verify \
  --no-convert \
  --force-long \
  "$WASM_PROTO_DIR/internal/types/msg.proto" \
  "$WASM_PROTO_DIR/internal/types/query.proto" \
  "$WASM_PROTO_DIR/internal/types/types.proto" \
  "./proto/cosmos/cosmos-sdk/proto/cosmos/base/v1beta1/coin.proto" \
  "./proto/cosmos/cosmos-sdk/proto/cosmos/base/query/v1beta1/pagination.proto"

# Work around https://github.com/protobufjs/protobuf.js/issues/1477
# shellcheck disable=SC2016
sed -i "" -e 's/^const \$root =.*$/const \$root = {};/' "$GENERATED_DIR/codecimpl.js"
