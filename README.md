<h1><p align="center"><img alt="CosmJS" src="docs/logo-vertical-light.png" width="180" /></p></h1>

<div align="center">
  <a href="https://lgtm.com/projects/g/cosmos/cosmjs/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/cosmos/cosmjs.svg?logo=lgtm&logoWidth=18"/></a>
  <a href="https://github.com/cosmos/cosmjs/blob/main/LICENSE">
    <img alt="License: Apache-2.0" src="https://img.shields.io/github/license/cosmos/cosmjs.svg" />
  </a>
</div>

CosmJS is the Swiss Army knife to power JavaScript based client solutions
ranging from Web apps/explorers over browser extensions to server-side clients
like faucets/scrapers in the Cosmos ecosystem.

"Cosm" is short for Cosmos and "JS" is short for _runs everywhere_ – we actually
develop in TypeScript.

## Documentation

[Here is a list of examples][guided tour] using the Stargate package for use
with [Cosmos SDK 0.41] applications (like [gaia 4]). Take a look at the wiki
page,
["What can CosmJS do for me?"](https://github.com/cosmos/cosmjs/wiki/What-can-CosmJS-do-for-me%3F)
and various tests
([ex](https://github.com/cosmos/cosmjs/blob/main/packages/stargate/src/signingstargateclient.spec.ts))
for more example usage of the packages.

[guided tour]:
  https://gist.github.com/webmaster128/8444d42a7eceeda2544c8a59fbd7e1d9
[cosmos sdk 0.41]: https://github.com/cosmos/cosmos-sdk/tree/v0.41.0
[gaia 4]: https://github.com/cosmos/gaia/tree/v4.0.0

### API documentation

The full API documentation is hosted at [cosmos.github.io/cosmjs]. This is a bit
tricky to navigate and requires basic TypeScript understanding. It is helpful if
you have want to look up details for advanced use cases. This documentation is
auto-generated based on the current main branch and can occasionally diverge
from the latest release.

[cosmos.github.io/cosmjs]: https://cosmos.github.io/cosmjs

### Using custom Stargate modules

Documentation on how to use your own custom modules with CosmJS for Stargate
chains (Cosmos SDK v0.41) can be found
[here](https://github.com/cosmos/cosmjs/blob/main/packages/stargate/CUSTOM_PROTOBUF_CODECS.md).

## Packages

CosmJS is a library that consists of many smaller npm packages within the
[@cosmjs namespace](https://www.npmjs.com/org/cosmjs), a so called monorepo.
Here are some of them to get an idea:

| Package                                                 | Description                                                                                                                                                                                                                              | Latest                                                                                                                                |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [@cosmjs/stargate](packages/stargate)                 | A client library for the Cosmos SDK 0.40 (cosmoshub-4), 0.41 and 0.42 (Stargate)                                                                                                                                                        | [![npm version](https://img.shields.io/npm/v/@cosmjs/stargate.svg)](https://www.npmjs.com/package/@cosmjs/stargate)                 |
| [@cosmjs/launchpad](packages/launchpad)                 | A client library for the Cosmos SDK 0.37 (cosmoshub-3), 0.38 and 0.39 (Launchpad)                                                                                                                                                        | [![npm version](https://img.shields.io/npm/v/@cosmjs/launchpad.svg)](https://www.npmjs.com/package/@cosmjs/launchpad)                 |
| [@cosmjs/faucet](packages/faucet)                       | A faucet application for node.js                                                                                                                                                                                                         | [![npm version](https://img.shields.io/npm/v/@cosmjs/faucet.svg)](https://www.npmjs.com/package/@cosmjs/faucet)                       |
| [@cosmjs/cosmwasm-stargate](packages/cosmwasm-stargate) | Client for Stargate chains with the CosmWasm module enabled                                                                                                                                                                              | [![npm version](https://img.shields.io/npm/v/@cosmjs/cosmwasm-stargate.svg)](https://www.npmjs.com/package/@cosmjs/cosmwasm-stargate) |
| [@cosmjs/crypto](packages/crypto)                       | Cryptography for blockchain projects, e.g. hashing (SHA-2, Keccak256, Ripemd160), signing (secp256k1, ed25519), HD key derivation (BIPO39, SLIP-0010), KDFs and symmetric encryption for key storage (PBKDF2, Argon2, XChaCha20Poly1305) | [![npm version](https://img.shields.io/npm/v/@cosmjs/crypto.svg)](https://www.npmjs.com/package/@cosmjs/crypto)                       |
| [@cosmjs/encoding](packages/encoding)                   | Encoding helpers for blockchain projects                                                                                                                                                                                                 | [![npm version](https://img.shields.io/npm/v/@cosmjs/encoding.svg)](https://www.npmjs.com/package/@cosmjs/encoding)                   |
| [@cosmjs/math](packages/math)                           | Safe integers; decimals for handling financial amounts                                                                                                                                                                                   | [![npm version](https://img.shields.io/npm/v/@cosmjs/math.svg)](https://www.npmjs.com/package/@cosmjs/math)                           |

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

1. Node.js 12+
2. Modern browsers (Chromium/Firefox/Safari, no Internet Explorer or
   [Edge Spartan](https://en.wikipedia.org/wiki/Microsoft_Edge#Development))
3. Browser extensions (Chromium/Firefox)

Our current JavaScript target standard is ES2017, giving us native async/await
support. We use WebAssembly to implement certain cryptographic functions.

We're happy to adjust this list according to users' needs as long as you don't
ask for Internet Explorer support. If your environment does not support Wasm, we
can work on a solution with swapable implementations.

## Roadmap

We maintain a [development board](https://github.com/orgs/cosmos/projects/6),
use [release milestones](https://github.com/cosmos/cosmjs/milestones) and share
important updates in the [CosmWasm Community Call]. For higher level roadmap
discussion please reach out to the team.

[cosmwasm community call]:
  https://github.com/CosmWasm/cosmwasm/issues?q=label%3A%22Community+Call+%F0%9F%97%BA%F0%9F%93%9E%22

## Known limitations

### 0.25

1. Decoding blocks of height 1 is unsupported. This is fixed in [#815] and will
   be released as part of CosmJS 0.26.

[#815]: https://github.com/cosmos/cosmjs/pull/815

### 0.24

1. `AuthExtension` and all higher level Stargate clients only support
   `BaseAccount`s for all functionality, including getting account numbers and
   sequences for transaction signing. This will be implemented for all common
   Cosmos SDK account types in the 0.25 series.

## Get in touch

The CosmJS development team is happy to get in touch with you for all questions
and suggestions.

- [GitHub issues](https://github.com/cosmos/cosmjs/issues) for bugs and feature
  requests
- The #cosmjs channel on the
  ["Cosmos Community" Discord server](https://discord.gg/vcExX9T) for questions
  and open discussions
- [#CosmJS on Twitter](https://twitter.com/search?q=%23CosmJS) to spread the
  word

## Development

See [HACKING.md](HACKING.md).
