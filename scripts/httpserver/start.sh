#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

# Please keep this in sync with the Ports overview in HACKING.md
DEFAULT_PORT_GUEST="5555"
DEFAULT_PORT_HOST="5555"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

HTTPSERVER_DIR=$(mktemp -d "${TMPDIR:-/tmp}/httpserver.XXXXXXXXX")
export HTTPSERVER_DIR
echo "HTTPSERVER_DIR = $HTTPSERVER_DIR"

IMAGE_NAME="httpserver:local"
CONTAINER_NAME="httpserver"

LOGFILE_DEFAULT="${HTTPSERVER_DIR}/httpserver_$DEFAULT_PORT_HOST.log"

docker build -t "$IMAGE_NAME" "$SCRIPT_DIR"

docker run --rm \
  --user="$UID" \
  --name "$CONTAINER_NAME" \
  -p "$DEFAULT_PORT_HOST:$DEFAULT_PORT_GUEST" \
  "$IMAGE_NAME" \
  >"$LOGFILE_DEFAULT" &

# Debug start
sleep 3
cat "$LOGFILE_DEFAULT"
