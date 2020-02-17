# CosmWasm JS

This is a JavaScript/TypeScript client-side binding to [wasmd](https://github.com/cosmwasm/wasmd), a sample blockchain for the [cosmwasm](https://github.com/confio/cosmwasm) smart contracting platform.

## Development

Requires Node 10+. For best results, use yarn. The basic commands are:

```sh
# compile the code
yarn build
# run unit tests
yarn test

# format and lint the code
yarn format && yarn lint
```

### Integration tests

To run the entire test suite, you need to run a local blockchain to test against. This should work on any Linux/OSX system with docker installed.

```sh
./scripts/wasmd/start.sh
./scripts/wasmd/init.sh
WASMD_ENABLED=1 yarn test
./scripts/wasmd/stop.sh
```
