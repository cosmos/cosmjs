#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

gnused="$(command -v gsed || echo sed)"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"

# Create template for slow evmd based on the regular evmd template
(
  cd "$SCRIPT_DIR"
  rm -rf template_slow
  cp -R template template_slow
  chmod +x "$SCRIPT_DIR/template_slow/setup.sh"
  chmod +x "$SCRIPT_DIR/template_slow/run_evmd.sh"

  # Slow settings in config.toml (2x slower than regular template)
  if [ "$gnused" = "gsed" ]; then
    "$gnused" -i \
      -e 's/^timeout_propose =.*$/timeout_propose = "4s"/' \
      -e 's/^timeout_propose_delta =.*$/timeout_propose_delta = "400ms"/' \
      -e 's/^timeout_prevote =.*$/timeout_prevote = "1s"/' \
      -e 's/^timeout_prevote_delta =.*$/timeout_prevote_delta = "400ms"/' \
      -e 's/^timeout_precommit =.*$/timeout_precommit = "1s"/' \
      -e 's/^timeout_precommit_delta =.*$/timeout_precommit_delta = "400ms"/' \
      -e 's/^timeout_commit =.*$/timeout_commit = "2s"/' \
      -e 's/^timeout_broadcast_tx_commit =.*$/timeout_broadcast_tx_commit = "10s"/' \
      "template_slow/.evmd/config/config.toml"
  else
    # BSD sed requires an empty string argument for -i
    "$gnused" -i '' \
      -e 's/^timeout_propose =.*$/timeout_propose = "4s"/' \
      -e 's/^timeout_propose_delta =.*$/timeout_propose_delta = "400ms"/' \
      -e 's/^timeout_prevote =.*$/timeout_prevote = "1s"/' \
      -e 's/^timeout_prevote_delta =.*$/timeout_prevote_delta = "400ms"/' \
      -e 's/^timeout_precommit =.*$/timeout_precommit = "1s"/' \
      -e 's/^timeout_precommit_delta =.*$/timeout_precommit_delta = "400ms"/' \
      -e 's/^timeout_commit =.*$/timeout_commit = "2s"/' \
      -e 's/^timeout_broadcast_tx_commit =.*$/timeout_broadcast_tx_commit = "10s"/' \
      "template_slow/.evmd/config/config.toml"
  fi
)

echo "Slow template generated successfully at $SCRIPT_DIR/template_slow"
