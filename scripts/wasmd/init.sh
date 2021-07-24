#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

echo "Waiting for blockchain and REST server to be available ..."
timeout 60 bash -c "until curl -s http://localhost:1319/node_info > /dev/null; do sleep 0.5; done"
# The chain is unreliable in the first second of its existence (https://gist.github.com/webmaster128/8175692d4af5e6c572fddda7a9ef437c)
sleep 2
echo "Waiting for height to be >= 1 ..."
timeout 20 bash -c "until [ \"\$( curl -s http://localhost:1319/blocks/latest | jq -r '.block.header.height // 0' )\" -ge 1 ]; do sleep 0.5; done"
echo "Okay, thank you for your patience."

SCRIPT_DIR="$(realpath "$(dirname "$0")")"

#
# Cosmos SDK init
#
"$SCRIPT_DIR/send_first.js"

#
# CosmWasm init
#
(
  echo "Ensuring contracts' checksums are correct ..."
  cd "$SCRIPT_DIR/contracts"
  sha256sum --check checksums.sha256
)
"$SCRIPT_DIR/deploy_hackatom.js"
"$SCRIPT_DIR/deploy_ibc_reflect.js"
# "$SCRIPT_DIR/deploy_cw3.js"
# "$SCRIPT_DIR/deploy_cw1.js"
