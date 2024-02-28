#!/bin/bash
set -o errexit -o nounset -o pipefail

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
source "$SCRIPT_DIR"/env


docker run --rm \
  --mount type=bind,source="$SCRIPT_DIR/template",target=/root \
  "$REPOSITORY:$VERSION" \
  ./setup_wasmd.sh
