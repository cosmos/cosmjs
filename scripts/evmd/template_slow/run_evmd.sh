#!/bin/sh
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

CHAIN_ID=${CHAIN_ID:-9001}
LOGLEVEL=${LOGLEVEL:-info}

cp -R "/template/.evmd" /root
mkdir -p /root/log
evmd start \
  --pruning nothing \
  --log_level "$LOGLEVEL" \
  --minimum-gas-prices=0atest \
  --evm.min-tip=0 \
  --rpc.laddr tcp://0.0.0.0:26657 \
  --chain-id "$CHAIN_ID" \
  --json-rpc.api eth,txpool,personal,net,debug,web3 \
  --trace
