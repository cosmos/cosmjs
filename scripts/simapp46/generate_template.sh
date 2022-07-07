#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

gnused="$(command -v gsed || echo sed)"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
# shellcheck source=./env
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/env

rm -rf "$SCRIPT_DIR/template"
mkdir "$SCRIPT_DIR/template"
cp setup.sh "$SCRIPT_DIR/template/"
chmod +x "$SCRIPT_DIR/template/setup.sh"
cp run_simd.sh "$SCRIPT_DIR/template/"
chmod +x "$SCRIPT_DIR/template/run_simd.sh"

# The usage of the accounts below is documented in README.md of this directory
docker run --rm \
  -e PASSWORD=my-secret-password \
  --mount type=bind,source="$SCRIPT_DIR/template",target=/root \
  "$REPOSITORY:$VERSION" \
  ./setup.sh \
  cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6 cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5 cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx cosmos1hsm76p4ahyhl5yh3ve9ur49r5kemhp2r0dcjvx \
  cosmos14qemq0vw6y3gc3u3e0aty2e764u4gs5le3hada cosmos1hhg2rlu9jscacku2wwckws7932qqqu8x3gfgw0 cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5 cosmos17yg9mssjenmc3jkqth6ulcwj9cxujrxxzezwta cosmos1f7j7ryulwjfe9ljplvhtcaxa6wqgula3etktce \
  cosmos1lvrwcvrqlc5ktzp2c4t22xgkx29q3y83lktgzl cosmos1vkv9sfwaak76weyamqx0flmng2vuquxqcuqukh cosmos106jwym4s9aujcmes26myzzwqsccw09sdm0v5au cosmos1c7wpeen2uv8thayf7g8q2rgpm29clj0dgrdtzw cosmos1mjxpv9ft30wer7ma7kwfxhm42l379xutplrdk6 \
  cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u \
  cosmos17d0jcz59jf68g52vq38tuuncmwwjk42u6mcxej \
  cosmos1v75snhly7wfndk83ud4daygh397vcmkta8rlzq cosmos1h90ml36rcu7yegwduzgzderj2jmq49hcpfclw9 cosmos1d2mg2euvus3tu2tprfwrfzeal4xu7kygugjxjc

# The ./template folder is created by the docker daemon's user (root on Linux, current user
# when using Docker Desktop on macOS), let's make it ours if needed
if [ ! -x "$SCRIPT_DIR/template/.simapp/config/gentx" ]; then
  sudo chown -R "$(id -u):$(id -g)" "$SCRIPT_DIR/template"
fi

function inline_jq() {
  IN_OUT_PATH="$1"
  shift
  TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/inline_jq.XXXXXXXXX")
  TMP_FILE="$TMP_DIR/$(basename "$IN_OUT_PATH")"
  jq "$@" <"$IN_OUT_PATH" >"$TMP_FILE"
  if ! mv "$TMP_FILE" "$IN_OUT_PATH"; then
    echo >&2 "Temp file '$TMP_FILE' could not be deleted. If it contains sensitive data, you might want to delete it manually."
    exit 3
  fi
}

(
  cd "$SCRIPT_DIR"

  # Sort genesis
  inline_jq "template/.simapp/config/genesis.json" -S

  # Custom settings in config.toml
  "$gnused" -i \
    -e 's/^cors-allowed-origins =.*$/cors-allowed-origins = ["*"]/' \
    -e 's/^timeout-propose =.*$/timeout-propose = "300ms"/' \
    -e 's/^timeout-propose-delta =.*$/timeout-propose-delta = "100ms"/' \
    -e 's/^timeout-prevote =.*$/timeout-prevote = "300ms"/' \
    -e 's/^timeout-prevote-delta =.*$/timeout-prevote-delta = "100ms"/' \
    -e 's/^timeout-precommit =.*$/timeout-precommit = "300ms"/' \
    -e 's/^timeout-precommit-delta =.*$/timeout-precommit-delta = "100ms"/' \
    -e 's/^timeout-commit =.*$/timeout-commit = "1s"/' \
    "template/.simapp/config/config.toml"

  # Custom settings app.toml
  "$gnused" -i \
    -e 's/^enable =.*$/enable = true/' \
    -e 's/^enabled-unsafe-cors =.*$/enabled-unsafe-cors = true/' \
    "template/.simapp/config/app.toml"
)
