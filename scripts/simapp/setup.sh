#!/bin/sh
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

PASSWORD=${PASSWORD:-1234567890}
STAKE=${STAKE_TOKEN:-ustake}
FEE=${FEE_TOKEN:-ucosm}
CHAIN_ID=${CHAIN_ID:-simd-testing}

echo "Creating genesis ..."
simd init --chain-id "$CHAIN_ID" "$CHAIN_ID"
sed -i "s/\"stake\"/\"$STAKE\"/" "$HOME"/.simapp/config/genesis.json # staking/governance token is hardcoded in config, change this

echo "Setting up validator ..."
if ! simd keys show validator; then
  (echo "$PASSWORD"; echo "$PASSWORD") | simd keys add validator
fi
# hardcode the validator account for this instance
echo "$PASSWORD" | simd add-genesis-account validator "1000000000$STAKE,1000000000$FEE"

echo "Setting up accounts ..."
# (optionally) add a few more genesis accounts
for addr in "$@"; do
  echo $addr
  simd add-genesis-account "$addr" "1000000000$STAKE,1000000000$FEE"
done

echo "Creating genesis tx ..."
(echo "$PASSWORD"; echo "$PASSWORD"; echo "$PASSWORD") | simd gentx validator --amount "250000000$STAKE" --chain-id "$CHAIN_ID"
simd collect-gentxs
