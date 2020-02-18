# @cosmwasm/sdk

[![npm version](https://img.shields.io/npm/v/@cosmwasm/faucet.svg)](https://www.npmjs.com/package/@cosmwasm/faucet)

The faucet is built as part of the monorepo. In the repo root do:

```
yarn install
yarn build
```

Then start it for a Wasmd development blockchain using:

```
cd packages/faucet
yarn dev-start
```

Advanced users that want to provide their custom config can start as follows:

```
FAUCET_CREDIT_AMOUNT_COSM=10 \
  FAUCET_CREDIT_AMOUNT_STAKE=5 \
  FAUCET_CONCURRENCY=3 \
  FAUCET_MNEMONIC="economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone" \
  ./bin/cosmwasm-faucet start "http://localhost:1317"
```

## Usage

```
Usage: cosmwasm-faucet action [arguments...]

Positional arguments per action are listed below. Arguments in parentheses are optional.

help      Shows a help text and exits

version   Prints the version and exits

generate  Generates a random mnemonic, shows derived faucet addresses and exits
           1  Chain ID

start     Starts the faucet
           1  Node base URL, e.g. http://localhost:1317

Environment variables

FAUCET_CONCURRENCY        Number of distributor accounts. Defaults to 5.
FAUCET_PORT               Port of the webserver. Defaults to 8000.
FAUCET_MNEMONIC           Secret mnemonic that serves as the base secret for the
                          faucet HD accounts
FAUCET_CREDIT_AMOUNT_TKN  Send this amount of TKN to a user requesting TKN. TKN is
                          a placeholder for the token ticker. Defaults to 10.
FAUCET_REFILL_FACTOR      Send factor times credit amount on refilling. Defauls to 8.
FAUCET_REFILL_THRESHOLD   Refill when balance gets below factor times credit amount.
                          Defaults to 20.
```

### Faucet HD wallet

The faucet uses standard HD paths for each blockchain, e.g.

```
IOV        m/44'/234'/a'
Lisk       m/44'/134'/a'
CosmWasm   m/44'/118'/0'/0/a
```

where `a` is a 0-based index of the account. Account 0 is the token holder and
account 1...FAUCET_CONCURRENCY are the distributor accounts.

This means the token holder account can be accessed using the Neuma wallet when
the same mnemonic is used. Accessing the distributor accounts will be possible
as soon as there is
[multi account support](https://github.com/iov-one/ponferrada/milestone/3).

### Working with docker

**Note:** The Dockerfile in this repo is for demonstration purposes only. If you chose to
deploy the faucet via docker, make sure to copy the Dockerfile and keep it up-to-date.

- Build an artifact (from monorepo root)

```sh
cd docs
docker build -t local-cosmwasm-faucet:manual --file faucet.Dockerfile .
```

- Version and help

```sh
docker run --read-only --rm local-cosmwasm-faucet:manual version
docker run --read-only --rm local-cosmwasm-faucet:manual help
```

- Run faucet locally

```sh
DOCKER_HOST_IP=$(docker run --read-only --rm alpine ip route | awk 'NR==1 {print $3}'); \
  FAUCET_CONCURRENCY=3 FAUCET_MNEMONIC="economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone" \
  docker run --read-only --rm \
  -e FAUCET_MNEMONIC \
  -e FAUCET_CONCURRENCY \
  -p 8000:8000 \
  local-cosmwasm-faucet:manual \
  start "http://$DOCKER_HOST_IP:1317"
```

### Using the faucet

Now that the faucet has been started up, you can send credit requests to it.
This can be done with a simple http POST request. These commands assume the
faucet is running locally, be sure to change it from `localhost` if your
situation is different.

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"ticker":"ISA","address":"cosmos1yre6ac7qfgyfgvh58ph0rgw627rhw766y430qq"}' \
  http://localhost:8000/credit
```

### Checking the faucets status

The faucet provides a simple status check in the form of an http GET request. As
above, make sure to adjust the URL as necessary.

```
curl http://localhost:8000/status
```

## License

This package is part of the cosmwasm-js repository, licensed under the Apache
License 2.0 (see
[NOTICE](https://github.com/confio/cosmwasm-js/blob/master/NOTICE) and
[LICENSE](https://github.com/confio/cosmwasm-js/blob/master/LICENSE)).
