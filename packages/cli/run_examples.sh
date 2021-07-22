#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

if [ -n "${SIMAPP_ENABLED:-}" ]; then
  yarn node ./bin/cosmwasm-cli --init examples/cosmwasm.ts --code "process.exit(0)"
fi
if [ -n "${LAUNCHPAD_ENABLED:-}" ]; then
  yarn node ./bin/cosmwasm-cli --init examples/delegate.ts --code "process.exit(0)"
fi
yarn node ./bin/cosmwasm-cli --init examples/faucet_addresses.ts --code "process.exit(0)"
yarn node ./bin/cosmwasm-cli --init examples/generate_address.ts --code "process.exit(0)"
yarn node ./bin/cosmwasm-cli --init examples/local_faucet.ts --code "process.exit(0)"
yarn node ./bin/cosmwasm-cli --init examples/mask.ts --code "process.exit(0)"
yarn node ./bin/cosmwasm-cli --init examples/multisig_address.ts --code "process.exit(0)"
if [ -n "${SIMAPP_ENABLED:-}" ]; then
  yarn node ./bin/cosmwasm-cli --init examples/stargate.ts --code "process.exit(0)"
fi
