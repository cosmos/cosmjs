# Hacking CosmJS

Welcome to CosmJS, glad to see you here. This document explains all you need to
work on CosmJS, i.e. modify it. It is not intended for users of CosmJS.

## Prerequisite

- A UNIX-like development environment
- Node.js 10+, Docker and yarn
- `sha256sum`, which you
  [can get on macOS as well](https://unix.stackexchange.com/questions/426837/no-sha256sum-in-macos)

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
cd scripts/wasmd/contracts
sha256sum -c checksums.sha256
```

## Running tests

For unit tests that don't connect to any blockchain, just do:

```sh
yarn install
yarn test
```

To run the entire test suite, you need to run some local blockchain to test
against. We use [wasmd](https://github.com/CosmWasm/wasmd) for both CosmWasm
tests and as a generic Cosmos SDK 0.38 blockchain. We also spawn multiple
versions of raw Tendermint and a basic WebSocket server.

```sh
# Start wasmd
./scripts/wasmd/start.sh
./scripts/wasmd/init.sh
export WASMD_ENABLED=1

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
unset WASMD_ENABLED
./scripts/socketserver/stop.sh
./scripts/tendermint/all_stop.sh
./scripts/wasmd/stop.sh
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

| Port  | Application           | Usage                                                                                 |
| ----- | --------------------- | ------------------------------------------------------------------------------------- |
| 1317  | wasmd LCD API         | @cosmjs/launchpad and @cosmjs/cosmwasm tests                                          |
| 1318  | simapp API            | Manual Stargate debugging                                                             |
| 4444  | sockertserver         | @cosmjs/sockets tests                                                                 |
| 4445  | sockertserver slow    | @cosmjs/sockets tests                                                                 |
| 11133 | Tendermint 0.33 RPC   | @cosmjs/tendermint-rpc tests                                                          |
| 11134 | Tendermint 0.34 RPC   | @cosmjs/tendermint-rpc tests ([soon™](https://github.com/CosmWasm/cosmjs/issues/344)) |
| 26657 | simapp Tendermint RPC | Stargate client tests                                                                 |
