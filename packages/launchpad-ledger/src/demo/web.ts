import { toBase64, toUtf8 } from "@cosmjs/encoding";
import { AccountData, makeCosmoshubPath } from "@cosmjs/launchpad";

import { LedgerSigner } from "../ledgersigner";

declare const window: any;
declare const document: any;

let accounts: readonly AccountData[] = [];

function createMessage(accountNumber: number, address: string): string {
  return `{
    "account_number": ${accountNumber},
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

const signer = new LedgerSigner({
  testModeAllowed: true,
  hdPaths: [makeCosmoshubPath(0), makeCosmoshubPath(1), makeCosmoshubPath(2)],
});

window.updateMessage = (accountNumber: number) => {
  const account = accounts[accountNumber];
  if (account === undefined) {
    return;
  }

  const address = accounts[accountNumber].address;
  const addressInput = document.getElementById("address");
  addressInput.value = address;
  const messageTextArea = document.getElementById("message");
  messageTextArea.textContent = createMessage(accountNumber, address);
};

window.getAccounts = async function getAccounts(): Promise<void> {
  const accountNumberInput = document.getElementById("account-number");
  const addressInput = document.getElementById("address");
  const accountsDiv = document.getElementById("accounts");
  const messageTextArea = document.getElementById("message");
  accountsDiv.textContent = "Loading...";

  try {
    accounts = await signer.getAccounts();
    const prettyAccounts = accounts.map((account: AccountData) => ({
      ...account,
      pubkey: toBase64(account.pubkey),
    }));
    accountsDiv.textContent = JSON.stringify(prettyAccounts, null, "\n");
    const accountNumber = 0;
    accountNumberInput.max = accounts.length - 1;
    accountNumberInput.value = accountNumber;
    const address = accounts[0].address;
    addressInput.value = address;
    messageTextArea.textContent = createMessage(accountNumber, address);
  } catch (error) {
    accountsDiv.textContent = error;
  }
};

window.sign = async function sign(): Promise<void> {
  const signatureDiv = document.getElementById("signature");
  signatureDiv.textContent = "Loading...";

  try {
    const accountNumber = document.getElementById("account-number").value;
    const address = document.getElementById("address").value;
    const rawMessage = document.getElementById("message").textContent;
    const message = JSON.stringify(JSON.parse(rawMessage));
    const signature = await signer.sign(address, toUtf8(message), undefined, parseInt(accountNumber, 10));
    signatureDiv.textContent = JSON.stringify(signature, null, "\t");
  } catch (error) {
    signatureDiv.textContent = error;
  }
};
