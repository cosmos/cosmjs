#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

gnused="$(command -v gsed || echo sed)"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
# shellcheck source=./env
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/env

rm -rf "$SCRIPT_DIR/template"
mkdir "$SCRIPT_DIR/template"
cp setup.sh "$SCRIPT_DIR/template/"
chmod +x "$SCRIPT_DIR/template/setup.sh"
cp run_evmd.sh "$SCRIPT_DIR/template/"
chmod +x "$SCRIPT_DIR/template/run_evmd.sh"

docker run --rm \
  --mount type=bind,source="$SCRIPT_DIR/template",target=/root \
  "$REPOSITORY:$VERSION" \
  ./setup.sh

# The ./template folder is created by the docker daemon's user (root on Linux, current user
# when using Docker Desktop on macOS), let's make it ours if needed
if [ ! -x "$SCRIPT_DIR/template/.evmd/config/gentx" ]; then
  sudo chown -R "$(id -u):$(id -g)" "$SCRIPT_DIR/template"
fi

function inline_jq() {
  local IN_OUT_PATH="$1"
  shift
  local TMP_DIR
  local TMP_FILE
  TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/inline_jq.XXXXXXXXX")
  TMP_FILE="$TMP_DIR/$(basename "$IN_OUT_PATH")"
  jq "$@" <"$IN_OUT_PATH" >"$TMP_FILE"
  if ! mv "$TMP_FILE" "$IN_OUT_PATH"; then
    echo >&2 "Temp file '$TMP_FILE' could not be deleted. If it contains sensitive data, you might want to delete it manually."
    exit 3
  fi
}

(
  cd "$SCRIPT_DIR"

  # Sort genesis for consistency
  inline_jq "template/.evmd/config/genesis.json" -S

  # Custom settings in config.toml
  "$gnused" -i \
    -e 's/^cors_allowed_origins =.*$/cors_allowed_origins = ["*"]/' \
    "template/.evmd/config/config.toml"

  # Custom settings app.toml - enable unsafe CORS for testing
  "$gnused" -i \
    -e 's/^enabled-unsafe-cors =.*$/enabled-unsafe-cors = true/' \
    "template/.evmd/config/app.toml"
)

echo "Template generated successfully at $SCRIPT_DIR/template"
