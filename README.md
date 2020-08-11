<h1><p align="center"><img alt="CosmJS" src="docs/logo-vertical-light.png" width="180" /></p></h1>

CosmJS is the Swiss Army knife to power JavaScript based client solutions
ranging from Web apps/explorers over browser extensions to server-side clients
like faucets/scrapers in the Cosmos ecosystem.

"Cosm" is short for Cosmos and "JS" is short for _runs everywhere_ – we actually
develop in TypeScript.

## Packages

CosmJS is a library that consists of many smaller npm packages within the
[@cosmjs namespace](https://www.npmjs.com/org/cosmjs), a so called monorepo.
Here are some of them to get an idea:

| Package                                 | Description                                                                                                                                                                                                                              | Latest                                                                                                                |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [@cosmjs/launchpad](packages/launchpad) | A client library for the Cosmos SDK 0.37 (cosmoshub-3), 0.38 and 0.39 (Launchpad)                                                                                                                                                        | [![npm version](https://img.shields.io/npm/v/@cosmjs/launchpad.svg)](https://www.npmjs.com/package/@cosmjs/launchpad) |
| [@cosmjs/faucet](packages/faucet)       | A faucet application for node.js                                                                                                                                                                                                         | [![npm version](https://img.shields.io/npm/v/@cosmjs/faucet.svg)](https://www.npmjs.com/package/@cosmjs/faucet)       |
| [@cosmjs/cosmwasm](packages/cosmwasm)   | Client for chains with the CosmWasm module enabled                                                                                                                                                                                       | [![npm version](https://img.shields.io/npm/v/@cosmjs/cosmwasm.svg)](https://www.npmjs.com/package/@cosmjs/cosmwasm)   |
| [@cosmjs/crypto](packages/crypto)       | Cryptography for blockchain projects, e.g. hashing (SHA-2, Keccak256, Ripemd160), signing (secp256k1, ed25519), HD key derivation (BIPO39, SLIP-0010), KDFs and symmetric encryption for key storage (PBKDF2, Argon2, XChaCha20Poly1305) | [![npm version](https://img.shields.io/npm/v/@cosmjs/crypto.svg)](https://www.npmjs.com/package/@cosmjs/crypto)       |
| [@cosmjs/encoding](packages/encoding)   | Encoding helpers for blockchain projects                                                                                                                                                                                                 | [![npm version](https://img.shields.io/npm/v/@cosmjs/encoding.svg)](https://www.npmjs.com/package/@cosmjs/encoding)   |
| [@cosmjs/math](packages/math)           | Safe integers; decimals for handling financial amounts                                                                                                                                                                                   | [![npm version](https://img.shields.io/npm/v/@cosmjs/math.svg)](https://www.npmjs.com/package/@cosmjs/math)           |

### Modularity

We're pretty proud of the modularity and a clean dependency tree in this
monorepo. This ensures software quality on our side and lets users pick exactly
what they need. Here you see how everything fits together (every item is a npm
package; right depends on left):

![CosmJS dependency tree](docs/cosmjs-tree.png)

If this was not enough to scare you away, check out the version including app
runtime dependencies: [cosmjs-tree-full.png](docs/cosmjs-tree-full.png).

<!--
Build with depsight (https://github.com/webmaster128/depsight), using:

from_npm . | depsight --include "^@cosmjs" --format png --dpi 150 --output docs/cosmjs-tree.png
from_npm . | depsight --exclude cosmjs-monorepo-root --format png --dpi 150 --output docs/cosmjs-tree-full.png
optipng docs/cosmjs-tree*.png
-->

### Supported JS environments

Currently the codebase supports the following runtime environments:

1. Node.js 10+
2. Modern browsers (Chromium/Firefox/Safari, no Internet Explorer or
   [Edge Spartan](https://en.wikipedia.org/wiki/Microsoft_Edge#Development))
3. Browser extensions (Chromium/Firefox)

Our current JavaScript target standard is ES2017, giving us native async/await
support. We use WebAssembly to implement certain cryptographic functions.

We're happy to adjust this list according to users' needs as long as you don't
ask for Internet Explorer support. If your environment does not support Wasm, we
can work on a solution with swapable implementations.

## Roadmap

In addition to the
[development board](https://github.com/orgs/CosmWasm/projects/2) and our
[release milestones](https://github.com/CosmWasm/cosmjs/milestones), we maintain
a higher level roadmap
[in this Trello board](https://trello.com/b/vIW8awLl/cosmjs-roadmap).

## Development

See [HACKING.md](HACKING.md).
