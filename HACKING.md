# Hacking CosmJS

Welcome to CosmJS, glad to see you here. This document explains all you need to
work on CosmJS, i.e. modify it. It is not intended for users of CosmJS.

## Prerequisite

- A UNIX-like development environment
- Node.js 12+, Docker and yarn
- `sha256sum`, which you
  [can get on macOS as well](https://unix.stackexchange.com/questions/426837/no-sha256sum-in-macos)
- `gsed`, which you
  [can get on macOS as well](https://formulae.brew.sh/formula/gnu-sed)

## Checking out code

We use Git for version control. In addition to the well-known basics, we use the
extension Git Large File Storage (LFS) to store blobs (currently \*.png and
\*.wasm). A git-lfs package is available directly in modern package repositories
(Debian 10+, Ubuntu 18.04+, Homebrew, MacPorts) and as a backport for older
systems. Please see [this website](https://git-lfs.github.com/) for instructions
how to install it.

If you installed git-lfs after cloning this repo, use this command to replace
the links with the original files: `git lfs fetch && git lfs checkout`.

To verify everything worked as expected, check if the testing contracts are
correctly checked out:

```sh
cd scripts/launchpad/contracts
sha256sum -c checksums.sha256
```

## Installation

1. Install dependencies: `yarn install`
2. Install SDKs (to make IDE integration work): `yarn dlx @yarnpkg/sdks`

## Running tests

For unit tests that don't connect to any blockchain, just do:

```sh
yarn test
```

To run the entire test suite, you need to run some local blockchain to test
against. We use [wasmd](https://github.com/CosmWasm/wasmd) for both CosmWasm
tests and as a generic Cosmos SDK 0.39 (Launchpad) blockchain. We also spawn
multiple versions of raw Tendermint and a basic WebSocket server.

```sh
# Start wasmd
./scripts/launchpad/start.sh
./scripts/launchpad/init.sh
export LAUNCHPAD_ENABLED=1
export ERC20_ENABLED=1

# Start Tendermint
./scripts/tendermint/all_start.sh
export TENDERMINT_ENABLED=1

# Start WebSocket server
./scripts/socketserver/start.sh
export SOCKETSERVER_ENABLED=1

# now more tests are running that were marked as "pending" before
yarn test

# And at the end of the day
unset SOCKETSERVER_ENABLED
unset TENDERMINT_ENABLED
unset ERC20_ENABLED
unset LAUNCHPAD_ENABLED
./scripts/socketserver/stop.sh
./scripts/tendermint/all_stop.sh
./scripts/launchpad/stop.sh
```

## Sanity

After you modified a file, check if the linter is happy:

```sh
yarn lint

# or if you want linting plus automatic fixing
yarn lint-fix
```

## Ports

In the `scripts/` folder, a bunch of blockchains and other backend systems are
started for testing purposes. Some ports need to be changed from the default in
order to avoid conflicts. Here is an overview of the ports used:

| Port  | Application           | Usage                           |
| ----- | --------------------- | ------------------------------- |
| 1317  | wasmd LCD API         | @cosmjs/launchpad tests         |
| 1318  | simapp LCD API        | Manual Stargate debugging       |
| 1319  | wasmd LCD API         | Manual Stargate debugging       |
| 4444  | socketserver          | @cosmjs/sockets tests           |
| 4445  | socketserver slow     | @cosmjs/sockets tests           |
| 11133 | Tendermint 0.33 RPC   | @cosmjs/tendermint-rpc tests    |
| 11134 | Tendermint 0.34 RPC   | @cosmjs/tendermint-rpc tests    |
| 26658 | simapp Tendermint RPC | Stargate client tests           |
| 26659 | wasmd Tendermint RPC  | @cosmjs/cosmwasm-stargate tests |
