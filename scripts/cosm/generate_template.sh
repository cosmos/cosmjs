#!/bin/bash

set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# Choose from https://hub.docker.com/r/cosmwasm/wasmd/tags
VERSION="manual"
CONTAINER_NAME="wasmd"

rm -rf ./template
mkdir ./template

# any any more addresses you want to fund in genesis below
docker run --rm \
    -e PASSWORD=my-secret-password \
    --mount type=bind,source="$(pwd)/template",target=/root \
    "$CONTAINER_NAME:$VERSION" \
    ./setup.sh \
    cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6

# this is created as root, let's make it ours
sudo chown -R "$(id -u):$(id -g)" ./template
