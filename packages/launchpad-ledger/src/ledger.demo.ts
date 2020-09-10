import { toHex, toUtf8 } from "@cosmjs/encoding";

import { LedgerWallet } from "./ledgerwallet";

declare const window: any;
declare const document: any;

const ledgerWallet = new LedgerWallet({ testModeAllowed: true });

window.getAccounts = async function getAccounts(): Promise<void> {
  const addressInput = document.getElementById("address");
  const accountsDiv = document.getElementById("accounts");
  accountsDiv.textContent = "Loading...";

  try {
    const accounts = await ledgerWallet.getAccounts();
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
    const signature = await ledgerWallet.sign(address, toUtf8(message));
    signatureDiv.textContent = JSON.stringify(signature, null, "\t");
  } catch (error) {
    signatureDiv.textContent = error;
  }
};
