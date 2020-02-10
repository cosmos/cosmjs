import { CosmWasmCodec } from "@cosmwasm/bcp";
import { Address, Identity, TxCodec } from "@iov/bcp";

import * as constants from "./constants";

const noTokensCodec: Pick<TxCodec, "identityToAddress" | "isValidAddress"> = new CosmWasmCodec(
  constants.addressPrefix,
  [],
);

export function identityToAddress(identity: Identity): Address {
  return noTokensCodec.identityToAddress(identity);
}

export function isValidAddress(input: string): boolean {
  return noTokensCodec.isValidAddress(input);
}
