#!/bin/sh
set -o errexit -o nounset
command -v shellcheck >/dev/null && shellcheck "$0"

gnused="$(command -v gsed || echo sed)"

PASSWORD=${PASSWORD:-1234567890}
CHAIN_ID=${CHAIN_ID:-simd-testing}
MONIKER=${MONIKER:-simd-moniker}

# The staking and the fee tokens. The supply of the staking token is low compared to the fee token (factor 100).
STAKE=${STAKE_TOKEN:-ustake}
FEE=${FEE_TOKEN:-ucosm}

# 2000 STAKE and 1000 COSM
START_BALANCE="2000000000$STAKE,1000000000$FEE"

echo "Creating genesis ..."
simd init --chain-id "$CHAIN_ID" "$MONIKER"
"$gnused" -i "s/\"stake\"/\"$STAKE\"/" "$HOME"/.simapp/config/genesis.json # staking/governance token is hardcoded in config, change this

echo "Setting up validator ..."
if ! simd keys show validator 2>/dev/null; then
  echo "Validator does not yet exist. Creating it ..."
  (
    echo "$PASSWORD"
    echo "$PASSWORD"
  ) | simd keys add validator
fi
# hardcode the validator account for this instance
echo "$PASSWORD" | simd add-genesis-account validator "$START_BALANCE"

echo "Setting up accounts ..."
# (optionally) add a few more genesis accounts
for addr in "$@"; do
  echo "$addr"
  simd add-genesis-account "$addr" "$START_BALANCE"
done

echo "Creating genesis tx ..."
SELF_DELEGATION="3000000$STAKE" # 3 STAKE (leads to a voting power of 3)
(
  echo "$PASSWORD"
  echo "$PASSWORD"
  echo "$PASSWORD"
) | simd gentx validator "$SELF_DELEGATION" --offline --chain-id "$CHAIN_ID" --moniker="$MONIKER"
simd collect-gentxs
