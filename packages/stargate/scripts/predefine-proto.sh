#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

GENERATED_DIR="./tmp"
ROOT_PROTO_DIR="./proto/cosmos/cosmos-sdk"
COSMOS_PROTO_DIR="$ROOT_PROTO_DIR/proto/cosmos"
TENDERMINT_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto/tendermint"
GOOGLE_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto/google"

mkdir -p "$GENERATED_DIR"
yarn pbjs \
  -t static-module \
  --es6 \
  -w commonjs \
  -o "$GENERATED_DIR/codecimpl.js" \
  --sparse \
  --no-beautify \
  --no-delimited \
  --no-verify \
  --no-convert \
  "$COSMOS_PROTO_DIR/cosmos.proto" \
  "$COSMOS_PROTO_DIR/auth/{auth,query}.proto" \
  "$COSMOS_PROTO_DIR/bank/{bank,query}.proto" \
  "$COSMOS_PROTO_DIR/crypto/crypto.proto" \
  "$COSMOS_PROTO_DIR/query/pagination.proto" \
  "$COSMOS_PROTO_DIR/tx/tx.proto" \
  "$COSMOS_PROTO_DIR/tx/signing/signing.proto" \
  "$TENDERMINT_PROTO_DIR/abci/types/types.proto" \
  "$TENDERMINT_PROTO_DIR/crypto/merkle/merkle.proto" \
  "$TENDERMINT_PROTO_DIR/libs/kv/types.proto" \
  "$GOOGLE_PROTO_DIR/protobuf/any.proto"

# Work around https://github.com/protobufjs/protobuf.js/issues/1477
# shellcheck disable=SC2016
sed -i "" -e 's/^const \$root =.*$/const \$root = {};/' "$GENERATED_DIR/codecimpl.js"
