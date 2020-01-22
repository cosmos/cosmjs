#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

GAIAD_CONTAINER_NAME="gaiad"

echo "Killing Cosmos container..."
docker container kill "$GAIAD_CONTAINER_NAME"
