#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

# Please keep this in sync with the Ports overview in HACKING.md
TENDERMINT_PORT_GUEST="26657"
TENDERMINT_PORT_HOST="26660"
API_PORT_GUEST="1317"
API_PORT_HOST="1320"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
# shellcheck source=./env
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/env

TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/simapp_slow.XXXXXXXXX")
chmod 777 "$TMP_DIR"
echo "Using temporary dir $TMP_DIR"
SIMD_LOGFILE="$TMP_DIR/simd_slow.log"

# Use a fresh volume for every start
docker volume rm -f simapp_slow_data

docker run --rm \
  --name "$CONTAINER_NAME_SLOW" \
  -p "$TENDERMINT_PORT_HOST":"$TENDERMINT_PORT_GUEST" \
  -p "$API_PORT_HOST":"$API_PORT_GUEST" \
  --mount type=bind,source="$SCRIPT_DIR/template_slow",target=/template \
  --mount type=volume,source=simapp_slow_data,target=/root \
  "$REPOSITORY:$VERSION" \
  /template/run_simd.sh \
  >"$SIMD_LOGFILE" 2>&1 &

echo "slow simd running on http://localhost:$TENDERMINT_PORT_HOST and logging into $SIMD_LOGFILE"

if [ -n "${CI:-}" ]; then
  # Give process some time to come alive. No idea why this helps. Needed for CI.
  sleep 0.5

  # Follow the logs in CI's background job
  tail -f "$SIMD_LOGFILE"
fi
