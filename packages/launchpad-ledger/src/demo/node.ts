import { toHex, toUtf8 } from "@cosmjs/encoding";
import { StdSignature } from "@cosmjs/launchpad";

import { LedgerSigner } from "../ledgersigner";

function createMessage(fromAddress: string, toAddress: string): string {
  return `{
    "account_number": 0,
    "chain_id": "testing",
    "fee": {
      "amount": [{ "amount": 100, "denom": "ucosm" }],
      "gas": 250
    },
    "memo": "Some memo",
    "msgs": [{
      "type": "cosmos-sdk/MsgSend",
      "value": {
        "amount": [{
          "amount": "1234567",
          "denom": "ucosm"
        }],
        "from_address": "${fromAddress}",
        "to_address": "${toAddress}"
      }
    }],
    "sequence": 0
  }`;
}

const signer = new LedgerSigner({ testModeAllowed: true });

export async function getAccounts(): Promise<
  ReadonlyArray<{
    readonly algo: string;
    readonly address: string;
    readonly pubkey: string;
  }>
> {
  const accounts = await signer.getAccounts();
  return accounts.map((account) => ({ ...account, pubkey: toHex(account.pubkey) }));
}

export async function sign(fromAddress: string, toAddress: string): Promise<StdSignature> {
  const rawMessage = createMessage(fromAddress, toAddress);
  const message = JSON.stringify(JSON.parse(rawMessage));
  return signer.sign(fromAddress, toUtf8(message));
}
