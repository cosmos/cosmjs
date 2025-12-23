#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

if test -z "$(eval echo "\$TENDERMINT_NAME")"; then
  echo "\$TENDERMINT_NAME must be set when running this script"
  exit 1
fi

echo "Killing container named '$TENDERMINT_NAME' ..."
docker container kill "$TENDERMINT_NAME"
