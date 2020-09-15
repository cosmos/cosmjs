import { toHex, toUtf8 } from "@cosmjs/encoding";

import { LedgerSigner } from "../ledgersigner";

declare const window: any;
declare const document: any;

function createMessage(address: string): string {
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
        "from_address": "${address}",
        "to_address": "${address}"
      }
    }],
    "sequence": 0
  }`;
}

const signer = new LedgerSigner({ testModeAllowed: true });

window.getAccounts = async function getAccounts(): Promise<void> {
  const addressInput = document.getElementById("address");
  const accountsDiv = document.getElementById("accounts");
  const messageTextArea = document.getElementById("message");
  accountsDiv.textContent = "Loading...";

  try {
    const accounts = await signer.getAccounts();
    const prettyAccounts = accounts.map((account) => ({ ...account, pubkey: toHex(account.pubkey) }));
    accountsDiv.textContent = JSON.stringify(prettyAccounts, null, "\t");
    const address = accounts[0].address;
    addressInput.value = address;
    messageTextArea.textContent = createMessage(address);
  } catch (error) {
    accountsDiv.textContent = error;
  }
};

window.sign = async function sign(): Promise<void> {
  const signatureDiv = document.getElementById("signature");
  signatureDiv.textContent = "Loading...";

  try {
    const address = document.getElementById("address").value;
    const rawMessage = document.getElementById("message").textContent;
    const message = JSON.stringify(JSON.parse(rawMessage));
    const signature = await signer.sign(address, toUtf8(message));
    signatureDiv.textContent = JSON.stringify(signature, null, "\t");
  } catch (error) {
    signatureDiv.textContent = error;
  }
};
