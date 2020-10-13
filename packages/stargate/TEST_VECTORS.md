# How to generate test vectors

You need to compile a version of `simd` locally and sign some transactions.
It seems my printfs got committed into master somehow, so we have debug info without forking!

The following was tested on `v0.40.0-rc0` of [`cosmos-sdk`](https://github.com/cosmos/cosmos-sdk).

## Setup

```
git clone https://github.com/cosmos/cosmos-sdk.git
cd cosmos-sdk
git checkout v0.40.0-rc0

make build-simd-linux
# this takes a while to download a docker image and make a deterministic build....

ls -l ./build/simd
./build/simd version
# I got `goz-phase-1-704-g153249205` for `v0.40.0-rc0`, which is commit `153249205`
```

## Prepare the Keys

You want to ensure you use the same keys as in the test vector,
[taken from here](https://github.com/CosmWasm/cosmjs/blob/db1f183/packages/proto-signing/src/signing.spec.ts#L19-L27).
This uses the testgen mnemonic:

`economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone`

```
simd keys add testgen -i
# enter mnemonic, and no passphrase

simd keys show -a testgen
# cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6

simd keys show testgen
# this shows bech32 encoded pubkey!! (I think they need to fix that)
```

## Create the transactions

First we create the unsigned transaction template we will be signing. We want to use the same flags as
the testvectors create manually.

```
simd tx bank send --generate-only --chain-id simd-testing --fees 2000ucosm $(simd keys show -a testgen) cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu 1234567ucosm > unsigned_tx.json
```

This is what I get from `jq . unsigned_tx.json`, which is slightly different that the current test vector, in that
I added a non-empty fee amount to properly test that:

```json
{
  "body": {
    "messages": [
      {
        "@type": "/cosmos.bank.MsgSend",
        "from_address": "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        "to_address": "cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu",
        "amount": [
          {
            "denom": "ucosm",
            "amount": "1234567"
          }
        ]
      }
    ]
  },
  "auth_info": {
    "fee": {
      "amount": [
        {
          "denom": "ucosm",
          "amount": "2000"
        }
      ],
      "gas_limit": "200000"
    }
  }
}
```

## Generating Signatures

All current test vectors were signed from account number 1, with increasing signatures (0, 1, 2).
You can produce these with the following commands:

```
# you may not need `--home /tmp` but I got an odd error without it
simd tx sign --home /tmp --offline --sign-mode direct -a 1 -s 0 --from testgen --chain-id simd-testing unsigned_tx.json

simd tx sign --home /tmp --offline --sign-mode direct -a 1 -s 1 --from testgen --chain-id simd-testing unsigned_tx.json
```

You will get some output that looks more or less like this:

```
handler: signing.SignModeHandlerMap{defaultMode:1, modes:[]signing.SignMode{1, 127}, signModeHandlers:map[signing.SignMode]signing.SignModeHandler{1:tx.signModeDirectHandler{}, 127:tx.signModeLegacyAminoJSONHandler{}}}
mode: SIGN_MODE_DIRECT
SignDoc: {"body_bytes":"ClYKFC9jb3Ntb3MuYmFuay5Nc2dTZW5kEj4KFA2CsefJbb+kJGL+YSky5r/xEdUbEhQBAgMEBQYHCAkKCwwNDg8QERITFBoQCgV1Y29zbRIHMTIzNDU2Nw==","auth_info_bytes":"CisKIwohA08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQEgQKAggBEhMKDQoFdWNvc20SBDIwMDAQwJoM","chain_id":"simd-testing","account_number":1,"account_sequence":1}
SignBytes: 0a580a560a142f636f736d6f732e62616e6b2e4d736753656e64123e0a140d82b1e7c96dbfa42462fe612932e6bff111d51b12140102030405060708090a0b0c0d0e0f10111213141a100a0575636f736d12073132333435363712420a2b0a230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a02080112130a0d0a0575636f736d12043230303010c09a0c1a0c73696d642d74657374696e6720012801
Sign Bytes: 0a580a560a142f636f736d6f732e62616e6b2e4d736753656e64123e0a140d82b1e7c96dbfa42462fe612932e6bff111d51b12140102030405060708090a0b0c0d0e0f10111213141a100a0575636f736d12073132333435363712420a2b0a230a21034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c7029012040a02080112130a0d0a0575636f736d12043230303010c09a0c1a0c73696d642d74657374696e6720012801
Signature: fe0a2133ba1de9398cec30839fa1e06184914d739a1271be12f1b6c6da1933601095404f6190a216998e7d20041b63edd0f8cf9b43b0b2a4e2288777c46043ca
{"body":{"messages":[{"@type":"/cosmos.bank.MsgSend","from_address":"cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6","to_address":"cosmos1qypqxpq9qcrsszg2pvxq6rs0zqg3yyc5lzv7xu","amount":[{"denom":"ucosm","amount":"1234567"}]}]},"auth_info":{"signer_infos":[{"public_key":{"secp256k1":"A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ"},"mode_info":{"single":{"mode":"SIGN_MODE_DIRECT"}}}],"fee":{"amount":[{"denom":"ucosm","amount":"2000"}],"gas_limit":"200000"}},"signatures":["/gohM7od6TmM7DCDn6HgYYSRTXOaEnG+EvG2xtoZM2AQlUBPYZCiFpmOfSAEG2Pt0PjPm0OwsqTiKId3xGBDyg=="]}
```
