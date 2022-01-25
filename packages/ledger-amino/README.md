# @cosmjs/ledger-amino

[![npm version](https://img.shields.io/npm/v/@cosmjs/ledger-amino.svg)](https://www.npmjs.com/package/@cosmjs/ledger-amino)

## Supported platforms

This library must be provided with a Ledger transport, and has been tested with
appropriate transports for Node.js as well as certain browsers. In our demo code
we use
[@ledgerhq/hw-transport-node-hid](https://github.com/LedgerHQ/ledgerjs/tree/master/packages/hw-transport-node-hid)
to connect to Ledger devices from Node.js. We use the
[@ledgerhq/hw-transport-webusb](https://github.com/LedgerHQ/ledgerjs/tree/master/packages/hw-transport-webusb)
library to connect to Ledger devices from the browser via USB. You can check the
support status of this library
[here](https://github.com/LedgerHQ/ledgerjs/tree/master/packages/hw-transport-webusb#support-status).

## Running the demo

### Node.js

Connect the Ledger device via USB, open the Cosmos app, then run the demo (this
will also build the package):

```sh
yarn demo-node
```

### Browser

Serve the project locally:

```sh
# Build the package for web
yarn pack-web

# Host the `ledger-amino` package directory, for example using Python 3
python3 -m http.server
```

Visit the demo page in a browser, for example if using the Python 3 option:
http://localhost:8000/demo.

Then follow the instructions on that page.

## Running tests

The tests in this package require a Ledger device
[initialized with the mnemonic](https://support.ledger.com/hc/en-us/articles/360005434914)
from
[scripts/launchpad/README.md#preset-accounts](https://github.com/cosmos/cosmjs/blob/main/scripts/launchpad/README.md#preset-accounts)
(see "Ledger: accounts for Ledger based demos and tests") with an installed
"Cosmos (ATOM)" app. The device must be connected via USB, unlocked and the
Cosmos app must be opened. The tests require the user to manually approve
transactions.

### Stargate tests

Start a local Stargate blockchain as described in
[scripts/simapp42/README.md](https://github.com/cosmos/cosmjs/blob/main/scripts/simapp42/README.md)
and execute:

```sh
export LEDGER_ENABLED=1
export SIMAPP42_ENABLED=1
yarn test
```

### Launchpad tests

Start a local Launchpad blockchain as described in
[scripts/launchpad/README.md](https://github.com/cosmos/cosmjs/blob/main/scripts/launchpad/README.md)
and execute:

```sh
export LEDGER_ENABLED=1
export LAUNCHPAD_ENABLED=1
yarn test
```

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/cosmos/cosmjs/blob/main/NOTICE) and
[LICENSE](https://github.com/cosmos/cosmjs/blob/main/LICENSE)).
