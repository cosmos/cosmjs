#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
# shellcheck source=./env
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/env

# TODO: make this run as UID? Does this matter?
HOME_DIR="/root"

docker run \
  --rm \
  -it \
  --mount type=volume,source=wasmd_data,target=/root/.wasmd \
  -w "$HOME_DIR" \
  --env "HOME=$HOME_DIR" \
  --net "container:$CONTAINER_NAME" \
  "$REPOSITORY:$VERSION" \
  wasmd "$@"
