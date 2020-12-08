#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

# Please keep this in sync with the Ports overview in HACKING.md
# Tendermint port (26657) and p2p port (26656) are not exposed since we don't need them for testing
LCD_API_PORT_GUEST="1317"
LCD_API_PORT_HOST="1317"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
# shellcheck source=./env
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/env

TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/wasmd.XXXXXXXXX")
chmod 777 "$TMP_DIR"
echo "Using temporary dir $TMP_DIR"
WASMD_LOGFILE="$TMP_DIR/wasmd.log"
REST_SERVER_LOGFILE="$TMP_DIR/rest-server.log"

# Use a fresh volume for every start
docker volume rm -f launchpad_data

# This starts up wasmd
docker run --rm \
  --name "$CONTAINER_NAME" \
  -p "$LCD_API_PORT_HOST":"$LCD_API_PORT_GUEST" \
  --mount type=bind,source="$SCRIPT_DIR/template",target=/template \
  --mount type=volume,source=launchpad_data,target=/root \
  "$REPOSITORY:$VERSION" \
  ./run_wasmd.sh /template \
  >"$WASMD_LOGFILE" &

echo "wasmd running and logging into $WASMD_LOGFILE"

# Debug chain start
# sleep 3 && cat "$WASMD_LOGFILE"

# Use a large timeout because of potentially long image download in `docker run`
if ! timeout 180 bash -c "until [ \"\$( docker container inspect -f '{{.State.Status}}' \"$CONTAINER_NAME\" 2> /dev/null )\" = \"running\" ]; do sleep 0.5; done"; then
  echo "Container named '$CONTAINER_NAME' not running. We cannot continue." \
    "This can happen when 'docker run' needs too long to download and start." \
    "It might be worth retrying this step once the image is in the local docker cache."
  docker kill "$CONTAINER_NAME"
  exit 1
fi

docker exec "$CONTAINER_NAME" \
  wasmcli rest-server \
  --node tcp://localhost:26657 \
  --trust-node \
  --unsafe-cors \
  --laddr "tcp://0.0.0.0:$LCD_API_PORT_GUEST" \
  >"$REST_SERVER_LOGFILE" &

echo "rest server running on http://localhost:$LCD_API_PORT_HOST and logging into $REST_SERVER_LOGFILE"

if [ -n "${CI:-}" ]; then
  # Give process some time to come alive. No idea why this helps. Needed for CI.
  sleep 0.5

  # Follow the logs in CI's background job
  tail -f "$WASMD_LOGFILE"
fi

# Debug rest server start
# sleep 3 && cat "$REST_SERVER_LOGFILE"
