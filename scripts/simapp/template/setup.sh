#!/bin/sh
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

PASSWORD=${PASSWORD:-1234567890}
STAKE=${STAKE_TOKEN:-ustake}
FEE=${FEE_TOKEN:-ucosm}
CHAIN_ID=${CHAIN_ID:-testing}

simd init --chain-id="$CHAIN_ID" "$CHAIN_ID"
# staking/governance token is hardcoded in config, change this
sed -i "s/\"stake\"/\"$STAKE\"/" "$HOME"/.simapp/config/genesis.json
if ! simcli keys show validator; then
  (echo "$PASSWORD"; echo "$PASSWORD") | simcli keys add validator
fi
# hardcode the validator account for this instance
echo "$PASSWORD" | simd add-genesis-account validator "1000000000$STAKE,1000000000$FEE"
# (optionally) add a few more genesis accounts
for addr in "$@"; do
  echo $addr
  simd add-genesis-account "$addr" "1000000000$STAKE,1000000000$FEE"
done
# submit a genesis validator tx
(echo "$PASSWORD"; echo "$PASSWORD"; echo "$PASSWORD") | simd gentx --name validator --amount "250000000$STAKE"
simd collect-gentxs
