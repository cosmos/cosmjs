<h1><p align="center"><img alt="CosmJS" src="docs/logo-vertical-light.png" width="180" /></p></h1>

<div align="center">
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
you want to look up details for advanced use cases. This documentation is
auto-generated based on the current main branch and can occasionally diverge
from the latest release.

[cosmos.github.io/cosmjs]: https://cosmos.github.io/cosmjs

### Using custom Stargate modules

Documentation on how to use your own custom modules with CosmJS for Stargate
chains (Cosmos SDK v0.41) can be found
[here](https://github.com/cosmos/cosmjs/blob/main/packages/stargate/CUSTOM_PROTOBUF_CODECS.md).

## Packages

CosmJS is a library that consists of many smaller npm packages within the
[@cosmjs namespace](https://www.npmjs.com/org/cosmjs), a so-called monorepo.
Here are some of them to get an idea:

| Package                                                 | Description                                                                                                                                                                                                                              | Latest                                                                                                                                |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [@cosmjs/stargate](packages/stargate)                   | A client library for the Cosmos SDK 0.40+ (Stargate)                                                                                                                                                                                     | [![npm version](https://img.shields.io/npm/v/@cosmjs/stargate.svg)](https://www.npmjs.com/package/@cosmjs/stargate)                   |
| [@cosmjs/faucet](packages/faucet)                       | A faucet application for node.js                                                                                                                                                                                                         | [![npm version](https://img.shields.io/npm/v/@cosmjs/faucet.svg)](https://www.npmjs.com/package/@cosmjs/faucet)                       |
| [@cosmjs/cosmwasm-stargate](packages/cosmwasm-stargate) | Client for Stargate chains with the CosmWasm module enabled                                                                                                                                                                              | [![npm version](https://img.shields.io/npm/v/@cosmjs/cosmwasm-stargate.svg)](https://www.npmjs.com/package/@cosmjs/cosmwasm-stargate) |
| [@cosmjs/crypto](packages/crypto)                       | Cryptography for blockchain projects, e.g. hashing (SHA-2, Keccak256, Ripemd160), signing (secp256k1, ed25519), HD key derivation (BIP-39, SLIP-0010), KDFs and symmetric encryption for key storage (PBKDF2, Argon2, XChaCha20Poly1305) | [![npm version](https://img.shields.io/npm/v/@cosmjs/crypto.svg)](https://www.npmjs.com/package/@cosmjs/crypto)                       |
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

1. Node.js 18+
2. Modern browsers (Chromium/Firefox/Safari, no Internet Explorer or
   [Edge Spartan](https://en.wikipedia.org/wiki/Microsoft_Edge#Development))
3. Browser extensions (Chromium/Firefox)

Our current JavaScript target standard is ES2020. We use WebAssembly to
implement certain cryptographic functions.

We're happy to adjust this list according to users' needs as long as you don't
ask for Internet Explorer support. If your environment does not support Wasm, we
can work on a solution with swappable implementations.

## Webpack Configs

With WebPack 5, you have to be explicit about the usage of Node.js types and
modules that were simply replaced with re-implementations for browsers in
Webpack 4.

Configs for 0.28 and later:

```js
module.exports = [
  {
    // ...
    plugins: [
      ...,
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    // ...
    resolve: {
      fallback: {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: false,
        string_decoder: false,
      },
    },
  },
];
```

Configs for CosmJS < 0.28

```js
module.exports = [
  {
    // ...
    plugins: [
      ...,
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    // ...
    resolve: {
      fallback: {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: require.resolve("stream-browserify"),
        string_decoder: false,
      },
    },
  },
];
```

## Roadmap

There is no roadmap anymore. Just keeping things alive, nice and clean.

## Known limitations

### 0.26

1. When connecting to a Cosmos SDK 0.44+ backend, the verified queries from
   `AuthExtension` and `BankExtension` as well as
   `StargateClient.getAccountVerified` will fail because the storage keys are
   not stable. Unverified queries can be used instead. Those queries are
   deprecated now and will be removed in 0.27 ([#910]).

[#910]: https://github.com/cosmos/cosmjs/pull/910

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
- The `#dev-chat` channel, or `#dev-support-ai` on the
  [interchain Discord server](https://discord.gg/interchain) for questions and
  open discussions
- [#CosmJS on Twitter](https://twitter.com/search?q=%23CosmJS) to spread the
  word

## Development

See [HACKING.md](HACKING.md).
