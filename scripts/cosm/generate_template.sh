#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# Choose from https://hub.docker.com/r/cosmwasm/wasmd/tags
REPOSITORY="cosmwasm/wasmd"
VERSION="manual"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"

rm -rf "$SCRIPT_DIR/template"
mkdir "$SCRIPT_DIR/template"

# any any more addresses you want to fund in genesis below
docker run --rm \
  -e PASSWORD=my-secret-password \
  --mount type=bind,source="$SCRIPT_DIR/template",target=/root \
  "$REPOSITORY:$VERSION" \
  ./setup.sh \
  cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6

# this is created as root, let's make it ours
sudo chown -R "$(id -u):$(id -g)" "$SCRIPT_DIR/template"
