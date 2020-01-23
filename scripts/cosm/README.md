# Local Cosmos test network

## Starting the blockchain

Run the following:

```
./start.sh
```

## CLI

Docker-friendly access to `wasmcli` is provided. Just use the `./cli.sh` script.
For example:

```
./cli.sh status
```

This should give you output similar to the following if your blockchain is
running:

```json
{
  "node_info": {
    "protocol_version": { "p2p": "7", "block": "10", "app": "0" },
    "id": "223aedddd9442bcf16641858ca85837f27997d0d",
    "listen_addr": "tcp://0.0.0.0:26656",
    "network": "testing",
    "version": "0.32.2",
    "channels": "4020212223303800",
    "moniker": "testing",
    "other": { "tx_index": "on", "rpc_address": "tcp://127.0.0.1:26657" }
  },
  "sync_info": {
    "latest_block_hash": "3E3BEBCFA4E47BC67C7DE44DD4E83D8D42235DE75DA942A6BECD1F0F5A6246E4",
    "latest_app_hash": "73A3641BDEFBB728B1B48FB87B510F3E76E3B4519BC4954C6E1060738FCE8B14",
    "latest_block_height": "1217",
    "latest_block_time": "2019-09-26T15:44:13.0111312Z",
    "catching_up": false
  },
  "validator_info": {
    "address": "3A7EBE1A9E333146AE5D9FCB765B88BDD4D2859A",
    "pub_key": {
      "type": "tendermint/PubKeyEd25519",
      "value": "3ZYx1HKwT/llXzYC2yVeWEiWHd6uBQ7Bi7jiDFczx28="
    },
    "voting_power": "100"
  }
}
```

## Adding the validator key to your keybase

The Cosmos test network is initialised with a validator (see
`.gaiad/config/genesis.json`). This validator has the following mnemonic:

```
economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone
```

To add the validator key to your local keybase run the following, choose an
encryption passphrase (e.g. `testing123`) and enter the above mnemonic when
prompted:

```
./cli.sh keys add validator --recover
```

You should get output matching the following:

```
- name: validator
  type: local
  address: cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6
  pubkey: cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5
  mnemonic: ""
  threshold: 0
  pubkeys: []
```
