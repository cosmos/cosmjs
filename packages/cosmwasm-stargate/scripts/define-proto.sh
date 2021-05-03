#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

ROOT_PROTO_DIR="./proto"
COSMOS_PROTO_DIR="$ROOT_PROTO_DIR/cosmos/cosmos-sdk/proto"
THIRD_PARTY_PROTO_DIR="$ROOT_PROTO_DIR/cosmos/cosmos-sdk/third_party/proto"
WASMD_PROTO_DIR="$ROOT_PROTO_DIR/cosmwasm/wasmd/proto"
OUT_DIR="./src/codec/"

mkdir -p "$OUT_DIR"

protoc \
  --plugin="$(yarn bin protoc-gen-ts_proto)" \
  --ts_proto_out="$OUT_DIR" \
  --proto_path="$COSMOS_PROTO_DIR" \
  --proto_path="$THIRD_PARTY_PROTO_DIR" \
  --proto_path="$WASMD_PROTO_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "$WASMD_PROTO_DIR/cosmwasm/wasm/v1beta1/types.proto" \
  "$WASMD_PROTO_DIR/cosmwasm/wasm/v1beta1/query.proto" \
  "$WASMD_PROTO_DIR/cosmwasm/wasm/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/cosmos/base/v1beta1/coin.proto" \
  "$COSMOS_PROTO_DIR/cosmos/base/query/v1beta1/pagination.proto"

# Remove unnecessary codec files
rm -rf \
  src/codec/cosmos_proto/ \
  src/codec/gogoproto/ \
  src/codec/google/api/ \
  src/codec/google/protobuf/descriptor.ts
