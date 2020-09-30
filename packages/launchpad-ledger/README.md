# @cosmjs/launchpad-ledger

[![npm version](https://img.shields.io/npm/v/@cosmjs/launchpad-ledger.svg)](https://www.npmjs.com/package/@cosmjs/launchpad-ledger)

## Supported platforms

This library works with Node.js as well as certain browsers. We use the
[@ledgerhq/hw-transport-webusb](https://github.com/LedgerHQ/ledgerjs/tree/master/packages/hw-transport-webusb)
library to connect to Ledger devices from the browser via USB. You can check the
support status of this library
[here](https://github.com/LedgerHQ/ledgerjs/tree/master/packages/hw-transport-webusb#support-status).

Note the optional dependencies:

```json
"optionalDependencies": {
  "@ledgerhq/hw-transport-node-hid": "^5.23.2",
  "@ledgerhq/hw-transport-webusb": "^5.23.0"
}
```

If you are using this library with Node.js you must install
`@ledgerhq/hw-transport-node-hid`. You’ll need `@ledgerhq/hw-transport-webusb`
for the browser.

## Running the demo

### Node.js

Connect the Ledger device via USB, open the Cosmos app, then run the demo (this
will also build the package):

```sh
yarn demo-node
```

### Browser

Build the package for web:

```sh
yarn pack-web
```

Host the `launchpad-ledger` package directory, for example using Python 3:

```sh
python3 -m http.server
```

Visit the demo page in a browser, for example if using the Python 3 option:
http://localhost:8000/demo.

Then follow the instructions on that page.

## Runnng tests

The tests in this package require a Ledger device initialized with the mnemonic
from
[scripts/wasmd/README.md#preset-accounts](https://github.com/CosmWasm/cosmjs/blob/master/scripts/wasmd/README.md#preset-accounts)
(see "Ledger: accounts for Ledger based demos and tests") with an installed
"Cosmos (ATOM)" app. The device must be connected via USB, unlocked and the
Cosmos app must be opened. The tests require the user to manually approve
transactions. Start a local wasmd blockchain as described in
[scripts/wasmd/README.md](https://github.com/CosmWasm/cosmjs/blob/master/scripts/wasmd/README.md)
and execute:

```sh
export LEDGER_INTERACTIVE_ENABLED=1
export LEDGER_ENABLED=1
export WASMD_ENABLED=1
yarn test
```

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/CosmWasm/cosmjs/blob/master/NOTICE) and
[LICENSE](https://github.com/CosmWasm/cosmjs/blob/master/LICENSE)).
