import { Address, Amount, Identity, TokenTicker } from "@iov/bcp";

export interface SendJob {
  readonly sender: Identity;
  readonly recipient: Address;
  readonly tokenTicker: TokenTicker;
  readonly amount: Amount;
  readonly gasPrice?: Amount;
  readonly gasLimit?: Amount;
}
