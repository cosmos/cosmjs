import { toHex, toUtf8 } from "@cosmjs/encoding";

import { LedgerSigner } from "../ledgersigner";

declare const window: any;
declare const document: any;

const signer = new LedgerSigner({ testModeAllowed: true });

window.getAccounts = async function getAccounts(): Promise<void> {
  const addressInput = document.getElementById("address");
  const accountsDiv = document.getElementById("accounts");
  accountsDiv.textContent = "Loading...";

  try {
    const accounts = await signer.getAccounts();
    const prettyAccounts = accounts.map((account) => ({ ...account, pubkey: toHex(account.pubkey) }));
    accountsDiv.textContent = JSON.stringify(prettyAccounts, null, "\t");
    addressInput.value = accounts[0].address;
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
