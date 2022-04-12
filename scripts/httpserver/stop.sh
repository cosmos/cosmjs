#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

CONTAINER_NAME="httpserver"

echo "Killing socketserver containers ..."
docker container kill "$CONTAINER_NAME"
