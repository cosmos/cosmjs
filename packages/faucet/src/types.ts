import { Address, Amount, Identity } from "@iov/bcp";

export interface SendJob {
  readonly sender: Identity;
  readonly recipient: Address;
  readonly amount: Amount;
}
