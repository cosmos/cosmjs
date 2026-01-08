import { AccountData, StdSignDoc } from "@cosmjs/amino";
import { HdPath, pathToString, stringToPath } from "@cosmjs/crypto";
import { toBase64 } from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";
import { assert } from "@cosmjs/utils";
// eslint-disable-next-line @typescript-eslint/naming-convention
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";

import { LedgerSigner } from "../ledgersigner";

function getElement(id: string): HTMLElement {
  const e = document.getElementById(id);
  assert(e, `Element with ID '${id}' not found`);
  return e;
}

function getInputElement(id: string): HTMLInputElement {
  const e = getElement(id);
  assert(e instanceof HTMLInputElement, `Element with ID '${id}' is not an input element`);
  return e;
}

function getTextAreaElement(id: string): HTMLTextAreaElement {
  const e = getElement(id);
  assert(e instanceof HTMLTextAreaElement, `Element with ID '${id}' is not a text area element`);
  return e;
}

const paths: HdPath[] = [
  stringToPath("m/44'/118'/0'/0/0"),
  stringToPath("m/44'/118'/1'/0/0"),
  stringToPath("m/44'/118'/2'/0/0"),
  stringToPath("m/44'/118'/3'/0/0"),
  stringToPath("m/44'/118'/4'/0/0"),
  stringToPath("m/44'/118'/5'/0/0"),
  stringToPath("m/44'/118'/6'/0/0"),
];

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

const updateMessage = (accountNumberInput: unknown): void => {
  assert(typeof accountNumberInput === "string");
  const accountNumber = Uint53.fromString(accountNumberInput).toNumber();
  const account = accounts[accountNumber];
  if (account === undefined) {
    return;
  }

  const address = accounts[accountNumber].address;
  const addressInput = getInputElement("address");
  addressInput.value = address;
  const signDocTextArea = getTextAreaElement("sign-doc");
  signDocTextArea.textContent = createSignDoc(accountNumber, address);
};

const setPath = (accountNumberInput: unknown): void => {
  assert(typeof accountNumberInput === "string");
  const accountNumber = Uint53.fromString(accountNumberInput).toNumber();

  const path = pathToString(paths[accountNumber]);
  const pathInput = getInputElement("path");
  pathInput.value = path;
};

// This must be called by the user an cannot be done on load (see "TransportWebUSBGestureRequired").
const createSigner = async function createSigner(): Promise<LedgerSigner> {
  const interactiveTimeout = 120_000;
  const ledgerTransport = await TransportWebUSB.create(interactiveTimeout, interactiveTimeout);
  return new LedgerSigner(ledgerTransport, {
    testModeAllowed: true,
    hdPaths: paths,
  });
};

const getAccounts = async function getAccounts(signer: LedgerSigner | undefined): Promise<void> {
  if (signer === undefined) {
    console.error("Please wait for transport to connect");
    return;
  }
  const accountNumberInput1 = getInputElement("account-number1");
  const accountNumberInput2 = getInputElement("account-number2");
  const addressInput = getInputElement("address");
  const accountsDiv = getElement("accounts");
  const signDocTextArea = getTextAreaElement("sign-doc");
  accountsDiv.textContent = "Loading...";

  try {
    accounts = await signer.getAccounts();
    const prettyAccounts = accounts.map((account: AccountData) => ({
      ...account,
      pubkey: toBase64(account.pubkey),
    }));
    accountsDiv.textContent = prettyAccounts.map((pa) => JSON.stringify(pa, null, 4)).join("\n\n");
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

const showAddress = async function showAddress(signer: LedgerSigner | undefined): Promise<void> {
  if (signer === undefined) {
    console.error("Please wait for transport to connect");
    return;
  }
  const path = stringToPath(getInputElement("path").value);
  await signer.showAddress(path);
};

const sign = async function sign(signer: LedgerSigner | undefined): Promise<void> {
  if (signer === undefined) {
    console.error("Please wait for transport to connect");
    return;
  }
  const signatureDiv = getElement("signature");
  signatureDiv.textContent = "Loading...";

  try {
    const address = getInputElement("address").value;
    const signDocJson = getTextAreaElement("sign-doc").textContent;
    const signDoc: StdSignDoc = JSON.parse(signDocJson);
    const signature = await signer.signAmino(address, signDoc);
    signatureDiv.textContent = JSON.stringify(signature, null, "\t");
  } catch (error) {
    signatureDiv.textContent = String(error);
  }
};

Object.assign(window, { updateMessage, setPath, createSigner, getAccounts, showAddress, sign });
