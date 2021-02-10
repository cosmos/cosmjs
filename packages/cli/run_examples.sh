#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

PATH="$(realpath ./bin):$PATH"

cosmwasm-cli --init examples/coralnet.ts --code "process.exit(0)"
if [ -n "${LAUNCHPAD_ENABLED:-}" ]; then
  cosmwasm-cli --init examples/delegate.ts --code "process.exit(0)"
fi
cosmwasm-cli --init examples/faucet_addresses.ts --code "process.exit(0)"
cosmwasm-cli --init examples/generate_address.ts --code "process.exit(0)"
cosmwasm-cli --init examples/helpers.ts --code "process.exit(0)"
cosmwasm-cli --init examples/local_faucet.ts --code "process.exit(0)"
cosmwasm-cli --init examples/mask.ts --code "process.exit(0)"
