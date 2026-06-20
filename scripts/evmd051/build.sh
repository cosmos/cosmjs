#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
# shellcheck source=./env
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/env

# Allow specifying a specific version/branch/tag. Pinned to match VERSION in
# ./env and ARG EVMD_VERSION in ./Dockerfile; building from a moving "main"
# breaks CI when upstream changes the expected config.toml schema.
EVMD_VERSION="${EVMD_VERSION:-v0.5.1}"

echo "Building evmd Docker image from cosmos/evm@$EVMD_VERSION..."
docker build \
  --build-arg EVMD_VERSION="$EVMD_VERSION" \
  -t "$REPOSITORY:$VERSION" \
  -f "$SCRIPT_DIR/Dockerfile" \
  "$SCRIPT_DIR"

echo "Docker image $REPOSITORY:$VERSION built successfully!"
echo "You can now run ./start.sh to start the evmd container."
