import { toBase64 } from "@cosmjs/encoding";
import { AccountData, makeCosmoshubPath, StdSignDoc } from "@cosmjs/launchpad";
import { Uint53 } from "@cosmjs/math";
import { assert } from "@cosmjs/utils";

import { LedgerSigner } from "../ledgersigner";

declare const window: any;
declare const document: any;

let accounts: readonly AccountData[] = [];

function createSignDoc(accountNumber: number, address: string): string {
  const signDoc: StdSignDoc = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    chain_id: "testing",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    account_number: `${accountNumber}`,
    sequence: "0",
    fee: {
      amount: [{ amount: "100", denom: "ucosm" }],
      gas: "250",
    },
    memo: "Some memo",
    msgs: [
      {
        type: "cosmos-sdk/MsgSend",
        value: {
          amount: [
            {
              amount: "1234567",
              denom: "ucosm",
            },
          ],
          // eslint-disable-next-line @typescript-eslint/naming-convention
          from_address: address,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          to_address: address,
        },
      },
    ],
  };
  return JSON.stringify(signDoc, null, 2);
}

const signer = new LedgerSigner({
  testModeAllowed: true,
  hdPaths: [makeCosmoshubPath(0), makeCosmoshubPath(1), makeCosmoshubPath(2)],
});

window.updateMessage = (accountNumberInput: unknown) => {
  assert(typeof accountNumberInput === "string");
  const accountNumber = Uint53.fromString(accountNumberInput).toNumber();
  const account = accounts[accountNumber];
  if (account === undefined) {
    return;
  }

  const address = accounts[accountNumber].address;
  const addressInput = document.getElementById("address");
  addressInput.value = address;
  const signDocTextArea = document.getElementById("sign-doc");
  signDocTextArea.textContent = createSignDoc(accountNumber, address);
};

window.getAccounts = async function getAccounts(): Promise<void> {
  const accountNumberInput = document.getElementById("account-number");
  const addressInput = document.getElementById("address");
  const accountsDiv = document.getElementById("accounts");
  const signDocTextArea = document.getElementById("sign-doc");
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
    signDocTextArea.textContent = createSignDoc(accountNumber, address);
  } catch (error) {
    accountsDiv.textContent = error;
  }
};

window.sign = async function sign(): Promise<void> {
  const signatureDiv = document.getElementById("signature");
  signatureDiv.textContent = "Loading...";

  try {
    const address = document.getElementById("address").value;
    const signDocJson = document.getElementById("sign-doc").textContent;
    const signDoc: StdSignDoc = JSON.parse(signDocJson);
    const signature = await signer.sign(address, signDoc);
    signatureDiv.textContent = JSON.stringify(signature, null, "\t");
  } catch (error) {
    signatureDiv.textContent = error;
  }
};
