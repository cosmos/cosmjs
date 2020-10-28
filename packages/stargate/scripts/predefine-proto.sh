#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

GENERATED_DIR="./tmp"
ROOT_PROTO_DIR="./proto/cosmos/cosmos-sdk"
COSMOS_PROTO_DIR="$ROOT_PROTO_DIR/proto/cosmos"
IBC_PROTO_DIR="$ROOT_PROTO_DIR/proto/ibc"
TENDERMINT_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto/tendermint"

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
  "$COSMOS_PROTO_DIR/auth/v1beta1/auth.proto" \
  "$COSMOS_PROTO_DIR/auth/v1beta1/query.proto" \
  "$COSMOS_PROTO_DIR/bank/v1beta1/bank.proto" \
  "$COSMOS_PROTO_DIR/bank/v1beta1/query.proto" \
  "$COSMOS_PROTO_DIR/bank/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/base/query/v1beta1/pagination.proto" \
  "$COSMOS_PROTO_DIR/base/v1beta1/coin.proto" \
  "$COSMOS_PROTO_DIR/crypto/multisig/v1beta1/multisig.proto" \
  "$COSMOS_PROTO_DIR/crypto/secp256k1/keys.proto" \
  "$COSMOS_PROTO_DIR/staking/v1beta1/staking.proto" \
  "$COSMOS_PROTO_DIR/staking/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/tx/signing/v1beta1/signing.proto" \
  "$COSMOS_PROTO_DIR/tx/v1beta1/tx.proto" \
  "$IBC_PROTO_DIR/core/channel/v1/channel.proto" \
  "$IBC_PROTO_DIR/core/channel/v1/query.proto" \
  "$IBC_PROTO_DIR/core/client/v1/client.proto" \
  "$IBC_PROTO_DIR/core/commitment/v1/commitment.proto" \
  "$IBC_PROTO_DIR/core/connection/v1/connection.proto" \
  "$IBC_PROTO_DIR/core/connection/v1/query.proto" \
  "$TENDERMINT_PROTO_DIR/crypto/keys.proto" \
  "$TENDERMINT_PROTO_DIR/crypto/proof.proto" \
  "$TENDERMINT_PROTO_DIR/libs/bits/types.proto" \
  "$TENDERMINT_PROTO_DIR/types/types.proto" \
  "$TENDERMINT_PROTO_DIR/types/validator.proto" \
  "$TENDERMINT_PROTO_DIR/version/types.proto"

# Work around https://github.com/protobufjs/protobuf.js/issues/1477
# shellcheck disable=SC2016
sed -i "" -e 's/^const \$root =.*$/const \$root = {};/' "$GENERATED_DIR/codecimpl.js"
