/* eslint-disable @typescript-eslint/naming-convention */
import { Pubkey } from "@cosmjs/amino";

import { Coin } from "./coins";

export interface StdFee {
  readonly amount: readonly Coin[];
  readonly gas: string;
}

export interface StdSignature {
  readonly pub_key: Pubkey;
  readonly signature: string;
}
