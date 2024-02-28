#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

# Please keep this in sync with the Ports overview in HACKING.md
TENDERMINT_PORT_GUEST="26657"
TENDERMINT_PORT_HOST="26659"
LCD_API_PORT_GUEST="1317"
LCD_API_PORT_HOST="1319"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
# shellcheck source=./env
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/env

TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/wasmd.XXXXXXXXX")
chmod 777 "$TMP_DIR"
echo "Using temporary dir $TMP_DIR"
WASMD_LOGFILE="$TMP_DIR/wasmd.log"

# Use a fresh volume for every start
docker volume rm -f wasmd_data

# This starts up wasmd
docker run --rm \
  --name "$CONTAINER_NAME" \
  -p "$TENDERMINT_PORT_HOST":"$TENDERMINT_PORT_GUEST" \
  -p "$LCD_API_PORT_HOST":"$LCD_API_PORT_GUEST" \
  --mount type=bind,source="$SCRIPT_DIR/template",target=/template \
  --mount type=volume,source=wasmd_data,target=/root \
  "$REPOSITORY:$VERSION" \
  ./run_wasmd.sh /template \
  >"$WASMD_LOGFILE" 2>&1 &

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

if [ -n "${CI:-}" ]; then
  # Give process some time to come alive. No idea why this helps. Needed for CI.
  sleep 0.5

  # Follow the logs in CI's background job
  tail -f "$WASMD_LOGFILE"
fi
