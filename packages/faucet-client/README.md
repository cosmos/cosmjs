# @cosmjs/faucet-client

[![npm version](https://img.shields.io/npm/v/@cosmjs/faucet-client.svg)](https://www.npmjs.com/package/@cosmjs/faucet-client)

## Running the tests

First of all you will need an instance of wasmd running. From the root directory
of this repository:

```sh
./scripts/wasmd/start.sh && ./scripts/wasmd/init.sh
```

You will also need a faucet. From the root directory of this repository:

```sh
cd packages/faucet
yarn start-dev
```

The tests need to be told you are running the faucet via an environmental
variable:

```sh
export FAUCET_ENABLED=1
```

Finally run the tests from this directory:

```sh
yarn test
```

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/cosmos/cosmjs/blob/main/NOTICE) and
[LICENSE](https://github.com/cosmos/cosmjs/blob/main/LICENSE)).
