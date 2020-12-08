#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

# Please keep this in sync with the Ports overview in HACKING.md
DEFAULT_PORT_GUEST="4000"
DEFAULT_PORT_HOST="4444"
SLOW_PORT_GUEST="4000"
SLOW_PORT_HOST="4445"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SOCKETSERVER_DIR=$(mktemp -d "${TMPDIR:-/tmp}/socketserver.XXXXXXXXX")
export SOCKETSERVER_DIR
echo "SOCKETSERVER_DIR = $SOCKETSERVER_DIR"

NAME_DEFAULT="socketserver-default"
NAME_SLOW="socketserver-slow"

LOGFILE_DEFAULT="${SOCKETSERVER_DIR}/socketserver_$DEFAULT_PORT_HOST.log"
LOGFILE_SLOW="${SOCKETSERVER_DIR}/socketserver_$SLOW_PORT_HOST.log"

docker build -t "socketserver:local" "$SCRIPT_DIR"

docker run --rm \
  --user="$UID" \
  --name "$NAME_DEFAULT" \
  -p "$DEFAULT_PORT_HOST:$DEFAULT_PORT_GUEST" \
  socketserver:local \
  --delay 0 \
  >"$LOGFILE_DEFAULT" &
docker run --rm \
  --user="$UID" \
  --name "$NAME_SLOW" \
  -p "$SLOW_PORT_HOST:$SLOW_PORT_GUEST" \
  socketserver:local \
  --delay 5 \
  >"$LOGFILE_SLOW" &

# Debug start
sleep 3
cat "$LOGFILE_DEFAULT"
cat "$LOGFILE_SLOW"
