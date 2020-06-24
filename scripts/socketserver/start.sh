#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

SOCKETSERVER_DIR=$(mktemp -d "${TMPDIR:-/tmp}/socketserver.XXXXXXXXX")
export SOCKETSERVER_DIR
echo "SOCKETSERVER_DIR = $SOCKETSERVER_DIR"

NAME_DEFAULT="socketserver-default"
NAME_SLOW="socketserver-slow"

LOGFILE_DEFAULT="${SOCKETSERVER_DIR}/socketserver_4444.log"
LOGFILE_SLOW="${SOCKETSERVER_DIR}/socketserver_4445.log"

docker build -t "socketserver:local" "$SCRIPT_DIR"

docker run --rm \
  --user="$UID" \
  --name "$NAME_DEFAULT" \
  -p "4444:4000" \
  socketserver:local \
  --delay 0 \
  > "$LOGFILE_DEFAULT" &
docker run --rm \
  --user="$UID" \
  --name "$NAME_SLOW" \
  -p "4445:4000" \
  socketserver:local \
  --delay 5 \
  > "$LOGFILE_SLOW" &

# Debug start
sleep 3
cat "$LOGFILE_DEFAULT"
cat "$LOGFILE_SLOW"
