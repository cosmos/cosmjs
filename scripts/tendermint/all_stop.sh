#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

for KEY in 34 37 38; do
  export TENDERMINT_NAME="tendermint-$KEY"

  echo "Stopping $TENDERMINT_NAME ..."
  "$SCRIPT_DIR/stop.sh"
done
