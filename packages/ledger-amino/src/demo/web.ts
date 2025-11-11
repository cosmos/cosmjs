import { AccountData, makeCosmoshubPath, StdSignDoc } from "@cosmjs/amino";
import { pathToString, stringToPath } from "@cosmjs/crypto";
import { toBase64 } from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";
import { assert } from "@cosmjs/utils";
// eslint-disable-next-line @typescript-eslint/naming-convention
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";

import { LedgerSigner } from "../ledgersigner";

declare const window: any;

const getElement = (id: string): HTMLInputElement => {
  const e = document.getElementById(id);
  assert(e instanceof HTMLInputElement, "got the wrong element!");
  return e;
};

const accountNumbers = [0, 1, 2, 10];
const paths = accountNumbers.map(makeCosmoshubPath);

let accounts: readonly AccountData[] = [];

function createSignDoc(accountNumber: number, address: string): string {
  const signDoc: StdSignDoc = {
    chain_id: "testing",
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
          from_address: address,
          to_address: address,
        },
      },
    ],
  };
  return JSON.stringify(signDoc, null, 2);
}

window.updateMessage = (accountNumberInput: unknown) => {
  assert(typeof accountNumberInput === "string");
  const accountNumber = Uint53.fromString(accountNumberInput).toNumber();
  const account = accounts[accountNumber];
  if (account === undefined) {
    return;
  }

  const address = accounts[accountNumber].address;
  const addressInput = getElement("address");
  addressInput.value = address;
  const signDocTextArea = getElement("sign-doc");
  signDocTextArea.textContent = createSignDoc(accountNumber, address);
};

const setPath = (accountNumberInput: unknown): void => {
  assert(typeof accountNumberInput === "string");
  const accountNumber = Uint53.fromString(accountNumberInput).toNumber();

  const path = pathToString(paths[accountNumber]);
  const pathInput = getElement("path");
  pathInput.value = path;
};
window.setPath = setPath;

// This must be called by the user an cannot be done on load (see "TransportWebUSBGestureRequired").
window.createSigner = async function createSigner(): Promise<LedgerSigner> {
  const interactiveTimeout = 120_000;
  const ledgerTransport = await TransportWebUSB.create(interactiveTimeout, interactiveTimeout);
  return new LedgerSigner(ledgerTransport, {
    testModeAllowed: true,
    hdPaths: paths,
  });
};

window.getAccounts = async function getAccounts(signer: LedgerSigner | undefined): Promise<void> {
  if (signer === undefined) {
    console.error("Please wait for transport to connect");
    return;
  }
  const accountNumberInput1 = getElement("account-number1");
  const accountNumberInput2 = getElement("account-number2");
  const addressInput = getElement("address");
  const accountsDiv = getElement("accounts");
  const signDocTextArea = getElement("sign-doc");
  accountsDiv.textContent = "Loading...";

  try {
    accounts = await signer.getAccounts();
    const prettyAccounts = accounts.map((account: AccountData) => ({
      ...account,
      pubkey: toBase64(account.pubkey),
    }));
    accountsDiv.textContent = JSON.stringify(prettyAccounts, null, "\n");
    const accountNumber = 0;

    // Show address block
    accountNumberInput1.max = String(accounts.length - 1);
    accountNumberInput1.value = String(accountNumber);
    setPath(accountNumber.toString());

    // Sign block
    accountNumberInput2.max = String(accounts.length - 1);
    accountNumberInput2.value = String(accountNumber);
    const address = accounts[0].address;
    addressInput.value = address;
    signDocTextArea.textContent = createSignDoc(accountNumber, address);
  } catch (error) {
    console.error(error);
    accountsDiv.textContent = String(error);
  }
};

window.showAddress = async function showAddress(signer: LedgerSigner | undefined): Promise<void> {
  if (signer === undefined) {
    console.error("Please wait for transport to connect");
    return;
  }
  const path = stringToPath(getElement("path").value);
  await signer.showAddress(path);
};

window.sign = async function sign(signer: LedgerSigner | undefined): Promise<void> {
  if (signer === undefined) {
    console.error("Please wait for transport to connect");
    return;
  }
  const signatureDiv = getElement("signature");
  signatureDiv.textContent = "Loading...";

  try {
    const address = getElement("address").value;
    const signDocJson = getElement("sign-doc").textContent;
    const signDoc: StdSignDoc = JSON.parse(signDocJson);
    const signature = await signer.signAmino(address, signDoc);
    signatureDiv.textContent = JSON.stringify(signature, null, "\t");
  } catch (error) {
    signatureDiv.textContent = String(error);
  }
};
