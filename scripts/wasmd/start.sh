#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
# shellcheck source=./env
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/env

echo "$CONTAINER_NAME"

TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/gaia.XXXXXXXXX")
chmod 777 "$TMP_DIR"
echo "Using temporary dir $TMP_DIR"
WASMD_LOGFILE="$TMP_DIR/wasmd.log"
REST_SERVER_LOGFILE="$TMP_DIR/rest-server.log"

# This starts up wasmd
docker volume rm -f wasmd_data
docker run --rm \
  --name "$CONTAINER_NAME" \
  -p 1317:1317 \
  -p 26657:26657 \
  -p 26656:26656 \
  --mount type=bind,source="$SCRIPT_DIR/template",target=/template \
  --mount type=volume,source=wasmd_data,target=/root \
  "$REPOSITORY:$VERSION" \
  ./run_wasmd.sh /template \
  > "$WASMD_LOGFILE" &

echo "wasmd running and logging into $WASMD_LOGFILE"

# Debug chain start
# sleep 3 && cat "$WASMD_LOGFILE"

# Use a large timeout because of potentially long image download in `docker run`
if ! timeout 180 bash -c "until docker inspect -f '{{.State.Running}}' '$CONTAINER_NAME' &> /dev/null; do sleep 0.5; done"; then
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
  --cors \
  --laddr tcp://0.0.0.0:1317 \
  > "$REST_SERVER_LOGFILE" &

echo "rest server running on http://localhost:1317 and logging into $REST_SERVER_LOGFILE"

# Give REST server some time to come alive. No idea why this helps. Needed for CI.
if [ -n "${CI:-}" ]; then
  sleep 0.5

  # Follow the logs in CI's background job
  tail -f "$WASMD_LOGFILE"
fi

# Debug rest server start
# sleep 3 && cat "$REST_SERVER_LOGFILE"
