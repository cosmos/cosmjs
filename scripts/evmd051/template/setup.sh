#!/bin/sh
set -o errexit -o nounset
command -v shellcheck >/dev/null && shellcheck "$0"

gnused="$(command -v gsed || echo sed)"

CHAIN_ID=${CHAIN_ID:-9001}
MONIKER=${MONIKER:-localtestnet}
KEYRING="test"
KEYALGO="eth_secp256k1"

# The staking token for EVM compatibility (18 decimals)
DENOM="atest"
BASEFEE=1000000000

# Large initial balance for EVM module requirements (18 decimals)
VAL_BALANCE="100000000000000000000000000$DENOM"
DEV_BALANCE="1000000000000000000000$DENOM"

echo "Configuring client ..."
evmd config set client chain-id "$CHAIN_ID" --home "$HOME"/.evmd
evmd config set client keyring-backend "$KEYRING" --home "$HOME"/.evmd

echo "Setting up validator key ..."
VAL_KEY="mykey"
VAL_MNEMONIC="gesture inject test cycle original hollow east ridge hen combine junk child bacon zero hope comfort vacuum milk pitch cage oppose unhappy lunar seat"
echo "$VAL_MNEMONIC" | evmd keys add "$VAL_KEY" --recover --keyring-backend "$KEYRING" --algo "$KEYALGO" --home "$HOME"/.evmd

# Dev account mnemonics
# dev0 address: cosmos1cml96vmptgw99syqrrz8az79xer2pcgp95srxm
# dev1 address: cosmos1jcltmuhplrdcwp7stlr4hlhlhgd4htqhnu0t2g
# dev2 address: cosmos1gzsvk8rruqn2sx64acfsskrwy8hvrmafzhvvr0
# dev3 address: cosmos1fx944mzagwdhx0wz7k9tfztc8g3lkfk6pzezqh

echo "Setting up dev accounts ..."
echo "copper push brief egg scan entry inform record adjust fossil boss egg comic alien upon aspect dry avoid interest fury window hint race symptom" | evmd keys add dev0 --recover --keyring-backend "$KEYRING" --algo "$KEYALGO" --home "$HOME"/.evmd
echo "maximum display century economy unlock van census kite error heart snow filter midnight usage egg venture cash kick motor survey drastic edge muffin visual" | evmd keys add dev1 --recover --keyring-backend "$KEYRING" --algo "$KEYALGO" --home "$HOME"/.evmd
echo "will wear settle write dance topic tape sea glory hotel oppose rebel client problem era video gossip glide during yard balance cancel file rose" | evmd keys add dev2 --recover --keyring-backend "$KEYRING" --algo "$KEYALGO" --home "$HOME"/.evmd
echo "doll midnight silk carpet brush boring pluck office gown inquiry duck chief aim exit gain never tennis crime fragile ship cloud surface exotic patch" | evmd keys add dev3 --recover --keyring-backend "$KEYRING" --algo "$KEYALGO" --home "$HOME"/.evmd

echo "Initializing chain ..."
echo "$VAL_MNEMONIC" | evmd init "$MONIKER" -o --chain-id "$CHAIN_ID" --home "$HOME"/.evmd --recover

echo "Configuring genesis ..."
GENESIS="$HOME/.evmd/config/genesis.json"
TMP_GENESIS="$HOME/.evmd/config/tmp_genesis.json"

# Set denominations
jq '.app_state["staking"]["params"]["bond_denom"]="atest"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
jq '.app_state["gov"]["params"]["min_deposit"][0]["denom"]="atest"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
jq '.app_state["gov"]["params"]["expedited_min_deposit"][0]["denom"]="atest"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
jq '.app_state["evm"]["params"]["evm_denom"]="atest"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
jq '.app_state["mint"]["params"]["mint_denom"]="atest"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"

# Set denom metadata
jq '.app_state["bank"]["denom_metadata"]=[{"description":"The native staking token for evmd.","denom_units":[{"denom":"atest","exponent":0,"aliases":["attotest"]},{"denom":"test","exponent":18,"aliases":[]}],"base":"atest","display":"test","name":"Test Token","symbol":"TEST","uri":"","uri_hash":""}]' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"

