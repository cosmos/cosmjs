#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

declare -a TM_VERSIONS
TM_VERSIONS[34]=v0.34.19
TM_VERSIONS[35]=v0.35.6

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

for KEY in "${!TM_VERSIONS[@]}"; do
  export TENDERMINT_NAME="tendermint-$KEY"

  echo "Stopping $TENDERMINT_NAME ..."
  "$SCRIPT_DIR/stop.sh"
done
