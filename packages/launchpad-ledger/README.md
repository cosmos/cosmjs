# @cosmjs/launchpad-ledger

[![npm version](https://img.shields.io/npm/v/@cosmjs/launchpad-ledger.svg)](https://www.npmjs.com/package/@cosmjs/launchpad-ledger)

## Supported platforms

We use the
[@ledgerhq/hw-transport-webusb](https://github.com/LedgerHQ/ledgerjs/tree/master/packages/hw-transport-webusb)
library to connect to Ledger devices from the browser via USB. You can check the
support status of this library
[here](https://github.com/LedgerHQ/ledgerjs/tree/master/packages/hw-transport-webusb#support-status).

## Running the demo

Build the package for web:

```sh
yarn pack-web
```

Host the `launchpad-ledger` package directory, for example using Python 3:

```sh
python3 -m http.server
```

Visit the demo page in a browser, for example if using the Python 3 option:
[http://localhost:8000/demo]().

Then follow the instructions on that page.

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/CosmWasm/cosmjs/blob/master/NOTICE) and
[LICENSE](https://github.com/CosmWasm/cosmjs/blob/master/LICENSE)).