# Configure EVM precompiles
jq '.app_state["evm"]["params"]["active_static_precompiles"]=["0x0000000000000000000000000000000000000100","0x0000000000000000000000000000000000000400","0x0000000000000000000000000000000000000800","0x0000000000000000000000000000000000000801","0x0000000000000000000000000000000000000802","0x0000000000000000000000000000000000000803","0x0000000000000000000000000000000000000804","0x0000000000000000000000000000000000000805","0x0000000000000000000000000000000000000806","0x0000000000000000000000000000000000000807"]' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"

# Configure ERC20 module
jq '.app_state.erc20.native_precompiles=["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"]' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
jq '.app_state.erc20.token_pairs=[{contract_owner:1,erc20_address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",denom:"atest",enabled:true}]' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"

# Set block gas limit
jq '.consensus.params.block.max_gas="10000000"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"

# Set governance periods for faster testing
"$gnused" -i.bak 's/"max_deposit_period": "[^"]*"/"max_deposit_period": "30s"/g' "$GENESIS"
"$gnused" -i.bak 's/"voting_period": "[^"]*"/"voting_period": "30s"/g' "$GENESIS"
"$gnused" -i.bak 's/"expedited_voting_period": "[^"]*"/"expedited_voting_period": "15s"/g' "$GENESIS"

echo "Adding genesis accounts ..."
evmd genesis add-genesis-account "$VAL_KEY" "$VAL_BALANCE" --keyring-backend "$KEYRING" --home "$HOME"/.evmd
evmd genesis add-genesis-account dev0 "$DEV_BALANCE" --keyring-backend "$KEYRING" --home "$HOME"/.evmd
evmd genesis add-genesis-account dev1 "$DEV_BALANCE" --keyring-backend "$KEYRING" --home "$HOME"/.evmd
evmd genesis add-genesis-account dev2 "$DEV_BALANCE" --keyring-backend "$KEYRING" --home "$HOME"/.evmd
evmd genesis add-genesis-account dev3 "$DEV_BALANCE" --keyring-backend "$KEYRING" --home "$HOME"/.evmd

echo "Configuring timeouts ..."
CONFIG_TOML="$HOME/.evmd/config/config.toml"
"$gnused" -i.bak 's/timeout_propose = "[^"]*"/timeout_propose = "2s"/g' "$CONFIG_TOML"
"$gnused" -i.bak 's/timeout_propose_delta = "[^"]*"/timeout_propose_delta = "200ms"/g' "$CONFIG_TOML"
"$gnused" -i.bak 's/timeout_prevote = "[^"]*"/timeout_prevote = "500ms"/g' "$CONFIG_TOML"
"$gnused" -i.bak 's/timeout_prevote_delta = "[^"]*"/timeout_prevote_delta = "200ms"/g' "$CONFIG_TOML"
"$gnused" -i.bak 's/timeout_precommit = "[^"]*"/timeout_precommit = "500ms"/g' "$CONFIG_TOML"
"$gnused" -i.bak 's/timeout_precommit_delta = "[^"]*"/timeout_precommit_delta = "200ms"/g' "$CONFIG_TOML"
"$gnused" -i.bak 's/timeout_commit = "[^"]*"/timeout_commit = "1s"/g' "$CONFIG_TOML"
"$gnused" -i.bak 's/timeout_broadcast_tx_commit = "[^"]*"/timeout_broadcast_tx_commit = "5s"/g' "$CONFIG_TOML"

echo "Enabling metrics and APIs ..."
"$gnused" -i.bak 's/prometheus = false/prometheus = true/' "$CONFIG_TOML"

APP_TOML="$HOME/.evmd/config/app.toml"
"$gnused" -i.bak 's/prometheus-retention-time = "[^"]*"/prometheus-retention-time = "1000000000000"/g' "$APP_TOML"
"$gnused" -i.bak 's/enabled = false/enabled = true/g' "$APP_TOML"
"$gnused" -i.bak 's/enable = false/enable = true/g' "$APP_TOML"
"$gnused" -i.bak 's/enable-indexer = false/enable-indexer = true/g' "$APP_TOML"

echo "Creating genesis tx ..."
SELF_DELEGATION="1000000000000000000000$DENOM"
evmd genesis gentx "$VAL_KEY" "$SELF_DELEGATION" --gas-prices "${BASEFEE}${DENOM}" --keyring-backend "$KEYRING" --chain-id "$CHAIN_ID" --home "$HOME"/.evmd
evmd genesis collect-gentxs --home "$HOME"/.evmd
evmd genesis validate-genesis --home "$HOME"/.evmd

echo "Setup complete!"
