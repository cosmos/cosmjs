#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

# Find latest patch releases at
# - https://hub.docker.com/r/tendermint/tendermint/tags/
# - https://hub.docker.com/r/cometbft/cometbft/tags/
declare -a TM_IMAGES
TM_IMAGES[34]="tendermint/tendermint:v0.34.19"
TM_IMAGES[35]="tendermint/tendermint:v0.35.6"
TM_IMAGES[37]="cometbft/cometbft:v0.37.0-rc3"

declare -a TM_ROOTS
TM_ROOTS[34]="/tendermint"
TM_ROOTS[35]="/tendermint"
TM_ROOTS[37]="/cometbft"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

for KEY in "${!TM_IMAGES[@]}"; do
  export TENDERMINT_IMAGE="${TM_IMAGES[$KEY]}"
  export TENDERMINT_ROOT="${TM_ROOTS[$KEY]}"
  export TENDERMINT_PORT="111$KEY"
  export TENDERMINT_NAME="tendermint-$KEY"

  echo "Starting $TENDERMINT_NAME ($TENDERMINT_IMAGE) on port $TENDERMINT_PORT ..."
  "$SCRIPT_DIR/start.sh"
done
