#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# Choose from https://hub.docker.com/r/tendermint/gaia/tags
VERSION="v2.0.4"

TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/gaia.XXXXXXXXX")
chmod 777 "$TMP_DIR"
echo "Using temporary dir $TMP_DIR"
GAIAD_LOGFILE="$TMP_DIR/gaiad.log"
REST_SERVER_LOGFILE="$TMP_DIR/rest-server.log"
CURRENT_DIR="$(realpath "$(dirname "$0")")"
HOME_DIR="/home"
CONTAINER_NAME="gaiad"

rm -rf "$CURRENT_DIR/.gaiad/data"
mkdir -p "$CURRENT_DIR/.gaiad/data"
cp "$CURRENT_DIR/priv_validator_state.template.json" "$CURRENT_DIR/.gaiad/data/priv_validator_state.json"

docker run \
  --rm \
  --user="$UID" \
  -t \
  --name "$CONTAINER_NAME" \
  -v "$CURRENT_DIR/.gaiad:$HOME_DIR/.gaiad" \
  -v "$CURRENT_DIR/.gaiacli:$HOME_DIR/.gaiacli" \
  -w "$HOME_DIR" \
  --env "HOME=$HOME_DIR" \
  -p 46656:46656 \
  -p 46657:46657 \
  -p 1317:1317 \
  "tendermint/gaia:${VERSION}" \
  gaiad start \
  --rpc.laddr tcp://0.0.0.0:46657 \
  > "$GAIAD_LOGFILE" &

echo "gaiad running and logging into $GAIAD_LOGFILE"

sleep 10

docker exec "$CONTAINER_NAME" \
  gaiacli rest-server \
  --node tcp://localhost:46657 \
  --trust-node \
  --laddr tcp://0.0.0.0:1317 \
  > "$REST_SERVER_LOGFILE" &

echo "rest server running on http://localhost:1317 and logging into $REST_SERVER_LOGFILE"
