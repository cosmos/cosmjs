import { Bech32, toAscii, toHex } from "@cosmjs/encoding";
import { google } from "@cosmjs/proto-signing";
import { Client } from "@cosmjs/tendermint-rpc";

import { Coin } from "./structs";

// getByKey will use a raw (storename, key) pair to query state
// and verify the merkle proof against the header
// (when the client does light-client header verification, this will be fully proven)
async function getByKey(client: Client, store: string, key: Uint8Array): Promise<Uint8Array> {
  const resp = await client.abciQuery({
    // we need the StoreKey for the module, not the module name
    // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L12
    path: `/store/${store}/key`,
    data: key,
    prove: true,
  });

  if (resp.code) {
    throw new Error(`Query failed with (${resp.code}): ${resp.log}`);
  }
  // TODO: better way to compare?
  if (toHex(resp.key) !== toHex(key)) {
    throw new Error(`Response key ${toHex(resp.key)} doesn't match query key ${toHex(key)}`);
  }

  // TODO: implement proof verification

  return resp.value;
}

export async function getAccount(client: Client, address: string): Promise<google.protobuf.Any> {
  const binAddress = Bech32.decode(address).data;

  // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L29-L32
  const accountKey = Uint8Array.from([1, ...binAddress]);

  // getByKey will use a raw (storename, key) pair to query state
  // and verify the merkle proof against the header
  // (when the client does light-client header verification, this will be fully proven)
  const response = await getByKey(client, "acc", accountKey);

  // TODO: is there a better way to do the second-level unwrapping (decode the Any account type)?
  return google.protobuf.Any.decode(response);
}

export async function getBalance(client: Client, address: string, denom: string): Promise<Coin> {
  const binAddress = Bech32.decode(address).data;

  // balance key is a bit tricker, using some prefix stores
  // https://github.com/cosmwasm/cosmos-sdk/blob/80f7ff62f79777a487d0c7a53c64b0f7e43c47b9/x/bank/keeper/view.go#L74-L77
  // ("balances", binAddress, denom)
  // it seem like prefix stores just do a dumb concat with the keys (no tricks to avoid overlap)
  // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L61-L64
  // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L37-L43
  const bankKey = Uint8Array.from([...toAscii("balances"), ...binAddress, ...toAscii(denom)]);

  // getByKey will use a raw (storename, key) pair to query state
  // and verify the merkle proof against the header
  // (when the client does light-client header verification, this will be fully proven)
  const response = await getByKey(client, "bank", bankKey);
  return Coin.decode(response);
}
