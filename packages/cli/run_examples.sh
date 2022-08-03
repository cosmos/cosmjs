#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

if [ -n "${WASMD_ENABLED:-}" ]; then
  yarn node ./bin/cosmjs-cli --init examples/cosmwasm.ts --code "process.exit(0)"
fi
if [ -n "${SIMAPP44_ENABLED:-}" ]; then
  yarn node ./bin/cosmjs-cli --init examples/delegate.ts --code "process.exit(0)"
fi
yarn node ./bin/cosmjs-cli --init examples/faucet_addresses.ts --code "process.exit(0)"
yarn node ./bin/cosmjs-cli --init examples/generate_address.ts --code "process.exit(0)"
yarn node ./bin/cosmjs-cli --init examples/local_faucet.ts --code "process.exit(0)"
yarn node ./bin/cosmjs-cli --init examples/mask.ts --code "process.exit(0)"
yarn node ./bin/cosmjs-cli --init examples/multisig_address.ts --code "process.exit(0)"
if [ -n "${SIMAPP44_ENABLED:-}" ]; then
  yarn node ./bin/cosmjs-cli --init examples/stargate.ts --code "process.exit(0)"
  yarn node ./bin/cosmjs-cli --init examples/simulate.ts --code "process.exit(0)"
fi

# Disabled as this requires internet access
# yarn node ./bin/cosmjs-cli --init examples/figment.ts --code "process.exit(0)"
