# CosmJS

CosmJS is the swiss army knife to power JavaScript based client solutions
ranging from Web apps/explorers over browser extensions to server-side clients
like faucets/scrapers in the Cosmos ecosystem.

"Cosm" stands for Cosmos and "JS" stands for _runs everywhere_ – we actually
develop in TypeScript.

## Packages

CosmJS is a library that consists of many smaller npm packages within the
[@cosmjs namespace](https://www.npmjs.com/org/cosmjs), a so called monorepo.
Here are some of them to get an idea:

| Package                               | Description                                            | Latest version                                                                                                      |
| ------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| [@cosmjs/sdk38](packages/sdk38)       | A client library for the Cosmos SDK 0.38               | [![npm version](https://img.shields.io/npm/v/@cosmjs/sdk38.svg)](https://www.npmjs.com/package/@cosmjs/sdk38)       |
| [@cosmjs/faucet](packages/faucet)     | A faucet application for node.js                       | [![npm version](https://img.shields.io/npm/v/@cosmjs/faucet.svg)](https://www.npmjs.com/package/@cosmjs/faucet)     |
| [@cosmjs/cosmwasm](packages/cosmwasm) | Client for chains with the CosmWasm module enabled     | [![npm version](https://img.shields.io/npm/v/@cosmjs/cosmwasm.svg)](https://www.npmjs.com/package/@cosmjs/cosmwasm) |
| [@cosmjs/crypto](packages/crypto)     | Cryptography resources for blockchain projects         | [![npm version](https://img.shields.io/npm/v/@cosmjs/crypto.svg)](https://www.npmjs.com/package/@cosmjs/crypto)     |
| [@cosmjs/encoding](packages/encoding) | Encoding helpers for blockchain projects               | [![npm version](https://img.shields.io/npm/v/@cosmjs/encoding.svg)](https://www.npmjs.com/package/@cosmjs/encoding) |
| [@cosmjs/math](packages/math)         | Safe integers; decimals for handling financial amounts | [![npm version](https://img.shields.io/npm/v/@cosmjs/math.svg)](https://www.npmjs.com/package/@cosmjs/math)         |

### Modularity

We're pretty proud of the modularity and a clean dependency tree in this
monorepo. This ensures software quality on our side and lets users pick exactly
what they need. Here you see how everything fits together (every item is an npm
package; right depends on left):

![CosmJS dependency tree](docs/cosmjs-tree.png)

<!--
Build with depsight (https://github.com/webmaster128/depsight), using:

from_npm ~/cosmjs | depsight --exclude cosmjs-monorepo-root --format svg --output - | inkscape --pipe --export-width 3000 --export-filename cosmjs-tree.png

optipng cosmjs-tree.png
-->

### Supported JS environments

Currently the codebase supports the following environments:

1. Node.js 10+
2. Modern browsers (Chromium/Firefox/Safari, no IE or Edge)
3. Browser extensions (Chromium/Firefox)

Our current JavaScript target standard is ES2017, giving us native async/wait
support. We use WebAssembly to implement certain crypto.

We're happy to adjust this list according to users' needs as long as you don't
ask for IE support. If your environment does not support Wasm, we can work on a
solution with swapable implementations.

## Development

Requires Node 10+. For best results, use yarn. The basic commands are:

```sh
yarn install

# compile the code
yarn build
# run unit tests
yarn test

# format and lint the code
yarn format && yarn lint
```

### Integration tests

To run the entire test suite, you need to run a local blockchain to test
against. We use [wasmd](https://github.com/CosmWasm/wasmd) for both CosmWasm
tests and as a generic Cosmos SDK 0.38 blockchain. This should work on any
Linux/OSX system with docker installed:

```sh
./scripts/wasmd/start.sh
./scripts/wasmd/init.sh
WASMD_ENABLED=1 yarn test
./scripts/wasmd/stop.sh
```
