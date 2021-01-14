#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

ROOT_PROTO_DIR="./proto/cosmos/cosmos-sdk"
THIRD_PARTY_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto"
COSMOS_PROTO_DIR="$ROOT_PROTO_DIR/proto"
OUT_DIR="./src/codec/"

mkdir -p "$OUT_DIR"

protoc \
  --plugin="$(yarn bin protoc-gen-ts_proto)" \
  --ts_proto_out="$OUT_DIR" \
  --proto_path="$COSMOS_PROTO_DIR" \
  --proto_path="$THIRD_PARTY_PROTO_DIR" \
  --ts_proto_opt="forceLong=long,useOptionals=true" \
  "$THIRD_PARTY_PROTO_DIR/gogoproto/gogo.proto" \
  "$COSMOS_PROTO_DIR/cosmos/base/v1beta1/coin.proto" \
  "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/bank.proto" \
  "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/cosmos/crypto/multisig/v1beta1/multisig.proto" \
  "$COSMOS_PROTO_DIR/cosmos/crypto/secp256k1/keys.proto" \
  "$COSMOS_PROTO_DIR/cosmos/tx/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/cosmos/tx/signing/v1beta1/signing.proto" \
  "$THIRD_PARTY_PROTO_DIR/tendermint/crypto/keys.proto"
