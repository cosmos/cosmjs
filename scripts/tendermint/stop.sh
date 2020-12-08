#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

NAME=${TENDERMINT_NAME:-tendermint-25}

echo "Killing container named '$NAME' ..."
docker container kill "$NAME"
