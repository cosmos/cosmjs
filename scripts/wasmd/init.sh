#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

echo "Waiting for blockchain and REST server to be available ..."
timeout 60 bash -c "until curl -s http://localhost:1317/node_info > /dev/null; do sleep 0.5; done"
# The chain is unreliable in the first second of its existence (https://gist.github.com/webmaster128/8175692d4af5e6c572fddda7a9ef437c)
sleep 1
echo "Okay, thank you for your patience."

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
"$SCRIPT_DIR/deploy_erc20.js"
"$SCRIPT_DIR/deploy_nameservice.js"
