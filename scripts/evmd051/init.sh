#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

echo "Waiting for blockchain and Tendermint RPC server to be available ..."
timeout 60 bash -c "until curl -s http://localhost:26661/health > /dev/null; do sleep 0.5; done"
# The chain is unreliable in the first second of its existence
sleep 2
echo "Waiting for height to be >= 1 ..."
timeout 20 bash -c "until [ \"\$( curl -s http://localhost:26661/status | jq -r '.result.sync_info.latest_block_height // 0' )\" -ge 1 ]; do sleep 0.5; done"
echo "Okay, thank you for your patience."
