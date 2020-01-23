#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# Choose from https://hub.docker.com/r/cosmwasm/wasmd/tags
REPOSITORY="cosmwasm/wasmd"
VERSION="manual"

BLOCKCHAIN_CONTAINER_NAME="wasmd"

# TODO: make this run as UID? Does this matter?
HOME_DIR="/root"

docker run \
  --rm \
  -it \
  --mount type=volume,source=wasmcli_data,target=/root/.wasmcli \
  -w "$HOME_DIR" \
  --env "HOME=$HOME_DIR" \
  --net "container:$BLOCKCHAIN_CONTAINER_NAME" \
  "$REPOSITORY:$VERSION" \
  wasmcli "$@"
