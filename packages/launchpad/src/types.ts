/* eslint-disable @typescript-eslint/naming-convention */
import { PubKey } from "@cosmjs/amino";

import { Coin } from "./coins";

export interface StdFee {
  readonly amount: readonly Coin[];
  readonly gas: string;
}

export interface StdSignature {
  readonly pub_key: PubKey;
  readonly signature: string;
}
